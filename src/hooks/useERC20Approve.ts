import { useWriteContract, useAccount, usePublicClient } from "wagmi";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { erc20Abi, maxUint256, TransactionReceipt } from "viem";

export async function approveERC20({
  tokenAddress,
  spender,
  amount,
}: ERC20ApproveArgs): Promise<TransactionReceipt> {
  const { writeContractAsync } = useWriteContract();
  const { address: account } = useAccount();
  const publicClient = usePublicClient();

  if (!tokenAddress || !account) {
    throw new Error("Token address and wallet connection are required");
  }
  const hash = await writeContractAsync({
    address: tokenAddress as `0x${string}`,
    abi: erc20Abi,
    functionName: "approve",
    args: [spender as `0x${string}`, amount ?? maxUint256],
    account,
  });
  return await publicClient.waitForTransactionReceipt({ hash });
}

export function useERC20Approve(): UseERC20ApproveReturn {
  return useMutation({
    mutationFn: async (params: ERC20ApproveArgs) => approveERC20({ ...params }),
  });
}

export interface ERC20ApproveArgs {
  tokenAddress: `0x${string}` | string;
  spender: `0x${string}` | string;
  amount?: bigint;
}

export type UseERC20ApproveReturn = UseMutationResult<
  TransactionReceipt,
  Error,
  ERC20ApproveArgs,
  unknown
>;
