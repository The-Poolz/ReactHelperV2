import { useQuery } from "@tanstack/react-query";
import { Chain, createPublicClient, erc20Abi, http } from "viem";
import type { QueryHookResult } from "../types/hookTypes";

export type UseERC20AllowanceReturn = QueryHookResult<string, Error>;

export interface ERC20AllowanceParams {
  tokenAddress: `0x${string}` | string;
  owner: `0x${string}` | string;
  spender: `0x${string}` | string;
  enabled?: boolean;
  chain: Chain;
}

export async function fetchERC20Allowance({
  tokenAddress,
  owner,
  spender,
  chain,
}: ERC20AllowanceParams): Promise<string> {
  if (!tokenAddress || !owner || !spender) return "0";
  const client = createPublicClient({
    chain,
    transport: http(),
  });
  const result = await client.readContract({
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
  chain,
}: ERC20AllowanceParams): UseERC20AllowanceReturn {
  const isEnabled = enabled && !!tokenAddress && !!spender && !!owner;

  return useQuery({
    queryKey: ["erc20Allowance", tokenAddress, spender, owner],
    queryFn: async () => {
      return fetchERC20Allowance({
        tokenAddress,
        owner,
        spender,
        chain,
      });
    },
    enabled: isEnabled,
  });
}

export async function getERC20Allowance({
  tokenAddress,
  owner,
  spender,
  chain,
}: ERC20AllowanceParams): Promise<string> {
  return fetchERC20Allowance({
    tokenAddress,
    owner,
    spender,
    chain,
  });
}
