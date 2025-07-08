import { formatUnits } from "viem";

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
