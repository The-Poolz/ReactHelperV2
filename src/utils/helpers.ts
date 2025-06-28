import Decimal from "decimal.js";
import { formatUnits } from "viem";

export const isEnoughBalance = (
  balance: string,
  fee: string,
  decimals: number = 18
) => {
  const _balance = new Decimal(formatUnits(BigInt(balance), decimals));
  const _fee = new Decimal(formatUnits(BigInt(fee), decimals));
  return !_fee.greaterThan(_balance);
};

export const isEnoughGasFee = (
  balance: string,
  gasPrice: string,
  decimals: number = 18
) => {
  const _balance = new Decimal(formatUnits(BigInt(balance), decimals));
  const _gasPrice = new Decimal(formatUnits(BigInt(gasPrice), decimals));

  return !_gasPrice.greaterThan(_balance);
};
