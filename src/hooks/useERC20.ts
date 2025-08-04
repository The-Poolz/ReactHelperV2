import { usePublicClient } from "wagmi";
import {
  ERC20AllowanceParams,
  getERC20Allowance,
  useERC20Allowance,
} from "./useERC20Allowance";
import { useERC20Approve } from "./useERC20Approve";
import {
  ERC20BalanceParams,
  getERC20Balance,
  useERC20Balance,
} from "./useERC20Balance";
import { getERC20Info } from "./useERC20Info";

export type UseERC20Return = {
  useBalance: typeof useERC20Balance;
  balance: (params: ERC20BalanceParams) => Promise<string>;
  useAllowance: typeof useERC20Allowance;
  approve: ReturnType<typeof useERC20Approve>["mutateAsync"];
  approveState: Omit<ReturnType<typeof useERC20Approve>, "mutateAsync">;
  tokenInfo: typeof getERC20Info;
  allowance: (params: ERC20AllowanceParams) => Promise<string>;
};

export function useERC20(): UseERC20Return {
  const publicClient = usePublicClient();
  const approveMutation = useERC20Approve();
  const { mutateAsync, ...approveState } = approveMutation;

  return {
    useBalance: useERC20Balance,
    balance: (params: ERC20BalanceParams) => {
      return getERC20Balance({ ...params, publicClient });
    },
    useAllowance: useERC20Allowance,
    approve: mutateAsync,
    approveState,
    tokenInfo: getERC20Info,
    allowance: (params: ERC20AllowanceParams) => {
      return getERC20Allowance({ ...params, publicClient });
    },
  };
}
