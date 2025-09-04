import React, { createContext, useMemo, useState, useEffect, ReactNode } from "react";
import { useAccount, useChainId, useDisconnect, useSwitchChain, useWatchAsset } from "wagmi";
import { config } from "../wagmi";
import { Chain } from "viem/chains";
import { Address } from "viem";
import type { UseSwitchChainReturnType } from "wagmi";

export const CUSTOMER_ACCOUNT_VARIABLE = "__CUSTOMER_ACCOUNT__";

export interface PoolzAppContextType {
  address?: Address;
  account?: Address;
  connectedAccount?: Address;
  isConnecting: boolean;
  isReconnecting: boolean;
  isConnected: boolean;
  isDisconnected: boolean;
  status: "connecting" | "reconnecting" | "connected" | "disconnected";
  chain?: Chain;
  chainId: number;

  switchChainAsync: UseSwitchChainReturnType['switchChainAsync'];
  isSwitching: boolean;
  watchAsset: ReturnType<typeof useWatchAsset>;
  disconnectWallet: () => Promise<void>;
}

export const PoolzAppContext = createContext<PoolzAppContextType | undefined>(undefined);

interface PoolzAppProviderProps {
  children: ReactNode;
}

export const PoolzAppProvider: React.FC<PoolzAppProviderProps> = ({ children }) => {
  const chainId = useChainId();
  const account = useAccount();
  const { disconnect } = useDisconnect();
  const { switchChainAsync, isPending } = useSwitchChain();
  const watchAsset = useWatchAsset();

  // Customer account management
  const [customerAccount, setCustomerAccountState] = useState<string | undefined>();

  // Initialize customer account from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(CUSTOMER_ACCOUNT_VARIABLE);
    if (stored) {
      setCustomerAccountState(stored);
    }
  }, []);

  const chain = useMemo(() => {
    return config.chains.find((c: Chain) => c.id === chainId);
  }, [chainId]);

  const effectiveAccount = (customerAccount || account.address) as Address | undefined;

  const disconnectWallet = async () => {
    disconnect();

    if (typeof window === 'undefined') return;
    try {
      await (window as any).ethereum?.request({
        method: "wallet_revokePermissions",
        params: [
          {
            eth_accounts: {}
          }
        ]
      });
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  };

  const contextValue: PoolzAppContextType = {
    ...account,
    account: effectiveAccount,
    connectedAccount: account.address,
    chain,
    chainId,

    switchChainAsync,
    isSwitching: isPending,
    watchAsset,
    disconnectWallet,
  };

  return (
    <PoolzAppContext.Provider value={contextValue}>
      {children}
    </PoolzAppContext.Provider>
  );
};

