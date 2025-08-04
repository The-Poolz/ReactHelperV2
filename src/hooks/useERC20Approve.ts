import { useWriteContract, usePublicClient } from "wagmi";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { erc20Abi, maxUint256, TransactionReceipt } from "viem";

export interface ERC20ApproveArgs {
  tokenAddress: `0x${string}` | string;
  spender: `0x${string}` | string;
  owner: `0x${string}` | string;
  amount?: bigint;
}

export type UseERC20ApproveReturn = UseMutationResult<
  TransactionReceipt,
  Error,
  ERC20ApproveArgs,
  unknown
>;

export function useERC20Approve(): UseERC20ApproveReturn {
  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient();

  return useMutation({
    mutationFn: async ({ tokenAddress, spender, owner, amount }: ERC20ApproveArgs) => {
      if (!tokenAddress || !owner) {
        throw new Error("Token address and wallet connection are required");
      }
      const hash = await writeContractAsync({
        address: tokenAddress as `0x${string}`,
        abi: erc20Abi,
        functionName: "approve",
        args: [spender as `0x${string}`, amount ?? maxUint256],
        account: owner as `0x${string}`,
      });
      return await publicClient.waitForTransactionReceipt({ hash });
    },
  });
}
