import { useWriteContract, useAccount, usePublicClient } from "wagmi";
import { useMutation } from "@tanstack/react-query";
import { usePoolzContractInfo } from "./usePoolzContractInfo";
import { ContractFunctionName, ContractName } from "../contracts/contractTypes";

interface ContractWriteParams<T extends ContractName> {
  chainId: number;
  contractName: T;
  functionName: ContractFunctionName<T>;
}

export function useContractWrite<T extends ContractName>({
  chainId,
  contractName,
  functionName,
}: ContractWriteParams<T>) {
  const { writeContractAsync } = useWriteContract();
  const { address: account } = useAccount();
  const publicClient = usePublicClient();
  const { smcAddress, abi } = usePoolzContractInfo(chainId, contractName);

  return useMutation({
    mutationFn: async (args: any[]) => {
      if (!account) throw new Error("Wallet not connected");
      if (!smcAddress || !abi) throw new Error("No contract info available");
      const hash = await writeContractAsync({
        address: smcAddress,
        abi,
        functionName,
        args,
        account,
      });
      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      return receipt;
    },
  });
}
