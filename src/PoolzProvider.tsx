import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { type PropsWithChildren } from "react";
import { WagmiProvider } from "wagmi";
import { config } from "./wagmi";

const queryClient = new QueryClient();

export function PoolzProvider({ children }: Readonly<PropsWithChildren>): JSX.Element {
  return (
    <React.StrictMode>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </WagmiProvider>
    </React.StrictMode>
  );
}
