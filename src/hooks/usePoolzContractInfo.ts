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
  chainId: number;
  contractName: T;
};

export function usePoolzContractInfo<T extends ContractName>({
  chainId,
  contractName,
}: UsePoolzContractInfoParams<T>): UsePoolzContractInfoReturn<T> {
  const contracts = contractsByChain[chainId];
  if (!contracts) return { smcAddress: zeroAddress, abi: undefined };
  const contract = contracts[contractName as keyof typeof contracts];
  return { smcAddress: contract.address, abi: contract.abi };
}