import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { type PropsWithChildren } from "react";
import { WagmiProvider } from "wagmi";
import { config } from "./wagmi";
import { BalanceProvider } from "./contexts/BalanceContext";

const queryClient = new QueryClient();

interface PoolzProviderProps extends PropsWithChildren {
  tokenAddresses?: string[];
  refreshInterval?: number;
}

export function PoolzProvider({
  children,
  tokenAddresses,
  refreshInterval,
}: PoolzProviderProps): JSX.Element {
  return (
    <React.StrictMode>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <BalanceProvider
            tokenAddresses={tokenAddresses}
            refreshInterval={refreshInterval}
          >
            {children}
          </BalanceProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </React.StrictMode>
  );
}
