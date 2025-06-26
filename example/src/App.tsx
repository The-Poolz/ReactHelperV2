import { useMemo } from "react";
import type { Abi } from "viem";
import { erc20Abi, formatUnits } from "viem";
import { useAccount, useConnect, useDisconnect, useReadContract, useReadContracts } from "wagmi";
import { contractsByChain } from "../../src/contracts";
import type { config } from "../../src/wagmi";

type ChainId = (typeof config.chains)[number]["id"];

function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  const contracts =
    account.chainId !== undefined ? contractsByChain[account.chainId as keyof typeof contractsByChain] : undefined;

  const balance = useReadContract({
    address: contracts?.LockDealNFT.address,
    abi: contracts?.LockDealNFT.abi as Abi,
    functionName: "balanceOf",
    args: account.address ? [account.address] : undefined,
    chainId: account.chainId as ChainId | undefined,
    query: { enabled: Boolean(account.status === "connected" && contracts) },
  });

  const tokenCalls = useMemo(
    () =>
      balance.data && typeof balance.data === "bigint" && contracts && account.address
        ? Array.from({ length: Number(balance.data) }, (_, i) => ({
            address: contracts.LockDealNFT.address,
            abi: contracts.LockDealNFT.abi as Abi,
            functionName: "tokenOfOwnerByIndex",
            args: [account.address, BigInt(i)],
            chainId: account.chainId as ChainId | undefined,
          }))
        : [],
    [balance.data, contracts, account.address, account.chainId],
  );

  const tokens = useReadContracts({
    contracts: tokenCalls,
    query: { enabled: tokenCalls.length > 0 },
  });

  const fullDataCalls = useMemo(
    () =>
      tokens.data && contracts
        ? tokens.data.reduce<typeof tokenCalls>((acc, token) => {
            if (token.result !== undefined) {
              acc.push({
                address: contracts.LockDealNFT.address,
                abi: contracts.LockDealNFT.abi as Abi,
                functionName: "getFullData",
                args: [token.result as bigint],
                chainId: account.chainId as ChainId | undefined,
              });
            }
            return acc;
          }, [])
        : [],
    [tokens.data, contracts, account.chainId],
  );

  const fullData = useReadContracts({
    contracts: fullDataCalls,
    query: { enabled: fullDataCalls.length > 0 },
  });

  const tokenAddresses = useMemo(() => {
    const set = new Set<string>();
    if (fullData.data) {
      for (const res of fullData.data) {
        const infos = res.result as { token: string }[] | undefined;
        if (infos) {
          for (const info of infos) {
            set.add(info.token);
          }
        }
      }
    }
    return Array.from(set);
  }, [fullData.data]);

  const tokenInfoCalls = useMemo(
    () =>
      tokenAddresses.flatMap((addr) => [
        {
          address: addr as `0x${string}`,
          abi: erc20Abi,
          functionName: "symbol",
          chainId: account.chainId as ChainId | undefined,
        },
        {
          address: addr as `0x${string}`,
          abi: erc20Abi,
          functionName: "decimals",
          chainId: account.chainId as ChainId | undefined,
        },
      ]),
    [tokenAddresses, account.chainId],
  );

  const tokenInfo = useReadContracts({
    contracts: tokenInfoCalls,
    query: { enabled: tokenInfoCalls.length > 0 },
  });

  const tokenInfoMap = useMemo(() => {
    const map: Record<string, { symbol: string; decimals: number }> = {};
    if (tokenInfo.data) {
      for (let i = 0; i < tokenAddresses.length; i++) {
        const symbol = tokenInfo.data[i * 2]?.result as string | undefined;
        const decimals = tokenInfo.data[i * 2 + 1]?.result as number | undefined;
        if (symbol && decimals !== undefined) map[tokenAddresses[i]] = { symbol, decimals };
      }
    }
    return map;
  }, [tokenInfo.data, tokenAddresses]);

  const stringifyBigInt = (value: unknown) =>
    JSON.stringify(value, (_, v) => (typeof v === "bigint" ? v.toString() : v), 2);

  return (
    <>
      <div>
        <h2>Account</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === "connected" && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button key={connector.uid} onClick={() => connect({ connector })} type="button">
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>

      {account.status === "connected" && (
        <div>
          <h2>LockDealNFT</h2>
          <div>balance: {balance.data ? balance.data.toString() : "0"}</div>
          <table>
            <thead>
              <tr>
                <th>NFT ID</th>
                <th>Provider</th>
                <th>Pool ID</th>
                <th>Token</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {tokens.data?.map((token, i) => {
                const id = token.result;
                const infos = fullData.data?.[i]?.result as
                  | {
                      provider: string;
                      name: string;
                      poolId: bigint;
                      vaultId: bigint;
                      owner: string;
                      token: string;
                      params: readonly bigint[];
                    }[]
                  | undefined;
                return id !== undefined && infos
                  ? infos.map((info, j) => {
                      const meta = tokenInfoMap[info.token];
                      return (
                        <tr key={`${id.toString()}-${j}`}>
                          <td>{id.toString()}</td>
                          <td>
                            <details>
                              <summary>{info.name}</summary>
                              {info.provider}
                            </details>
                          </td>
                          <td>{info.poolId.toString()}</td>
                          <td>{meta ? meta.symbol : info.token}</td>
                          <td>
                            {meta
                              ? `${formatUnits(info.params[0], meta.decimals)} ${meta.symbol}`
                              : info.params[0].toString()}
                          </td>
                          <td>{new Date(Number(info.params[1]) * 1000).toLocaleString()}</td>
                        </tr>
                      );
                    })
                  : null;
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default App;
