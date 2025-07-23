import { useWriteContract, useAccount, usePublicClient } from "wagmi";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { erc20Abi, maxUint256, TransactionReceipt } from "viem";

interface ERC20ApproveArgs {
  tokenAddress: `0x${string}`;
  spender: `0x${string}`;
  amount: string | bigint | undefined;
}

export type UseERC20ApproveReturn = UseMutationResult<TransactionReceipt, Error, ERC20ApproveArgs, unknown>;

export function useERC20Approve(): UseERC20ApproveReturn {
  const { writeContractAsync } = useWriteContract();
  const { address: account, isConnected } = useAccount();
  const publicClient = usePublicClient();

  return useMutation({
    mutationFn: async (params: ERC20ApproveArgs): Promise<TransactionReceipt> => {
      const { tokenAddress, spender, amount } = params;
      if (!tokenAddress) throw new Error("Token address is required");
      if (!isConnected || !account) throw new Error("Wallet not connected");
      const _amount = typeof amount === "string" ? BigInt(amount) : amount
      const hash = await writeContractAsync({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "approve",
        args: [spender,_amount ?? maxUint256],
        account,
      });
      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      return receipt;
    },
  });
}
