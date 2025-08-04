import { useAccount,useChainId,useChains,useSwitchChain, useWatchAsset } from "wagmi";

export function usePoolzApp() {
  const chainId = useChainId();
  const chain = useChains().find(c => c.id === chainId);
  const account = useAccount();
  const { switchChainAsync, isPending } = useSwitchChain();
  const watchAsset = useWatchAsset()

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
