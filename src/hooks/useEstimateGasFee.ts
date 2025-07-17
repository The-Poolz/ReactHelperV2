import { usePublicClient } from "wagmi";
import { useMutation, MutateOptions } from "@tanstack/react-query";
import { Abi, ContractFunctionName, ContractFunctionArgs, EstimateContractGasParameters } from "viem";

export interface GasFeeResult {
  gasEstimated: bigint;
  gasPrice: bigint;
  gasFee: string;
}

export interface UseEstimateGasFeeReturn {
  mutateAsync: <
    const abi extends Abi | readonly unknown[],
    functionName extends ContractFunctionName<abi, "payable" | "nonpayable">,
    args extends ContractFunctionArgs<abi, "payable" | "nonpayable", functionName>
  > (
    params: EstimateContractGasParameters<abi, functionName, args>,
    options?: MutateOptions<GasFeeResult, Error, EstimateContractGasParameters<abi, functionName, args>, unknown>
  ) => Promise<GasFeeResult>;
  mutate: <
    const abi extends Abi | readonly unknown[],
    functionName extends ContractFunctionName<abi, "payable" | "nonpayable">,
    args extends ContractFunctionArgs<abi, "payable" | "nonpayable", functionName>
  > (
    params: EstimateContractGasParameters<abi, functionName, args>,
    options?: MutateOptions<GasFeeResult, Error, EstimateContractGasParameters<abi, functionName, args>, unknown>
  ) => void;
  data?: GasFeeResult;
  error?: Error | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  reset: () => void;
}

export function useEstimateGasFee(): UseEstimateGasFeeReturn {
  const publicClient = usePublicClient();

  const mutation = useMutation({
    mutationFn: async (params: EstimateContractGasParameters): Promise<GasFeeResult> => {
      const { address, abi, ...restParams } = params;
      if (!address || !abi) throw new Error("No contract info available");
      const gasPrice = await publicClient.getGasPrice();
      const gasEstimated = await publicClient.estimateContractGas({
        address,
        abi,
        ...restParams
      });
      const gasFee = (gasEstimated * gasPrice).toString();
      return { gasEstimated, gasPrice, gasFee };
    },
  });

  return {
    mutate: mutation.mutate as UseEstimateGasFeeReturn["mutate"],
    mutateAsync: mutation.mutateAsync as UseEstimateGasFeeReturn["mutateAsync"],
    data: mutation.data,
    error: mutation.error,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
}
