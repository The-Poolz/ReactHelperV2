import React, { createContext, useContext, useCallback, useEffect, useState } from 'react';
import { useAccount, useConfig, usePublicClient } from 'wagmi';
import { multicall } from 'wagmi/actions';
import { formatUnits } from 'viem';
import {
  parseMulticallResults,
  getChainNativeSymbol,
  prepareMulticallContracts,
  lowerCaseAddresses,
} from '../utils/balance-helper';

export interface TokenBalance {
  address: string;
  balance: string | bigint | number;
  formattedBalance: string;
  decimals: number;
  symbol: string;
  isLoading: boolean;
  error?: string;
}

export interface NativeBalance {
  balance: string | bigint;
  formattedBalance: string;
  symbol: string;
  isLoading: boolean;
  error?: string;
}

interface BalanceContextType {
  balances: Record<string, TokenBalance>;
  nativeBalance: NativeBalance;
  addTokenAddress: (address: string) => void;
  refreshBalances: () => Promise<void>;
  refreshNativeBalance: () => Promise<void>;
  isRefreshing: boolean;
}

const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

export const useBalanceContext = () => {
  const context = useContext(BalanceContext);
  if (!context) {
    throw new Error('useBalanceContext must be used within a BalanceProvider');
  }
  return context;
};

interface BalanceProviderProps {
  children: React.ReactNode;
  tokenAddresses?: string[];
  refreshInterval?: number;
}

export const BalanceProvider: React.FC<BalanceProviderProps> = ({
  children,
  tokenAddresses = [],
  refreshInterval = 30000,
}) => {
  const { address: account, chainId } = useAccount();
  const config = useConfig();
  const publicClient = usePublicClient();
  const [balances, setBalances] = useState<Record<string, TokenBalance>>({});
  const [nativeBalance, setNativeBalance] = useState<NativeBalance>({
    balance: 0n,
    formattedBalance: '0',
    symbol: 'BNB',
    isLoading: false,
  });
  const [trackedAddresses, setTrackedAddresses] = useState(new Set(tokenAddresses));
  const [isRefreshing, setIsRefreshing] = useState(false);

  const addTokenAddress = useCallback((address: string) => {
    const normalizedAddress = address.toLowerCase();
    setTrackedAddresses(prev => new Set([...prev, normalizedAddress]));
  }, []);

  // Fetch balances for all tracked addresses
  const refreshBalances = useCallback(async () => {
    if (!account || !chainId || trackedAddresses.size === 0) {
      return;
    }
    setIsRefreshing(true);
    try {
      const addressArray = lowerCaseAddresses(trackedAddresses);
      const contracts = prepareMulticallContracts(addressArray, account);
      const results = await multicall(config, {
        contracts,
        chainId: chainId as any,
      });
      const parsedBalances = parseMulticallResults(addressArray, results)
      setBalances(parsedBalances);
    } catch (error) {
      console.error('Error fetching balances:', error);
      setBalances(prev => {
        const newBalances = { ...prev };
        Array.from(trackedAddresses).forEach(addr => {
          newBalances[addr] = {
            ...newBalances[addr],
            isLoading: false,
            error: error instanceof Error ? error.message : 'Unknown error',
          };
        });
        return newBalances;
      });
    } finally {
      setIsRefreshing(false);
    }
  }, [account, chainId, trackedAddresses, config]);

  const refreshNativeBalance = useCallback(async () => {
    if (!account || !publicClient) return;
    setNativeBalance(prev => ({ ...prev, isLoading: true }));
    try {
      const balance = await publicClient.getBalance({ address: account });
      const formattedBalance = formatUnits(balance, 18);
      const symbol = getChainNativeSymbol(chainId, config);
      setNativeBalance({
        balance: balance,
        formattedBalance,
        symbol,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error fetching native balance:', error);
      setNativeBalance(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }));
    }
  }, [account, publicClient, chainId, config]);

  useEffect(() => {
    if (account && chainId && trackedAddresses.size > 0) {
      refreshBalances();
    }
  }, [account, chainId, trackedAddresses, refreshBalances]);

  useEffect(() => {
    if (account && chainId) {
      refreshNativeBalance();
    }
  }, [account, chainId, refreshNativeBalance]);

  useEffect(() => {
    if (!refreshInterval || !account || !chainId) return;

    const interval = setInterval(() => {
      if (trackedAddresses.size > 0) {
        refreshBalances();
      }
      refreshNativeBalance();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval, account, chainId, trackedAddresses, refreshBalances, refreshNativeBalance]);

  return (
    <BalanceContext.Provider
      value={{
        balances,
        nativeBalance,
        addTokenAddress,
        refreshBalances,
        refreshNativeBalance,
        isRefreshing,
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
};
