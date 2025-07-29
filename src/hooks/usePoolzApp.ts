import { useAccount,useChainId,useSwitchChain } from "wagmi";

export function usePoolzApp() {
  const chainId = useChainId();
  const { address, ...rest } = useAccount();
  const { switchChainAsync, isPending } = useSwitchChain();

  return {
    ...rest,
    chainId,
    account: address,
    switchChainAsync,
    isSwitching: isPending,
  };
}
