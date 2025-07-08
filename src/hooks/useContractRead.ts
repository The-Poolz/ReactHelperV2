import { useAccount, usePublicClient } from "wagmi";
import { useMutation } from "@tanstack/react-query";

import { usePoolzContractInfo } from "./usePoolzContractInfo";
import { ContractFunctionName, ContractName } from "../contracts/contractTypes";

interface ContractReadParams<T extends ContractName> {
  chainId: number;
  contractName: T;
  functionName: ContractFunctionName<T>;
}

export function useContractRead<T extends ContractName>({
  chainId,
  contractName,
  functionName,
}: ContractReadParams<T>) {
  const { address: account } = useAccount();
  const { smcAddress, abi } = usePoolzContractInfo(chainId, contractName);
  const publicClient = usePublicClient();

  return useMutation({
    mutationFn: async (args: any[]) => {
      if (!account) throw new Error("Wallet not connected");
      if (!smcAddress || !abi) throw new Error("No contract info available");
      return await publicClient.readContract({
        address: smcAddress,
        abi,
        functionName,
        args,
      });
    },
  });
}
