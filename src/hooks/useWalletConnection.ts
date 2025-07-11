import { useConnect, useDisconnect, useAccount } from "wagmi";
import type { Connector } from "wagmi";
import type { WalletConnectionResult, WalletOption } from "../types/hookTypes";

// Wallet install URLs mapping
const walletInstallUrls: Record<string, string> = {
  metaMaskSDK: "https://metamask.io/download/",
  coinbaseWalletSDK: "https://wallet.coinbase.com/",
  binance: "https://www.binance.org/en",
  trust: "https://trustwallet.com/download",
};

export const useWalletConnection = (): WalletConnectionResult => {
  const { connect, connectors, isPending, error } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected, isConnecting } = useAccount();

  const isWalletInstalled = (connectorId: string): boolean => {
    if (typeof window === "undefined") return false;

    switch (connectorId) {
      case "metaMaskSDK":
        return typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask;
      case "coinbaseWalletSDK":
        return typeof window.ethereum !== "undefined" && window.ethereum.isCoinbaseWallet;
      case "binance":
        return typeof window.BinanceChain !== "undefined";
      case "trust":
        return typeof window.trustwallet !== "undefined";
      default:
        return false;
    }
  };

  // Get wallet options directly from wagmi connectors
  const getWalletOptions = (): WalletOption[] => {
    return connectors.map((connector: Connector) => ({
      id: connector.id,
      name: connector.name,
      connect: () => connect({ connector }),
      installed: isWalletInstalled(connector.id),
      installUrl: walletInstallUrls[connector.id],
    }));
  };

  const connectWallet = (walletId: string) => {
    const connector = connectors.find((c: Connector) => c.id === walletId);
    if (connector) {
      connect({ connector });
    } else {
      console.error("No connector found for wallet ID:", walletId);
    }
  };

  return {
    address,
    isConnected,
    isConnecting: isConnecting || isPending,
    error,
    connect: connectWallet,
    disconnect,
    walletOptions: getWalletOptions(),
    isWalletInstalled,
  };
};