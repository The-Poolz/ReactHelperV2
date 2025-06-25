import { createClient } from "viem";
import { http, createConfig } from "wagmi";
import { telos, base, polygon, moonbeam, avalanche, mantaTestnet, manta, mainnet, arbitrum, sepolia } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";

export const config = createConfig({
  chains: [telos, base, polygon, moonbeam, avalanche, mantaTestnet, manta, mainnet, arbitrum, sepolia], //poolz chains
  connectors: [injected(), coinbaseWallet(), walletConnect({ projectId: import.meta.env.VITE_WC_PROJECT_ID })],
  client({ chain }) {
    return createClient({ chain, transport: http() });
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
