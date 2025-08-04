import { useAccount } from 'wagmi';
import { useERC20Allowance, UseERC20AllowanceReturn } from './useERC20Allowance';
import { useERC20Approve } from './useERC20Approve';
import { Address, TransactionReceipt } from 'viem';

export interface UseTokenApprovalOptions {
  tokenAddress: Address;
  spender: Address;
}

export interface UseTokenApprovalReturn {
  allowance: UseERC20AllowanceReturn;
  approve: {
    mutateAsync: (params: { spender: Address; amount?: bigint | string }) => Promise<TransactionReceipt>;
    isPending: boolean;
    isSuccess: boolean;
    error: Error | null;
    reset: () => void;
  };
}

/**
 * Unified ERC20 hook for token operations with current user as owner
 * Simple and focused on common use cases like Approval flows
 *
 * Usage:
 * ```
 * const token = useTokenApproval({
 *   tokenAddress: '0x...',
 *   spender: contractAddress // optional, for allowance check
 * });
 *
 * // Check allowance (if spender provided)
 * const allowance = token.allowance.data;
 *
 * // Approve tokens
 * token.approve.mutateAsync({ spender: contractAddress, amount });
 *
 * ```
 */
export function useTokenApproval(options: UseTokenApprovalOptions): UseTokenApprovalReturn {
  const { tokenAddress, spender } = options;
  const { address: account } = useAccount();

  const allowance = useERC20Allowance({
    tokenAddress,
    owner: account as `0x${string}`,
    spender,
  });

  const approve = useERC20Approve();

  return {
    allowance,
    approve: {
      mutateAsync: async ({ spender, amount }) => {
        return await approve.mutateAsync({
          tokenAddress,
          spender,
          amount: amount ? BigInt(amount) : undefined,
          owner: account as `0x${string}`,
        });
      },
      isPending: approve.isPending,
      isSuccess: approve.isSuccess,
      error: approve.error,
      reset: approve.reset,
    },
  };
}
