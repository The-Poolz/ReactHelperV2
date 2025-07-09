import { createClient } from "viem";
import { http, createConfig } from "wagmi";
import { unichain, telos, polygon, moonbeam, avalanche, mantaTestnet, manta, mainnet, bscTestnet, sepolia, base, bsc, arbitrum } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";

// const walletConnectProjectId = import.meta.env.VITE_WC_PROJECT_ID;

// if (!walletConnectProjectId) {
//   throw new Error("VITE_WC_PROJECT_ID environment variable is required");
// }

export const config = createConfig({
  chains: [unichain, telos, polygon, moonbeam, avalanche, mantaTestnet, manta, mainnet, bscTestnet, sepolia, base, bsc, arbitrum], //poolz chains
  connectors: [injected(), coinbaseWallet()],
  client({ chain }) {
    return createClient({ chain, transport: http() });
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
