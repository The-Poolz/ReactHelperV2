interface WalletInfo {
  installUrl: string;
  detectInstalled: () => boolean;
}

export const walletInfo: Record<string, WalletInfo> = {
  "io.metamask": {
    installUrl: "https://metamask.io/download/",
    detectInstalled: () =>
      typeof window !== "undefined" && Boolean(window?.ethereum?.isMetaMask),
  },
  coinbaseWalletSDK: {
    installUrl: "https://www.coinbase.com/wallet",
    detectInstalled: () => {
      if (typeof window === "undefined") return false;

      // Multiple ways to detect Coinbase Wallet
      const hasProviderMap = Boolean(window?.ethereum?.providerMap?.has?.("CoinbaseWallet"));
      const hasCoinbaseExtension = Boolean((window as any)?.coinbaseWalletExtension);

      return hasProviderMap || hasCoinbaseExtension;
    },
  },
  binance: {
    installUrl: "https://www.binance.org/en",
    detectInstalled: () =>
      typeof window !== "undefined" && Boolean((window as any)?.BinanceChain),
  },
  "com.trustwallet.app": {
    installUrl: "https://trustwallet.com/download",
    detectInstalled: () => {
      if (typeof window === "undefined") return false;

      // Multiple ways to detect Trust Wallet
      const hasTrustWallet = Boolean((window as any)?.trustwallet);
      const hasEthereumTrust = Boolean((window as any)?.ethereum?.isTrust);

      return hasTrustWallet || hasEthereumTrust;
    },
  },
};

export const getProvider = (providerKey: string) => {
  if (typeof window === "undefined") return undefined;
  const originalProvider = (window as any)[providerKey];

  if (!originalProvider) return undefined;

  return {
    ...originalProvider,
    request: (args: any) => {
      try {
        if (originalProvider?.request) {
          return originalProvider.request(args);
        }

        // Fallback for wallets without request method
        if (args.method === 'eth_requestAccounts' && originalProvider.enable) {
          return originalProvider.enable();
        }

      } catch {}
    },
  };
};


// Function to get the MetaMask provider, handling multiple providers scenario
export const getMetaMaskProvider = () => {
  if (typeof window === "undefined" || !window.ethereum) return undefined;

  const ethereum = window.ethereum;

  if (ethereum.providers && Array.isArray(ethereum.providers)) {
    return ethereum.providers.find(
      (provider: any) => provider.isMetaMask && !provider.isCoinbaseWallet
    );
  }

  if (ethereum.isMetaMask && !ethereum.isCoinbaseWallet) {
    return ethereum;
  }

  return undefined;
};

export const getInstallUrl = (id: string): string | undefined => {
  return walletInfo[id]?.installUrl;
};

export const isWalletInstalled = (connectorId: string): boolean => {
  return walletInfo[connectorId]?.detectInstalled() ?? false;
};
