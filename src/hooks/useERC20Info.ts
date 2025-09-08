import { erc20Abi } from "viem";
import { usePublicClient } from "wagmi";
import { safeMulticall } from "../utils/multicall-helper";

export interface ERC20InfoParams {
  tokenAddress: `0x${string}` | string;
}

export interface IERC20Info {
  address: `0x${string}` | string;
  name: string;
  symbol: string;
  decimals: number;
}

/**
 * Fetches ERC20 token info (name, symbol, decimals) using multicall with fallback.
 * @param params { tokenAddress }
 * @returns Promise<IERC20Info>
 */
export async function getERC20Info({
  tokenAddress,
  client,
}: ERC20InfoParams & {
  client: ReturnType<typeof usePublicClient>;
}): Promise<IERC20Info> {
  const fallback = { address: tokenAddress, name: "", symbol: "", decimals: 0 };
  if (!tokenAddress) return fallback;
  try {
    const _tokenAddress = tokenAddress as `0x${string}`;

    const results = await safeMulticall({
      client,
      contracts: [
        { address: _tokenAddress, abi: erc20Abi, functionName: "name" },
        {
          address: _tokenAddress,
          abi: erc20Abi,
          functionName: "symbol",
        },
        {
          address: _tokenAddress,
          abi: erc20Abi,
          functionName: "decimals",
        },
      ],
    });
    const [name, symbol, decimals] = results.map((r) =>
      r.status === "success" ? r.result : ""
    );
    return {
      address: tokenAddress,
      name: String(name || ""),
      symbol: String(symbol || ""),
      decimals: Number(decimals) || 18,
    };
  } catch (error) {
    console.log("getERC20Info error", error);
    return fallback;
  }
}
