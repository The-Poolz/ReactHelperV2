import { createClient } from "viem";
import { custom, createConfig } from "wagmi";
import { coinbaseWallet, injected } from "wagmi/connectors";

// Custom chain configs for chains not available in viem/chains
export const customChain0 = {
  id: 0,
  name: "CKB",
  nativeCurrency: {
    decimals: 18,
    name: "CKB",
    symbol: "CKB",
  },
  rpcUrls: {
    default: {
      http: ["https://v1.mainnet.godwoken.io/rpc"],
    },
  },
  blockExplorers: {
    default: {
      name: "CKB Scan",
      url: "https://explorer-0.example.com",
    },
  },
} as const;

export const customChain7082400 = {
  id: 7082400,
  name: "COTI Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "COTI",
    symbol: "COTI",
  },
  rpcUrls: {
    default: {
      http: ["http://57.181.4.91:8545/"],
    },
  },
  blockExplorers: {
    default: {
      name: "COTI Testnet Scan",
      url: "https://explorer-7082400.example.com",
    },
  },
} as const;

export const customChain2632500 = {
  id: 2632500,
  name: "COTI Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "COTI",
    symbol: "COTI",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.poolz.finance/coti"],
    },
  },
  blockExplorers: {
    default: {
      name: "COTI Mainnet Scan",
      url: "https://explorer-2632500.example.com",
    },
  },
} as const;

import { bscTestnet, sepolia, arbitrum, avalanche, manta, unichain, bsc, mantaTestnet, polygon, optimism, abstract, avalancheFuji, viction, harmonyOne, mantaSepoliaTestnet, oasys, base, neonMainnet, telos, mainnet, fuse, lukso, polygonAmoy, moonbeam } from "wagmi/chains";



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
  chains: [bscTestnet, sepolia, arbitrum, avalanche, manta, unichain, bsc, mantaTestnet, polygon, optimism, abstract, avalancheFuji, viction, harmonyOne, mantaSepoliaTestnet, oasys, base, neonMainnet, telos, mainnet, fuse, lukso, polygonAmoy, moonbeam, customChain0, customChain7082400, customChain2632500], //poolz chains
  connectors: createConnectors(),
  client({ chain }) {
    const provider = typeof window !== "undefined" && window.ethereum
      ? window.ethereum
      : { request: async () => null };
    if(provider?._log) provider._log.warn = () => {}; // Suppress warnings in the console
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
