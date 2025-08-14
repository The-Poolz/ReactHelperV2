import { useConnect, useDisconnect, useAccount } from "wagmi";
import type { Connector } from "wagmi";
import type { WalletConnectionResult, WalletOption } from "../types/hookTypes";
import { walletConfigs } from "../wagmi";

const getInstallUrl = (id: string): string | undefined => {
  const config = Object.values(walletConfigs).find((cfg) => cfg.id === id);
  return config?.installUrl;
};

const isWalletInstalled = (connectorId: string): boolean => {
  const config = Object.values(walletConfigs).find(cfg => cfg.id === connectorId);
  return config?.installed ?? false;
};

export const useWalletConnection = (): WalletConnectionResult => {
  const { connect, connectors, isPending, error } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected, isConnecting } = useAccount();

  // Get wallet options directly from wagmi connectors
  const getWalletOptions = (): WalletOption[] => {
    const uniqueConnectors = connectors.filter(
      (c: Connector, idx: number, arr: Connector[]) =>
        arr.findIndex((x: Connector) => x.id === c.id) === idx
    );
    return uniqueConnectors.map((connector: Connector) => ({
      id: connector.id,
      name: connector.name,
      connect: () => connect({ connector }),
      installed: isWalletInstalled(connector.id),
      installUrl: getInstallUrl(connector.id),
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
