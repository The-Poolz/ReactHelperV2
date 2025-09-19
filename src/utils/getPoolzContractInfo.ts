import { Abi, zeroAddress } from "viem";
import { contractsByChain } from "../contracts";
import { ContractAbiMap, ContractName } from "../contracts/contractTypes";

type ContractInfo = {
  address: `0x${string}`;
  abi: Abi;
  nameVersion: string;
};

export interface PoolzContractInfoReturn<
  T extends ContractName = ContractName
> {
  smcAddress: `0x${string}`;
  abi: ContractAbiMap[T] | Abi | undefined;
  nameVersion: string;
}

export type PoolzContractInfoParams<T extends ContractName = ContractName> = {
  chainId?: number;
  contractName: T;
};

const EMPTY_CONTRACT_INFO = {
  smcAddress: zeroAddress,
  abi: undefined,
  nameVersion: '',
} as const;

export function getPoolzContractInfo<T extends ContractName>({
  chainId,
  contractName,
}: PoolzContractInfoParams<T>): PoolzContractInfoReturn<T> {
  if (!chainId || !contractName) return EMPTY_CONTRACT_INFO

  const chainContracts = contractsByChain[chainId] as Record<ContractName, ContractInfo> | undefined;
  const contract = chainContracts?.[contractName];

  if (!contract) return EMPTY_CONTRACT_INFO

  return {
    smcAddress: contract.address,
    abi: contract.abi,
    nameVersion: contract.nameVersion,
  };
}