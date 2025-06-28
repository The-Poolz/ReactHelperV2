import { usePublicClient } from "wagmi";
import { useMutation } from "@tanstack/react-query";
import { usePoolzContractInfo } from "../contracts";
import Decimal from "decimal.js";
import { isEnoughGasFee } from "../utils/helpers";

export interface PoolzGasCheckParams {
  chainId: number;
  contractName: string;
  functionName: string;
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
      const gasFee = new Decimal(gasEstimated.toString())
        .times(new Decimal(gasPrice.toString()))
        .toString();

      if (!isEnoughGasFee(String(balance), gasFee)) {
        throw new Error("Insufficient gas fee");
      }

      return { gasEstimated, gasPrice, gasFee };
    },
  });
}
