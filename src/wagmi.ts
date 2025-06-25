import { createClient } from "viem";
import { http, createConfig } from "wagmi";
import { avalanche, avalancheFuji, bsc, bscTestnet, lukso, mainnet, polygon, polygonMumbai } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";

export const config = createConfig({
  chains: [mainnet, bsc, polygon, bscTestnet, lukso, polygonMumbai, avalanche, avalancheFuji], //poolz chains
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
