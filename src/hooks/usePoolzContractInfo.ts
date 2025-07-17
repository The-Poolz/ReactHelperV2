import { Abi } from "viem";
import { contractsByChain } from "../contracts";
import { ContractAbiMap, ContractName } from "../contracts/contractTypes";

export interface UsePoolzContractInfoReturn<
  T extends ContractName = ContractName
> {
  smcAddress: `0x${string}` | undefined;
  abi: ContractAbiMap[T] | Abi | undefined;
}

export type UsePoolzContractInfoParams<T extends ContractName = ContractName> = {
  chainId: number;
  contractName: T;
};

export function usePoolzContractInfo<T extends ContractName>({
  chainId,
  contractName,
}: UsePoolzContractInfoParams<T>): UsePoolzContractInfoReturn<T> {
  const contracts = contractsByChain[chainId];
  if (!contracts) return { smcAddress: undefined, abi: undefined };
  const contract = contracts[contractName as keyof typeof contracts];
  return { smcAddress: contract?.address, abi: contract?.abi };
}