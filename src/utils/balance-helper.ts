import { erc20Abi, formatUnits } from "viem";
import type { TokenBalance } from "../contexts/BalanceContext";

export function lowerCaseAddresses(addresses: Iterable<string>) {
  const lowercased = Array.from(addresses, (addr) => addr.toLowerCase());
  return Array.from(new Set(lowercased));
}

export function prepareMulticallContracts(
  addressArray: string[],
  account: string
) {
  return addressArray.flatMap((tokenAddress) => {
    const address = tokenAddress as `0x${string}`;
    return [
      {
        address,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [account],
      },
      {
        address,
        abi: erc20Abi,
        functionName: "decimals",
      },
      {
        address,
        abi: erc20Abi,
        functionName: "symbol",
      },
    ];
  });
}

export function setTokenBalancesLoading(
  prev: Record<string, TokenBalance>,
  addressArray: string[]
): Record<string, TokenBalance> {
  const newBalances = { ...prev };
  addressArray.forEach((addr) => {
    const normalizedAddr = addr.toLowerCase();
    newBalances[normalizedAddr] = buildTokenBalanceObject({
      tokenAddress: addr,
      balance: newBalances[normalizedAddr]?.balance ?? 0n,
      formattedBalance: newBalances[normalizedAddr]?.formattedBalance ?? "0",
      decimals: newBalances[normalizedAddr]?.decimals ?? 18,
      symbol: newBalances[normalizedAddr]?.symbol ?? "N/a",
      error: undefined,
    });
    newBalances[normalizedAddr].isLoading = true;
  });
  return newBalances;
}

export function parseMulticallResults(
  addressArray: string[],
  results: any[]
) {
  const newBalances: Record<string, TokenBalance> = {};
  addressArray.forEach((tokenAddress, index) => {
    const normalizedAddr = tokenAddress.toLowerCase();
    const balanceResult = results[index * 3];
    const decimalsResult = results[index * 3 + 1];
    const symbolResult = results[index * 3 + 2];

    const balance = balanceResult.result ?? 0n;
    const decimals = Number(decimalsResult.result ?? 18);
    const symbol = String(symbolResult.result) ?? "N/A";
    const formattedBalance = formatUnits(BigInt(balance), decimals);
    const error =
      balanceResult.status === "failure"
        ? balanceResult.error?.message
        : undefined;

    newBalances[normalizedAddr] = buildTokenBalanceObject({
      tokenAddress: tokenAddress,
      balance: balance,
      formattedBalance: formattedBalance,
      decimals: decimals,
      symbol: symbol,
      error: error,
    });
  });
  return newBalances;
}

export function buildTokenBalanceObject(params: {
  tokenAddress: string;
  balance: string | bigint | number;
  formattedBalance: string;
  decimals: number;
  symbol: string;
  error?: string;
}): TokenBalance {
  return {
    address: params.tokenAddress,
    balance: params.balance,
    formattedBalance: params.formattedBalance,
    decimals: params.decimals,
    symbol: params.symbol,
    isLoading: false,
    error: params.error,
  };
}

export function getChainNativeSymbol(
  chainId: number | undefined,
  config: any
): string {
  if (!chainId || !config.chains) return "ETH";
  const currentChain = config.chains.find((chain: any) => chain.id === chainId);
  return currentChain?.nativeCurrency?.symbol || "ETH";
}
