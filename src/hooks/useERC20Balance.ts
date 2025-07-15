import { useAccount, usePublicClient } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import { erc20Abi } from "viem";
import type { QueryHookResult } from "../types/hookTypes";

interface ERC20BalanceParams {
  chainId: number;
  tokenAddress: `0x${string}`;
  ownerAddress?: `0x${string}`;
  enabled?: boolean;
}

export type UseERC20BalanceReturn = QueryHookResult<string, Error>;

export function useERC20Balance({
  chainId,
  tokenAddress,
  ownerAddress,
  enabled = true,
}: ERC20BalanceParams): UseERC20BalanceReturn {
  const { address: account } = useAccount();
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: ["erc20Balance", chainId, tokenAddress, ownerAddress || account],
    queryFn: async () => {
      const owner = ownerAddress || account;
      if (!tokenAddress || !owner) return "0";
      const result = await publicClient.readContract({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [owner],
      });
      return String(result);
    },
    enabled: enabled && !!(ownerAddress || account) && !!tokenAddress,
  });
}
