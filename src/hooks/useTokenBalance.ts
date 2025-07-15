import { useEffect } from 'react';
import { useBalanceContext, type TokenBalance, type NativeBalance } from '../contexts/BalanceContext';

// Re-export types from context for convenience
export type { TokenBalance, NativeBalance } from '../contexts/BalanceContext';

/**
 * Hook to get balance of a specific token
 * @param tokenAddress - The token address to get balance for
 * @returns TokenBalance object with balance, symbol, decimals, etc.
 */
export const useTokenBalance = (tokenAddress: string): TokenBalance => {
  const { balances, addTokenAddress } = useBalanceContext();

  useEffect(() => {
    if (tokenAddress) {
      addTokenAddress(tokenAddress);
    }
  }, [tokenAddress, addTokenAddress]);

  const normalizedAddress = tokenAddress.toLowerCase();
  return balances[normalizedAddress] || {
    address: tokenAddress,
    balance: '0',
    formattedBalance: '0',
    decimals: 18,
    symbol: 'TOKEN',
    isLoading: false,
  };
};

/**
 * Hook to get balances of multiple tokens
 * @param tokenAddresses - Array of token addresses
 * @returns Array of TokenBalance objects
 */
export const useTokenBalances = (tokenAddresses: string[]): TokenBalance[] => {
  const { balances, addTokenAddress } = useBalanceContext();

  useEffect(() => {
    tokenAddresses.forEach(address => {
      if (address)  addTokenAddress(address);
    });
  }, [tokenAddresses, addTokenAddress]);

  return tokenAddresses.map(address => {
    const normalizedAddress = address.toLowerCase();
    return balances[normalizedAddress] || {
      address,
      balance: '0',
      formattedBalance: '0',
      decimals: 18,
      symbol: 'TOKEN',
      isLoading: false,
    };
  });
};

/**
 * Hook to get native balance (ETH, BNB, MATIC, etc.)
 * @returns NativeBalance object with balance, symbol, etc.
 */
export const useNativeBalance = (): NativeBalance => {
  const { nativeBalance } = useBalanceContext();
  return nativeBalance;
};
