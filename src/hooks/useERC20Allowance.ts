import { useQuery } from "@tanstack/react-query";
import { erc20Abi } from "viem";
import type { QueryHookResult } from "../types/hookTypes";
import { usePublicClient } from "wagmi";

export type UseERC20AllowanceReturn = QueryHookResult<string, Error>;

export interface ERC20AllowanceParams {
  tokenAddress: `0x${string}` | string;
  owner: `0x${string}` | string;
  spender: `0x${string}` | string;
  enabled?: boolean;
}

interface ERC20AllowanceParamsExtended extends ERC20AllowanceParams {
  publicClient: ReturnType<typeof usePublicClient>;
}

export async function fetchERC20Allowance({
  tokenAddress,
  owner,
  spender,
  publicClient,
}: ERC20AllowanceParamsExtended): Promise<string> {
  if (!tokenAddress || !owner || !spender) return "0";
  const result = await publicClient.readContract({
    address: tokenAddress as `0x${string}`,
    abi: erc20Abi,
    functionName: "allowance",
    args: [owner as `0x${string}`, spender as `0x${string}`],
  });
  return String(result);
}

export function useERC20Allowance({
  tokenAddress,
  owner,
  spender,
  enabled = true,
}: ERC20AllowanceParams): UseERC20AllowanceReturn {
  const publicClient = usePublicClient();
  const isEnabled = enabled && !!tokenAddress && !!spender && !!owner;

  return useQuery({
    queryKey: ["erc20Allowance", tokenAddress, spender, owner],
    queryFn: async () => {
      return fetchERC20Allowance({
        tokenAddress,
        owner,
        spender,
        publicClient,
      });
    },
    enabled: isEnabled,
  });
}

export async function getERC20Allowance({
  tokenAddress,
  owner,
  spender,
  publicClient,
}: ERC20AllowanceParamsExtended): Promise<string> {
  return fetchERC20Allowance({
    tokenAddress,
    owner,
    spender,
    publicClient,
  });
}
