import { useMemo } from "react";
import { useAccount, useChainId, useDisconnect, useSwitchChain, useWatchAsset } from "wagmi";
import { config } from "../wagmi";
import { Chain } from "viem/chains";
import { watchAccount } from "wagmi/actions";

export function watchAccountChange(callback: (account: any) => void) {
  return watchAccount(config, {
    onChange: callback,
  });
}

export function usePoolzApp() {
  const chainId = useChainId();
  const account = useAccount();
  const { disconnect } = useDisconnect()
  const { switchChainAsync, isPending } = useSwitchChain();
  const watchAsset = useWatchAsset();

  const chain = useMemo(() => {
    return config.chains.find((c: Chain) => c.id === chainId);
  }, [chainId, config.chains]);

  const disconnectWallet = async () => {
    disconnect()
    if(typeof window === 'undefined') return
    try {
      await window.ethereum.request({
        method: "wallet_revokePermissions",
        params: [
          {
            eth_accounts: {}
          }
        ]
      })
    } catch (error) {
      console.error("Error disconnecting wallet:", error)
    }
  }

  return {
    ...account,
    chain,
    chainId,
    account: account.address,
    switchChainAsync,
    isSwitching: isPending,
    watchAsset,
    disconnectWallet
  };
}
