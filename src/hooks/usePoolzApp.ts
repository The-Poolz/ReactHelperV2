import { useMemo } from "react";
import { useAccount,useChainId, useSwitchChain, useWatchAsset } from "wagmi";
import { config } from "../wagmi";
import { Chain } from "viem/chains";

export function usePoolzApp() {
  const chainId = useChainId();
  const account = useAccount();
  const { switchChainAsync, isPending } = useSwitchChain();
  const watchAsset = useWatchAsset()

  const chain = useMemo(() => {
    return config.chains.find((c: Chain) => c.id === chainId);
  }, [chainId, config.chains]);

  return {
    ...account,
    chain,
    chainId,
    account: account.address,
    switchChainAsync,
    isSwitching: isPending,
    watchAsset
  };
}
