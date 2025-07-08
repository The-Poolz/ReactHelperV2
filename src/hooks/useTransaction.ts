import { useWriteContract, usePublicClient } from "wagmi";
import { useMutation } from "@tanstack/react-query";
import { usePoolzContractInfo } from "./usePoolzContractInfo";
import { ContractName, ContractFunctionName } from "../contracts/contractTypes";

export interface TransactionCallbacks {
  onSuccess?: (receipt: any) => void;
  onError?: (err: any) => void;
}

export interface PoolzTransactionParams extends TransactionCallbacks {
  chainId: number;
  contractName: ContractName;
  functionName: ContractFunctionName<ContractName>;
  args: any[];
  account?: `0x${string}`;
  waitConfirmations?: number;
}

export function useTransaction() {
  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient();

  return useMutation({
    mutationFn: async (params: PoolzTransactionParams) => {
      const {
        chainId,
        contractName,
        functionName,
        args,
        account,
        waitConfirmations = 1,
        onSuccess,
      } = params;
      const { smcAddress, abi } = usePoolzContractInfo(chainId, contractName);
      if (!smcAddress || !abi) throw new Error("No contract info available");
      const hash = await writeContractAsync({
        address: smcAddress,
        abi,
        functionName,
        args,
        account,
      });
      const result = await publicClient.waitForTransactionReceipt({
        hash,
        confirmations: waitConfirmations,
      });
      onSuccess?.(result);
      return result;
    },
    onError: (err, params) => {
      if (params?.onError) params.onError(err);
    },
  });
}
