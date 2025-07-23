import { formatUnits } from "viem";
import { ChainContracts, contractsByChain } from "../contracts";

export const isEnoughBalance = (
  balance: string,
  fee: string,
  decimals: number = 18
) => {
  const _balance = Number(formatUnits(BigInt(balance), decimals));
  const _fee = Number(formatUnits(BigInt(fee), decimals));
  return _fee <= _balance;
};

export const isEnoughGasFee = (
  balance: string,
  gasFee: string,
  decimals: number = 18
) => {
  const _balance = Number(formatUnits(BigInt(balance), decimals));
  const _gasFee = Number(formatUnits(BigInt(gasFee), decimals));
  return _gasFee <= _balance;
};

/**
 * Get all chain IDs where a given contract is available.
 * @param contract The contract key (e.g. "LockDealNFT")
 * @returns Array of chain IDs (number) where the contract exists
 */
export const getAvailableNets = <T extends keyof ChainContracts>(contract: T): number[] => {
  return Object.entries(contractsByChain)
    .filter(([, chainConfig]) => contract in chainConfig)
    .map(([chainId]) => Number(chainId));
};