import { erc20Abi } from "viem";
import { multicall } from "wagmi/actions";
import { config } from "../wagmi";

export interface ERC20InfoParams {
  chainId: number;
  tokenAddress: `0x${string}` | string;
}

export interface IERC20Info {
  address: `0x${string}` | string;
  name: string;
  symbol: string;
  decimals: number;
}

/**
 * Fetches ERC20 token info (name, symbol, decimals) using multicall.
 * @param config wagmi config object
 * @param params { chainId, tokenAddress }
 * @returns Promise<IERC20Info>
 */
export async function getERC20Info(
  { chainId, tokenAddress }: ERC20InfoParams
): Promise<IERC20Info> {
  if (!tokenAddress) {
    return { address: tokenAddress, name: "", symbol: "", decimals: 0 };
  }
  const _tokenAddress = tokenAddress as `0x${string}`;
  const results = await multicall(config, {
    contracts: [
      { address: _tokenAddress, abi: erc20Abi, functionName: "name" },
      { address: _tokenAddress, abi: erc20Abi, functionName: "symbol" },
      { address: _tokenAddress, abi: erc20Abi, functionName: "decimals" },
    ],
    chainId: chainId,
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
}
