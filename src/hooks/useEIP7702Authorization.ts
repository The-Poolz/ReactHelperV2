import { useCallback } from "react";
import { usePublicClient, useWalletClient } from "wagmi";
import { type Address } from "viem";
import { usePoolzApp } from "./usePoolzApp";
import { hashAuthorization } from "../utils/eip7702-auth";
import type { EIP7702Authorization } from "../types/eip7702Types";

/**
 * Hook for creating EIP-7702 authorizations
 */
export function useEIP7702Authorization() {
  const { address: account, chainId } = usePoolzApp();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  /**
   * Create an EIP-7702 authorization for delegating code execution
   */
  const createAuthorization = useCallback(
    async (
      contractAddress: Address,
      chainIdOverride?: bigint
    ): Promise<EIP7702Authorization> => {
      if (!account || !walletClient || !chainId) {
        throw new Error("Wallet not connected");
      }

      const effectiveChainId = chainIdOverride || BigInt(chainId);
      
      // Get nonce for the account
      const nonce = await publicClient?.getTransactionCount({
        address: account,
      }) || 0n;

      // Create the authorization hash
      const authHash = hashAuthorization(
        effectiveChainId,
        contractAddress,
        BigInt(nonce)
      );

      // Sign the authorization
      const signature = await walletClient.signMessage({
        message: { raw: authHash },
      });

      return {
        chainId: effectiveChainId,
        address: contractAddress,
        nonce: BigInt(nonce),
        signature,
      };
    },
    [account, walletClient, chainId, publicClient]
  );

  return {
    createAuthorization,
  };
}