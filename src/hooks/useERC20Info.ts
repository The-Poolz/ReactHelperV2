import { useQuery } from "@tanstack/react-query";
import { erc20Abi } from "viem";
import { useConfig } from "wagmi";
import { multicall } from "wagmi/actions";
import type { QueryHookResult } from "../types/hookTypes";

interface ERC20InfoParams {
  chainId: number;
  tokenAddress: `0x${string}`;
  enabled?: boolean;
}

export interface ERC20Info {
  address: `0x${string}`;
  name: string;
  symbol: string;
  decimals: number;
}

export type UseERC20InfoReturn = QueryHookResult<ERC20Info, Error>;

export function useERC20Info({
  chainId,
  tokenAddress,
  enabled = true,
}: ERC20InfoParams): UseERC20InfoReturn {
  const config = useConfig();

  return useQuery({
    queryKey: ["erc20Info", chainId, tokenAddress],
    queryFn: async () => {
      if (!tokenAddress) {
        return { address: tokenAddress, name: "", symbol: "", decimals: 0 };
      }

      const results = await multicall(config, {
        contracts: [
          { address: tokenAddress, abi: erc20Abi, functionName: "name" },
          { address: tokenAddress, abi: erc20Abi, functionName: "symbol" },
          { address: tokenAddress, abi: erc20Abi, functionName: "decimals" },
        ],
        chainId: chainId as any,
      });
      const [name, symbol, decimals] = results.map((r: any) =>
        r.status === "success" ? r.result : ""
      );
      return {
        address: tokenAddress,
        name,
        symbol,
        decimals: Number(decimals),
      };
    },
    enabled: enabled && !!tokenAddress,
  });
}
