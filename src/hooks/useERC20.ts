import { getERC20Allowance, useERC20Allowance } from "./useERC20Allowance";
import { useERC20Approve } from "./useERC20Approve";
import { getERC20Balance, useERC20Balance } from "./useERC20Balance";
import { getERC20Info } from "./useERC20Info";

export function useERC20() {
  const approveMutation = useERC20Approve();
  const { mutateAsync, ...approveState } = approveMutation;

  return {
    useBalance: useERC20Balance,
    balance: getERC20Balance,
    useAllowance: useERC20Allowance,
    approve: mutateAsync,
    approveState,
    tokenInfo: getERC20Info,
    allowance: getERC20Allowance,
  };
}
