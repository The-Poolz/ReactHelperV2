import { contractsByChain } from "../contracts";
import { ContractName } from "../contracts/contractTypes";

export function usePoolzContractInfo(chainId: number, contractName: ContractName) {
  const contracts = (contractsByChain as any)[chainId];
  if (!contracts) return { smcAddress: undefined, abi: undefined };
  const contract = contracts[contractName];
  return { smcAddress: contract?.address, abi: contract?.abi };
}