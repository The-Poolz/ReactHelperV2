import { usePublicClient } from "wagmi";
import { useMutation } from "@tanstack/react-query";
import { isEnoughGasFee } from "../utils/helpers";
import { usePoolzContractInfo } from "./usePoolzContractInfo";
import { ContractName, ContractFunctionName } from "../contracts/contractTypes";

export interface PoolzGasCheckParams {
  chainId: number;
  contractName: ContractName
  functionName:  ContractFunctionName<ContractName>;
  account?: `0x${string}`;
  balance: string | bigint;
  enabled?: boolean;
}

export function useCheckGasFee(params: PoolzGasCheckParams) {
  const publicClient = usePublicClient();
  const {
    chainId,
    contractName,
    functionName,
    account,
    balance,
  } = params;
  const { smcAddress, abi } = usePoolzContractInfo(chainId, contractName);

  return useMutation({
    mutationFn: async (args: any[]) => {
      if (!smcAddress || !abi) throw new Error("No contract info available");
      const gasPrice = await publicClient.getGasPrice();
      const gasEstimated = await publicClient.estimateContractGas({
        address: smcAddress,
        abi,
        functionName,
        args,
        account,
      });
      const gasFee = (gasEstimated * gasPrice).toString();

      if (!isEnoughGasFee(String(balance), gasFee)) {
        throw new Error("Insufficient gas fee");
      }

      return { gasEstimated, gasPrice, gasFee };
    },
  });
}
