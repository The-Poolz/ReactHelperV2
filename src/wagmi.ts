import { http, createConfig } from "wagmi";
import { bsc } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";
import { createClient } from 'viem'

export const config = createConfig({
  chains: [bsc], //poolz main chain
  connectors: [injected(), coinbaseWallet(), walletConnect({ projectId: import.meta.env.VITE_WC_PROJECT_ID })],
  client({ chain }) {
    return createClient({ chain, transport: http() })
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
