import { useMemo } from "react";
import { useAccount, useConnect, useDisconnect, useReadContract, useReadContracts } from "wagmi";
import { contractsByChain } from "./contracts";

function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  const contracts =
    account.chainId !== undefined ? contractsByChain[account.chainId as keyof typeof contractsByChain] : undefined;

  const balance = useReadContract({
    address: contracts?.LockDealNFT.address,
    abi: contracts?.LockDealNFT.abi,
    functionName: "balanceOf",
    args: account.address ? [account.address] : undefined,
    chainId: account.chainId,
    query: { enabled: Boolean(account.status === "connected" && contracts) },
  });

  const tokenCalls = useMemo(
    () =>
      balance.data && typeof balance.data === "bigint" && contracts && account.address
        ? Array.from({ length: Number(balance.data) }, (_, i) => ({
            address: contracts.LockDealNFT.address,
            abi: contracts.LockDealNFT.abi,
            functionName: "tokenOfOwnerByIndex",
            args: [account.address, BigInt(i)],
            chainId: account.chainId,
          }))
        : [],
    [balance.data, contracts, account.address, account.chainId],
  );

  const tokens = useReadContracts({
    contracts: tokenCalls,
    query: { enabled: tokenCalls.length > 0 },
  });

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
          <div>balance: {balance.data ? balance.data.toString() : 0n}</div>
          <ul>
            {tokens.data?.map((token) => (
              <li key={token.result?.toString() ?? ""}>{token.result?.toString()}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default App;
