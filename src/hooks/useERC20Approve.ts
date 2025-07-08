import { useWriteContract, useAccount, usePublicClient } from "wagmi";
import { useMutation } from "@tanstack/react-query";
import { erc20Abi } from "viem";

interface ERC20ApproveParams {
  tokenAddress: `0x${string}`;
}

export function useERC20Approve({ tokenAddress }: ERC20ApproveParams) {
  const { writeContractAsync } = useWriteContract();
  const { address: account, isConnected } = useAccount();
  const publicClient = usePublicClient();

  return useMutation({
    mutationFn: async (params: {
      spender: `0x${string}`;
      amount: string | bigint;
    }) => {
      const { spender, amount } = params;
      if (!tokenAddress) throw new Error("No contract info available");
      if (!isConnected || !account) throw new Error("Wallet not connected");
      const hash = await writeContractAsync({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "approve",
        args: [spender, typeof amount === "string" ? BigInt(amount) : amount],
        account,
      });
      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      return receipt;
    },
  });
}
