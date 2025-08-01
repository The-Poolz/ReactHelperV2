import { usePublicClient } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import { erc20Abi } from "viem";
import type { QueryHookResult } from "../types/hookTypes";

export interface ERC20BalanceParams {
  tokenAddress: `0x${string}` | string;
  owner: `0x${string}`;
  enabled?: boolean;
}

export type UseERC20BalanceReturn = QueryHookResult<string, Error>;

async function fetchERC20Balance({
  tokenAddress,
  owner,
}: ERC20BalanceParams): Promise<string> {
  const publicClient = usePublicClient();
  const result = await publicClient.readContract({
    address: tokenAddress as `0x${string}`,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [owner as `0x${string}`],
  });
  return String(result);
}

export function useERC20Balance({
  tokenAddress,
  owner,
  enabled = true,
}: ERC20BalanceParams): UseERC20BalanceReturn {
  const isEnabled = enabled && !!owner && !!tokenAddress;

  return useQuery({
    queryKey: ["erc20Balance", tokenAddress, owner],
    queryFn: async () => {
      return fetchERC20Balance({ tokenAddress, owner });
    },
    enabled: isEnabled,
  });
}

export async function getERC20Balance({
  tokenAddress,
  owner,
}: ERC20BalanceParams): Promise<string> {
  return fetchERC20Balance({ tokenAddress, owner });
}
