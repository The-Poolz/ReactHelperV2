import { createClient } from "viem";
import { custom, createConfig } from "wagmi";
import { coinbaseWallet, injected } from "wagmi/connectors";
import { getMetaMaskProvider, getProvider } from "./utils/connector-helper";

// Custom chain configs for chains not available in viem/chains
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

import { bsc, manta, polygon, unichain, mantaTestnet, optimism, abstract, avalancheFuji, viction, harmonyOne, mantaSepoliaTestnet, bscTestnet, telos, oasys, neonMainnet, mainnet, fuse, linea, lukso, polygonAmoy, moonbeam, sepolia, arbitrum, avalanche, base } from "wagmi/chains";

const createConnectors = () => {
  return [
    injected({
      target() {
        return {
          id: "io.metamask",
          name: "MetaMask",
          provider: getMetaMaskProvider(),
        };
      },
    }),

    coinbaseWallet({
      appName: "Poolz",
      appLogoUrl: 'https://poolz.finance/logo.png',
      headlessMode: true,
    }),

    injected({
      target() {
        return {
          id: "binance",
          name: "Binance Wallet",
          provider: getProvider("BinanceChain"),
        };
      },
    }),

    injected({
      target() {
        return {
          id: "com.trustwallet.app",
          name: "Trust Wallet",
          provider: getProvider("trustwallet"),
        };
      },
    }),

  ];
};

export const config: any = createConfig({
  chains: [bsc, manta, polygon, unichain, mantaTestnet, optimism, abstract, avalancheFuji, viction, harmonyOne, mantaSepoliaTestnet, bscTestnet, telos, oasys, neonMainnet, mainnet, fuse, linea, lukso, polygonAmoy, moonbeam, sepolia, arbitrum, avalanche, base, customChain7082400, customChain0, customChain2632500], //poolz chains
  connectors: createConnectors(),
  client({ chain }) {
    const provider = typeof window !== "undefined" && window.ethereum
      ? window.ethereum
      : { request: async () => null };

    // Safe provider access with null checks
    if (provider && typeof provider === 'object') {
      if (provider._log) provider._log.warn = () => {}; // Suppress warnings in the console
    }

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