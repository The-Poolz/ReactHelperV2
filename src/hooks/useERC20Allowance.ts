import { useAccount, usePublicClient } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import { erc20Abi } from "viem";

export function useERC20Allowance(
  chainId: number,
  tokenAddress: `0x${string}`,
  spenderAddress: `0x${string}`,
  ownerAddress?: `0x${string}`,
  enabled = true
) {
  const { address: account } = useAccount();
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: [
      "erc20Allowance",
      chainId,
      tokenAddress,
      ownerAddress || account,
      spenderAddress,
    ],
    queryFn: async () => {
      const owner = ownerAddress || account;
      if (!tokenAddress || !owner) return "0";
      const result = await publicClient.readContract({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "allowance",
        args: [owner, spenderAddress],
      });
      return String(result);
    },
    enabled:
      enabled &&
      !!(spenderAddress && (ownerAddress || account)) &&
      !!tokenAddress,
  });
}
