import { useAccount, useChainId } from "wagmi";

/**
 * Hook to get current account information
 * Re-exports wagmi's useAccount for easier use in V2
 */
export const useAccountInfo = () => {
  const { address, ...rest } = useAccount();
  const chainId = useChainId();

  return {
    ...rest,
    account: address,
    chainId
  };
};

