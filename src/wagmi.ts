import { createClient } from "viem";
import { http, createConfig } from "wagmi";
import { telos, base, unichain, manta, moonbeam, mantaTestnet, viction, mainnet, sepolia, avalanche, arbitrum, polygon, bscTestnet, neonMainnet, bsc } from "wagmi/chains";
import { coinbaseWallet, metaMask, injected } from "wagmi/connectors";


export const walletConfigs: Record<string, { name: string; connector: () => any; installUrl: string }> = {
  metamask: {
    name: "MetaMask",
    installUrl: "https://metamask.io/",
    connector: () => metaMask({
      dappMetadata: {
        name: "Poolz Interface",
        url: "https://www.poolz.finance/",
        iconUrl: "https://www.poolz.finance/favicon.ico",
      },
    }),
  },
  coinbase: {
    name: "Coinbase Wallet",
    installUrl: "https://wallet.coinbase.com/",
    connector: () => coinbaseWallet({
      appName: "Poolz Interface",
      appLogoUrl: "https://www.poolz.finance/favicon.ico",
    }),
  },
  binance: {
    name: "Binance Wallet",
    installUrl: "https://www.binance.org/en/binance-wallet",
    connector: () => injected({
      target() {
        return {
          id: "binance",
          name: "Binance Wallet",
          provider: typeof window !== "undefined" ? window.BinanceChain : undefined,
        };
      },
    }),
  },
  trust: {
    name: "Trust Wallet",
    installUrl: "https://trustwallet.com/",
    connector: () => injected({
      target() {
        return {
          id: "trust",
          name: "Trust Wallet",
          provider: typeof window !== "undefined" ? window.trustwallet : undefined,
        };
      },
    }),
  },

};

const createConnectors = () => {
  return [
    walletConfigs.metamask.connector(),
    walletConfigs.binance.connector(),
    walletConfigs.coinbase.connector(),
    walletConfigs.trust.connector(),
  ];
};

export const config: any = createConfig({
  chains: [telos, base, unichain, manta, moonbeam, mantaTestnet, viction, mainnet, sepolia, avalanche, arbitrum, polygon, bscTestnet, neonMainnet, bsc], //poolz chains
  connectors: createConnectors(),
  client({ chain }) {
    return createClient({ chain, transport: http() });
  },
});

// Clean production build - debug logs removed

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}

declare global {
  interface Window {
    BinanceChain?: any;
    trustwallet?: any;
  }
}
