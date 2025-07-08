import { createClient } from "viem";
import { http, createConfig } from "wagmi";
import { telos, base, polygon, moonbeam, avalanche, mantaTestnet, manta, mainnet, arbitrum, sepolia, bscTestnet, bsc } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";

const walletConnectProjectId = import.meta.env.VITE_WC_PROJECT_ID;

if (!walletConnectProjectId) {
  throw new Error("VITE_WC_PROJECT_ID environment variable is required");
}

export const config = createConfig({
  chains: [telos, base, polygon, moonbeam, avalanche, mantaTestnet, manta, mainnet, arbitrum, sepolia, bscTestnet, bsc], //poolz chains
  connectors: [
    injected(),
    coinbaseWallet(),
    walletConnect({ projectId: walletConnectProjectId }),
  ],
  client({ chain }) {
    return createClient({ chain, transport: http() });
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
