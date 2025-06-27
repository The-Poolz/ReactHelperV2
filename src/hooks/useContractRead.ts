import { useAccount, usePublicClient } from "wagmi";
import { useMutation } from "@tanstack/react-query";
import { usePoolzContractInfo } from "../contracts";

interface ContractReadParams {
  chainId: number;
  contractName: string;
  functionName: string;
}

export function useContractRead({
  chainId,
  contractName,
  functionName,
}: ContractReadParams) {
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
