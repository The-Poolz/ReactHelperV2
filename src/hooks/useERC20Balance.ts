import { useQuery } from "@tanstack/react-query";
import {  erc20Abi } from "viem";
import type { QueryHookResult } from "../types/hookTypes";
import { usePublicClient } from "wagmi";

export interface ERC20BalanceParams {
  tokenAddress: `0x${string}` | string;
  owner: `0x${string}`;
  enabled?: boolean;
}

 interface ERC20BalanceParamsExtended extends ERC20BalanceParams {
  publicClient: ReturnType<typeof usePublicClient>;
}

export type UseERC20BalanceReturn = QueryHookResult<string, Error>;

async function fetchERC20Balance({
  tokenAddress,
  owner,
  publicClient,
}: ERC20BalanceParamsExtended): Promise<string> {
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
}: ERC20BalanceParamsExtended): UseERC20BalanceReturn {
  const publicClient = usePublicClient();
  const isEnabled = enabled && !!owner && !!tokenAddress;

  return useQuery({
    queryKey: ["erc20Balance", tokenAddress, owner],
    queryFn: async () => {
      return fetchERC20Balance({ tokenAddress, owner, publicClient });
    },
    enabled: isEnabled,
  });
}

export async function getERC20Balance({
  tokenAddress,
  owner,
  publicClient
}: ERC20BalanceParamsExtended): Promise<string> {
  return fetchERC20Balance({ tokenAddress, owner, publicClient });
}
