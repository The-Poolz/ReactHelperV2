import { contractsByChain } from "../contracts";
import { ContractName } from "../contracts/contractTypes";

export interface UsePoolzContractInfoReturn {
  smcAddress: `0x${string}` | undefined;
  abi: any[] | undefined;
}

export function usePoolzContractInfo(chainId: number, contractName: ContractName): UsePoolzContractInfoReturn {
  const contracts = (contractsByChain as any)[chainId];
  if (!contracts) return { smcAddress: undefined, abi: undefined };
  const contract = contracts[contractName];
  return { smcAddress: contract?.address, abi: contract?.abi };
}