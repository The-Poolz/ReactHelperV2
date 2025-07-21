import { useAccount, usePublicClient } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import { erc20Abi } from "viem";
import type { QueryHookResult } from "../types/hookTypes";

interface ERC20BalanceParams {
  tokenAddress: `0x${string}` | string;
  ownerAddress?: `0x${string}`;
}

export type UseERC20BalanceReturn = QueryHookResult<string, Error>;

/**
 * Shared helper to fetch ERC20 balance from a public client.
 */
async function fetchERC20Balance({
  tokenAddress,
  ownerAddress,
}: ERC20BalanceParams): Promise<string> {
  const { address: account } = useAccount();
  const publicClient = usePublicClient();
  if (!tokenAddress || !ownerAddress || !account) return "0";
  const owner = ownerAddress || account;
  const result = await publicClient.readContract({
    address: tokenAddress as `0x${string}`,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [owner],
  });
  return String(result);
}

export function useERC20Balance({
  tokenAddress,
  ownerAddress,
  enabled = true,
}: ERC20BalanceParams & { enabled?: boolean }): UseERC20BalanceReturn {
  return useQuery({
    queryKey: ["erc20Balance", tokenAddress, ownerAddress],
    queryFn: async () => {
      if (!tokenAddress) return "0";
      return fetchERC20Balance({ tokenAddress, ownerAddress });
    },
    enabled: enabled && !!ownerAddress && !!tokenAddress,
  });
}

/**
 * Regular async function to fetch ERC20 balance (not a React hook).
 * @param publicClient wagmi public client instance
 * @param chainId chain ID
 * @param tokenAddress ERC20 contract address
 * @param ownerAddress address to check balance for
 * @returns Promise<string> balance as string
 */
export async function getERC20Balance({
  tokenAddress,
  ownerAddress,
}: ERC20BalanceParams): Promise<string> {
  return fetchERC20Balance({ tokenAddress, ownerAddress });
}
