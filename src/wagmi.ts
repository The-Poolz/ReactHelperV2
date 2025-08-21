import { createClient } from "viem";
import { custom, createConfig } from "wagmi";
import { bscTestnet, base, sepolia, avalanche, mainnet, manta, polygon, unichain, telos, moonbeam, mantaTestnet, viction, neonMainnet, bsc, arbitrum } from "wagmi/chains";
import { coinbaseWallet, injected } from "wagmi/connectors";

type WalletConfig = {
  id: string;
  name: string;
  installUrl: string;
  installed: boolean;
  connector: () => any;
};

type InjectedWalletConfigParams = {
  id: string;
  name: string;
  installUrl: string;
  providerKey: string;
  installed: boolean;
};

function createInjectedWallet({ id, name, installUrl, providerKey, installed }: InjectedWalletConfigParams): WalletConfig {
  return {
    id,
    name,
    installUrl,
    installed,
    connector: () => injected({
      target() {
        return {
          id,
          name,
          provider: typeof window !== "undefined" ? (window as any)?.[providerKey] : undefined,
        };
      },
    }),
  };
}

function createCoinbaseWallet(): WalletConfig {
  return {
    id: "coinbaseWalletSDK",
    name: "Coinbase Wallet",
    installUrl: "https://wallet.coinbase.com/",
    connector: () => coinbaseWallet({
      appName: "Poolz Interface",
      appLogoUrl: "https://www.poolz.finance/favicon.ico",
    }),
    installed: typeof window !== "undefined" ? Boolean(window?.ethereum?.isCoinbaseWallet) :   false,
  };
}

export const walletConfigs: Record<string, WalletConfig> = {
  metamask: createInjectedWallet({
    id: "io.metamask",
    name: "MetaMask",
    installUrl: "https://metamask.io/download/",
    providerKey: "ethereum",
    installed: typeof window !== "undefined" ? Boolean(window?.ethereum?.isMetaMask) : false,
  }),
  binance: createInjectedWallet({
    id: "binance",
    name: "Binance Wallet",
    installUrl: "https://www.binance.org/en",
    providerKey: "BinanceChain",
    installed: typeof window !== "undefined" ? Boolean(window?.BinanceChain) : false,
  }),
  trust: createInjectedWallet({
    id: "trust",
    name: "Trust Wallet",
    installUrl: "https://trustwallet.com/download",
    providerKey: "trustwallet",
    installed: typeof window !== "undefined" ? Boolean(window?.trustwallet) : false,
  }),
  coinbase: createCoinbaseWallet(),
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
  chains: [bscTestnet, base, sepolia, avalanche, mainnet, manta, polygon, unichain, telos, moonbeam, mantaTestnet, viction, neonMainnet, bsc, arbitrum], //poolz chains
  connectors: createConnectors(),
  client({ chain }) {
    const provider = typeof window !== "undefined" && window.ethereum
      ? window.ethereum
      : { request: async () => null };
    if(provider) provider._log.warn = () => {}; // Suppress warnings in the console
    return createClient({ chain, transport: custom(provider) });
  },
});


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
