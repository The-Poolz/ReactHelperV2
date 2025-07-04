import { useState, useEffect, useMemo } from "react";
import { useAccount, useConfig } from "wagmi";
import { useContractRead } from "../../src/hooks/useContractRead";
import { useContractWrite } from "../../src/hooks/useContractWrite";
import { contractsByChain } from "../../src/contracts";
import { multicall } from "wagmi/actions";
import type { Abi } from "viem";
import "./nft-demo.css";
import type { ChainId } from "../../src/types/contract";

interface NftInfo {
  id: string;
  tokenURI: string;
  owner: string;
}

export default function LockDealNFTDemo() {
  const { address, chainId, status } = useAccount();
  const config = useConfig();
  const [to, setTo] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [tokenIds, setTokenIds] = useState<bigint[]>([]);
  const [nftInfos, setNftInfos] = useState<NftInfo[]>([]);
  const [contractInfo, setContractInfo] = useState<{ name: string; symbol: string; totalSupply: bigint } | null>(null);
  const [loadingNFTs, setLoadingNFTs] = useState(false);

  const contracts = useMemo(() => {
    if(!chainId || !config.chains) return;
    const contracts = contractsByChain[chainId as ChainId];
    return contracts
  }, [chainId, config]);

  const nameQuery = useContractRead({
    chainId: chainId ?? 0,
    contractName: "LockDealNFT",
    functionName: "name",
  });
  const symbolQuery = useContractRead({
    chainId: chainId ?? 0,
    contractName: "LockDealNFT",
    functionName: "symbol",
  });
  const totalSupplyQuery = useContractRead({
    chainId: chainId ?? 0,
    contractName: "LockDealNFT",
    functionName: "totalSupply",
  });

  const balanceQuery = useContractRead({
    chainId: chainId ?? 0,
    contractName: "LockDealNFT",
    functionName: "balanceOf",
  });
  const tokenOfOwnerByIndexQuery = useContractRead({
    chainId: chainId ?? 0,
    contractName: "LockDealNFT",
    functionName: "tokenOfOwnerByIndex",
  });

  const transferMutation = useContractWrite({
    chainId: chainId ?? 0,
    contractName: "LockDealNFT",
    functionName: "safeTransferFrom",
  });

  useEffect(() => {
    async function fetchContractInfo() {
      const [name, symbol, totalSupply] = await Promise.all([
        nameQuery.mutateAsync([]),
        symbolQuery.mutateAsync([]),
        totalSupplyQuery.mutateAsync([]),
      ]);

      setContractInfo({
        name: name as string || "",
        symbol: symbol as string || "",
        totalSupply: BigInt(Number(totalSupply) || 0n) ,
      });
    }
    if (chainId) fetchContractInfo();
  }, [chainId]);

  const fetchTokenIds = async () => {
    if (!address || !contracts) return;
    setLoadingNFTs(true);
    try {
      const balance = await balanceQuery.mutateAsync([address]);
      if (typeof balance !== "bigint") {
        setTokenIds([]);
        setLoadingNFTs(false);
        return;
      }
      const ids: bigint[] = [];
      for (let i = 0n; i < balance; i++) {
        const id = await tokenOfOwnerByIndexQuery.mutateAsync([address, i]);
        if (typeof id === "bigint") ids.push(id);
      }
      setTokenIds(ids);
    } finally {
      setLoadingNFTs(false);
    }
  };

  useEffect(() => {
    async function fetchAllNftInfos() {
      if (!chainId || !contracts || tokenIds.length === 0) {
        setNftInfos([]);
        return;
      }
      const contractAddress = contracts["LockDealNFT"].address as `0x${string}`;
      const abi = contracts["LockDealNFT"].abi as Abi;
      const calls = tokenIds.flatMap((id) => [
        { address: contractAddress, abi, functionName: "tokenURI" as const, args: [id] },
        { address: contractAddress, abi, functionName: "ownerOf" as const, args: [id] },
      ]);

      const configChain = config.chains.find((c) => c.id === chainId);
      const results = await multicall(config, {
        contracts: calls,
        chainId: configChain?.id,
      });
      const infos = tokenIds.map((id, idx) => {
        const tokenURI = results[idx * 2]?.result ?? ""
        return {
          id: id.toString(),
          tokenURI: tokenURI,
        };
      });
      setNftInfos(infos as NftInfo[]);
    }
    if (tokenIds.length > 0) fetchAllNftInfos();
    else setNftInfos([]);
  }, [tokenIds, chainId, contracts, config]);

  return (
    <div className="nft-dashboard-container">
      <h2 className="nft-dashboard-title">LockDealNFT Dashboard</h2>
      <div className="nft-dashboard-info">
        <div className="nft-dashboard-info-block">
          <div className="label">Status:</div>
          <div>{status}</div>
        </div>
        <div className="nft-dashboard-info-block">
          <div className="label">Address:</div>
          <div className="value">{address}</div>
        </div>
        <div className="nft-dashboard-info-block">
          <div className="label">ChainId:</div>
          <div>{chainId}</div>
        </div>
      </div>
      {contractInfo && (
        <div className="nft-contract-info">
          <div className="name">{contractInfo.name} <span className="symbol">({contractInfo.symbol})</span></div>
          <div className="supply">Total Supply: {contractInfo.totalSupply?.toString?.()}</div>
        </div>
      )}
      <button
        className="nft-load-btn"
        disabled={!address || !contracts || loadingNFTs}
        onClick={fetchTokenIds}
      >
        {loadingNFTs ? "Loading..." : "Load My NFTs"}
      </button>
      <div className="nft-list nft-list-grid">
        {nftInfos.length === 0 && <div className="text-gray-500">No NFTs loaded.</div>}
        {nftInfos.map((nft) => (
          <div key={nft.id} className="nft-card">
            <div className="nft-card-noimage">No Image</div>
            <div className="nft-card-title">NFT #{nft.id}</div>
            <div className="nft-card-id">Token ID: {nft.id}</div>
            <div>
              <a href={`https://testnet.bscscan.com/token/0xe42876a77108e8b3b2af53907f5e533cba2ce7be?a=${nft.id}`} target="_blank" rel="noopener noreferrer" className="nft-card-link">View on BscScan</a>
            </div>
          </div>
        ))}
      </div>
      <div className="nft-transfer-section">
        <h4 className="nft-transfer-title">Transfer NFT</h4>
        <input
          placeholder="To address"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="nft-transfer-input"
        />
        <input
          placeholder="Token ID"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
          className="nft-transfer-input nft-transfer-tokenid"
        />
        <button
          className="nft-transfer-btn"
          disabled={!to || !tokenId || !address}
          onClick={() => {
            if (address?.toLowerCase() === to?.toLowerCase()) {
              return;
            }
            if (transferMutation.isPending) return;
            transferMutation.mutate([
              address,
              to,
              BigInt(tokenId),
            ])
          }
          }
        >
          {transferMutation.isPending ? "Sending..." :  "Send NFT"}
        </button>
        {transferMutation.isSuccess && <span className="nft-transfer-status nft-status-green">Sent!</span>}
        {transferMutation.isError && <p className="nft-transfer-status nft-status-red">Error: {(transferMutation.error as any)?.shortMessage}</p>}
      </div>
    </div>
  );
}
