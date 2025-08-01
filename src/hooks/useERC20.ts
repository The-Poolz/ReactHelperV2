import { getERC20Allowance, useERC20Allowance } from "./useERC20Allowance";
import { useERC20Approve } from "./useERC20Approve";
import { useERC20Balance } from "./useERC20Balance";
import { getERC20Info } from "./useERC20Info";

export function useERC20() {
  const approveMutation = useERC20Approve();
  const { mutateAsync, ...approveState } = approveMutation;

  return {
    balance: useERC20Balance,
    allowance: useERC20Allowance,
    approve: mutateAsync,
    approveState,
    info: getERC20Info,
    getAllowance: getERC20Allowance,
  };
}
