import { useAccount, usePublicClient } from "wagmi";
import { MutateOptions, useMutation } from "@tanstack/react-query";
import {  Abi, ContractFunctionName, ContractFunctionArgs } from "viem";
import { ReadContractParameters } from "wagmi/actions";


export interface UseContractReadReturn {
  mutateAsync: <
    const abi extends Abi | readonly unknown[],
    functionName extends ContractFunctionName<abi, "payable" | "nonpayable">,
    args extends ContractFunctionArgs<abi, "payable" | "nonpayable", functionName>
  >(
    params: ReadContractParameters<abi, functionName, args>,
    options?: MutateOptions<any, Error, ReadContractParameters<abi, functionName, args>, unknown>
  ) => Promise<any>;
  mutate: <
    const abi extends Abi | readonly unknown[],
    functionName extends ContractFunctionName<abi, "payable" | "nonpayable">,
    args extends ContractFunctionArgs<abi, "payable" | "nonpayable", functionName>
  >(
    params: ReadContractParameters<abi, functionName, args>,
    options?: MutateOptions<any, Error, ReadContractParameters<abi, functionName, args>, unknown>
  ) => void;
  data?: any;
  error?: Error | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  reset: () => void;
}

export function useContractRead(): UseContractReadReturn {
  const { address: account } = useAccount();
  const publicClient = usePublicClient();

  const mutation = useMutation({
    mutationFn: async (params: ReadContractParameters) => {
      const { address, abi } = params;

      if (!account) throw new Error("Wallet not connected");
      if (!address || !abi) throw new Error("Contract address or ABI not provided");

      return await publicClient.readContract(params);
    },
  });

  return {
    mutate: mutation.mutate as UseContractReadReturn["mutate"],
    mutateAsync: mutation.mutateAsync as UseContractReadReturn["mutateAsync"],
    data: mutation.data,
    error: mutation.error,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
}