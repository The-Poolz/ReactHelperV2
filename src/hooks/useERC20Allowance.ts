import { useAccount, usePublicClient } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import { erc20Abi } from "viem";
import type { QueryHookResult } from "../types/hookTypes";

export type UseERC20AllowanceReturn = QueryHookResult<string, Error>;

export interface UseERC20AllowanceParams {
  tokenAddress: `0x${string}` | string;
  spenderAddress: `0x${string}` | string;
  enabled?: boolean;
}

export interface ERC20AllowanceParams {
  tokenAddress: `0x${string}` | string;
  ownerAddress: `0x${string}`;
  spenderAddress: `0x${string}` | string;
}

export async function fetchERC20Allowance({
  tokenAddress,
  ownerAddress,
  spenderAddress,
}: ERC20AllowanceParams): Promise<string> {
  if (!tokenAddress || !ownerAddress || !spenderAddress) return "0";
  const publicClient = usePublicClient();
  const result = await publicClient.readContract({
    address: tokenAddress as `0x${string}`,
    abi: erc20Abi,
    functionName: "allowance",
    args: [ownerAddress, spenderAddress as `0x${string}`],
  });
  return String(result);
}

export function useERC20Allowance({
  tokenAddress,
  spenderAddress,
  enabled = true,
}: UseERC20AllowanceParams): UseERC20AllowanceReturn {
  const { address: account } = useAccount();
  const isEnabled = enabled && !!tokenAddress && !!spenderAddress && !!account;

  return useQuery({
    queryKey: ["erc20Allowance", tokenAddress, spenderAddress, account],
    queryFn: async () => {
      return fetchERC20Allowance({
        tokenAddress,
        ownerAddress: account as `0x${string}`,
        spenderAddress,
      });
    },
    enabled: isEnabled,
  });
}

export async function getERC20Allowance({
  tokenAddress,
  ownerAddress,
  spenderAddress,
}: ERC20AllowanceParams): Promise<string> {
  return fetchERC20Allowance({
    tokenAddress,
    ownerAddress,
    spenderAddress,
  });
}
