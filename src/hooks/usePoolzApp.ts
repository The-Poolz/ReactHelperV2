import { useAccount,useChainId,useSwitchChain, useWatchAsset } from "wagmi";

export function usePoolzApp() {
  const chainId = useChainId();
  const account = useAccount();
  const { switchChainAsync, isPending } = useSwitchChain();
  const watchAsset = useWatchAsset()

  return {
    ...account,
    chainId,
    account: account.address,
    switchChainAsync,
    isSwitching: isPending,
    watchAsset
  };
}
