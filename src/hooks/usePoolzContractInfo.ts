import { Abi, zeroAddress } from "viem";
import { contractsByChain } from "../contracts";
import { ContractAbiMap, ContractName } from "../contracts/contractTypes";

export interface UsePoolzContractInfoReturn<
  T extends ContractName = ContractName
> {
  smcAddress: `0x${string}`;
  abi: ContractAbiMap[T] | Abi | undefined;
}

export type UsePoolzContractInfoParams<T extends ContractName = ContractName> = {
  chainId?: number;
  contractName: T;
};

export function usePoolzContractInfo<T extends ContractName>({
  chainId,
  contractName,
}: UsePoolzContractInfoParams<T>): UsePoolzContractInfoReturn<T> {
  const emptyState = { smcAddress: zeroAddress, abi: undefined };
  if (!chainId || !contractName) return emptyState;
  const contracts = contractsByChain[chainId];
  if (!contracts) return emptyState;
  const contract = contracts[contractName as keyof typeof contracts] as { address: `0x${string}`; abi: ContractAbiMap[T] | Abi };
  if (!contract) return emptyState;
  return { smcAddress: contract.address, abi: contract.abi };
}