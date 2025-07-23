import { useAccount, usePublicClient } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import { erc20Abi } from "viem";
import type { QueryHookResult } from "../types/hookTypes";

export type UseERC20AllowanceReturn = QueryHookResult<string, Error>;

export interface UseERC20AllowanceParams {
  tokenAddress: `0x${string}`;
  spenderAddress: `0x${string}`;
  enabled?: boolean;
}

export function useERC20Allowance({
  tokenAddress,
  spenderAddress,
  enabled = true,
}: UseERC20AllowanceParams): UseERC20AllowanceReturn {
  const { address: account } = useAccount();
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: [
      "erc20Allowance",
      tokenAddress,
      spenderAddress,
    ],
    queryFn: async () => {
      if (!tokenAddress || !account) return "0";
      const result = await publicClient.readContract({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "allowance",
        args: [account, spenderAddress],
      });
      return String(result);
    },
    enabled:
      enabled &&
      !!(spenderAddress && account) &&
      !!tokenAddress,
  });
}
