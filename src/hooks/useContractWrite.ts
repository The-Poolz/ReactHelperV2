import { useAccount, usePublicClient, useWriteContract } from "wagmi";
import { MutateOptions, useMutation } from "@tanstack/react-query";
import { Abi, ContractFunctionArgs, ContractFunctionName, TransactionReceipt,  } from "viem";
import { WriteContractParameters } from "wagmi/actions";

export interface UseContractWriteReturn {
 mutateAsync: <
    const abi extends Abi | readonly unknown[],
    functionName extends ContractFunctionName<abi, "payable" | "nonpayable">,
    args extends ContractFunctionArgs<abi, "payable" | "nonpayable", functionName>
  >(
    params: WriteContractParameters<abi, functionName, args>,
    options?: MutateOptions<any, Error, WriteContractParameters<abi, functionName, args>, unknown>
  ) => Promise<any>;
  mutate: <
    const abi extends Abi | readonly unknown[],
    functionName extends ContractFunctionName<abi, "payable" | "nonpayable">,
    args extends ContractFunctionArgs<abi, "payable" | "nonpayable", functionName>
  >(
    params: WriteContractParameters<abi, functionName, args>,
    options?: MutateOptions<any, Error, WriteContractParameters<abi, functionName, args>, unknown>
  ) => void;
  data?: TransactionReceipt;
  error?: Error | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  reset: () => void;
}


export function useContractWrite(): UseContractWriteReturn {
  const { address: account } = useAccount();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();

  const mutation = useMutation({
    mutationFn: async (params: WriteContractParameters) => {
      const { address, abi } = params;
      if (!account) throw new Error("Wallet not connected");
      if (!address || !abi) throw new Error("No contract info available");
      const hash = await writeContractAsync(params);
      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      return receipt;
    },
  });

  return {
    mutate: mutation.mutate as UseContractWriteReturn["mutate"],
    mutateAsync: mutation.mutateAsync as UseContractWriteReturn["mutateAsync"],
    data: mutation.data,
    error: mutation.error,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
}
