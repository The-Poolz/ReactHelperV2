import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'
import { poolzChains } from './poolzData.ts'

const knownChains = {
  [mainnet.id]: mainnet,
  [sepolia.id]: sepolia,
}

const chains = poolzChains.map((id) => knownChains[id]).filter(Boolean)

if (chains.length === 0) chains.push(mainnet, sepolia)

export const config = createConfig({
  chains,
  connectors: [
    injected(),
    coinbaseWallet(),
    walletConnect({ projectId: import.meta.env.VITE_WC_PROJECT_ID }),
  ],
  transports: Object.fromEntries(chains.map((c) => [c.id, http()])),
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
