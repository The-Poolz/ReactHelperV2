import { useState, useCallback, useMemo } from "react";
import { usePublicClient, useWalletClient } from "wagmi";
import { type Hash } from "viem";
import { usePoolzApp } from "./usePoolzApp";
import { useEIP7702Authorization } from "./useEIP7702Authorization";
import {
  encodeBatchCalls,
  supportsEIP7702,
  validateBatchParams,
} from "../utils/eip7702-helper";
import { estimateBatchGasStandard } from "../utils/batch-execution";
import type {
  BatchTransactionParams,
  BatchExecutionResult,
  EIP7702BatchOptions,
  UseEIP7702BatchResult,
  EIP7702SupportOptions,
} from "../types/eip7702Types";

/**
 * Hook for EIP-7702 batch operations on Poolz contracts
 * Enables batching multiple contract calls into a single transaction
 */
export function useEIP7702Batch(options?: EIP7702SupportOptions): UseEIP7702BatchResult {
  const { address: account, chainId } = usePoolzApp();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Check if current chain supports EIP-7702 with configurable options
  const chainSupportsEIP7702 = useMemo(() => {
    return chainId ? supportsEIP7702(chainId, options) : false;
  }, [chainId, options]);

  // Use the authorization hook
  const { createAuthorization } = useEIP7702Authorization();

  /**
   * Estimate gas for a batch of contract calls
   */
  const estimateBatchGas = useCallback(
    async (
      params: BatchTransactionParams,
      options: EIP7702BatchOptions = {}
    ): Promise<bigint> => {
      if (!account || !publicClient || !chainId) {
        throw new Error("Wallet not connected");
      }

      validateBatchParams(params);

      // Encode all calls
      const encodedCalls = encodeBatchCalls(params, chainId);

      // For now, use standard estimation (EIP-7702 would need specific implementation)
      const estimatedGas = await estimateBatchGasStandard(
        encodedCalls,
        publicClient,
        account
      );

      // Apply max gas limit if specified
      if (options.maxGas && estimatedGas > options.maxGas) {
        throw new Error(`Estimated gas (${estimatedGas}) exceeds maximum (${options.maxGas})`);
      }

      return estimatedGas;
    },
    [account, publicClient, chainId]
  );

  /**
   * Execute a batch of contract calls
   */
  const executeBatch = useCallback(
    async (
      params: BatchTransactionParams,
      options: EIP7702BatchOptions = {}
    ): Promise<BatchExecutionResult> => {
      if (!account || !walletClient || !publicClient || !chainId) {
        throw new Error("Wallet not connected");
      }

      setIsLoading(true);
      setError(null);

      try {
        validateBatchParams(params);

        // Encode all calls
        const encodedCalls = encodeBatchCalls(params, chainId);

        // Estimate gas if not provided
        const gasLimit = params.gasLimit || await estimateBatchGas(params, options);

        // For EIP-7702 batch execution, we would need a batch contract or native support
        // For now, we'll execute calls sequentially as a fallback
        // In a real implementation, this would use EIP-7702 delegation when available

        const callResults: BatchExecutionResult["callResults"] = [];
        let totalGasUsed = 0n;
        let hasFailure = false;

        if (options.useEIP7702 && chainSupportsEIP7702 && options.authorization) {
          // EIP-7702 batch execution would go here
          // This is a placeholder for actual EIP-7702 implementation
          throw new Error("EIP-7702 batch execution not yet implemented - use standard batch");
        } else {
          // Standard sequential execution
          for (const call of encodedCalls) {
            try {
              // Build transaction parameters, only including defined values
              const txParams: any = {
                to: call.to,
                data: call.data,
                value: call.value,
                gas: gasLimit / BigInt(encodedCalls.length), // Distribute gas evenly
              };

              // Only include gas pricing if provided
              if (params.gasPrice) txParams.gasPrice = params.gasPrice;
              if (params.maxFeePerGas) txParams.maxFeePerGas = params.maxFeePerGas;
              if (params.maxPriorityFeePerGas) txParams.maxPriorityFeePerGas = params.maxPriorityFeePerGas;

              const hash = await walletClient.sendTransaction(txParams);

              const receipt = await publicClient.waitForTransactionReceipt({ hash });
              
              callResults.push({
                success: receipt.status === "success",
                returnData: "0x", // Would contain actual return data
              });

              totalGasUsed += receipt.gasUsed;
            } catch (callError) {
              hasFailure = true;
              callResults.push({
                success: false,
                error: callError instanceof Error ? callError.message : "Unknown error",
              });
            }
          }
        }

        const result: BatchExecutionResult = {
          hash: "0x" as Hash, // In real batch, this would be the batch transaction hash
          success: !hasFailure,
          callResults,
          gasUsed: totalGasUsed,
        };

        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Unknown error");
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [account, walletClient, publicClient, chainId, chainSupportsEIP7702, estimateBatchGas]
  );

  return {
    executeBatch,
    createAuthorization,
    estimateBatchGas,
    supportsEIP7702: chainSupportsEIP7702,
    isLoading,
    error,
  };
}