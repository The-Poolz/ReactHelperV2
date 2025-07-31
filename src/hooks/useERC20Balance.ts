import { useAccount, usePublicClient } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import { erc20Abi } from "viem";
import type { QueryHookResult } from "../types/hookTypes";

interface ERC20BalanceParams {
  tokenAddress: `0x${string}` | string;
  ownerAddress?: `0x${string}`;
}

export type UseERC20BalanceReturn = QueryHookResult<string, Error>;

async function fetchERC20Balance({
  tokenAddress,
  ownerAddress,
}: ERC20BalanceParams): Promise<string> {
  const publicClient = usePublicClient();
  const result = await publicClient.readContract({
    address: tokenAddress as `0x${string}`,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [ownerAddress as `0x${string}`],
  });
  return String(result);
}

export function useERC20Balance({
  tokenAddress,
  ownerAddress,
  enabled = true,
}: ERC20BalanceParams & { enabled?: boolean }): UseERC20BalanceReturn {
  const { address: account } = useAccount();
  const owner = (ownerAddress || account) as `0x${string}`;
  const isEnabled = enabled && !!owner && !!tokenAddress;

  return useQuery({
    queryKey: ["erc20Balance", tokenAddress, ownerAddress],
    queryFn: async () => {
      return fetchERC20Balance({ tokenAddress, ownerAddress: owner });
    },
    enabled: isEnabled,
  });
}

export async function getERC20Balance({
  tokenAddress,
  ownerAddress,
}: ERC20BalanceParams): Promise<string> {
  return fetchERC20Balance({ tokenAddress, ownerAddress });
}
