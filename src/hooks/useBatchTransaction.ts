import { useState, useEffect, useCallback } from "react";
import { useSendCalls } from "wagmi";
import { Hex } from "viem";
import { usePoolzApp } from "./usePoolzApp";
import { encodeBatchCalls } from "../utils/encodeBatchCalls";
import {
  BatchCall,
  BatchTransactionOptions,
  BatchTransactionResult,
  BatchTransactionStatus,
  UseBatchTransactionReturn,
} from "../types/batchTypes";

/**
 * Hook for executing batch transactions using EIP-5792 and wagmi's useSendCalls.
 * Supports LockDealNFT, LockedDealV2 contracts.
 */
export function useBatchTransaction(): UseBatchTransactionReturn {
  const { chainId } = usePoolzApp();
  const [batchStatus, setBatchStatus] = useState<BatchTransactionStatus>("idle");
  const [batchError, setBatchError] = useState<Error | null>(null);
  const [batchData, setBatchData] = useState<BatchTransactionResult | undefined>();

  const { sendCalls, data: callsId, isPending, isSuccess, isError, error } = useSendCalls();

  // Update status based on wagmi useSendCalls state
  useEffect(() => {
    if (isPending) {
      setBatchStatus("pending");
    }
  }, [isPending]);

  useEffect(() => {
    if (isSuccess && callsId) {
      setBatchStatus("success");
    }
  }, [isSuccess, callsId]);

  useEffect(() => {
    if (isError) {
      setBatchStatus("error");
      setBatchError(error || new Error("Transaction failed"));
    }
  }, [isError, error]);

  // --- Send batch transaction ---
  const sendBatch = useCallback(
    async (calls: BatchCall[], options: BatchTransactionOptions = {}) => {
      try {
        setBatchStatus("preparing");
        setBatchError(null);

        const encodedCalls = await encodeBatchCalls(calls, chainId);
        const id = crypto.randomUUID();

        const batchResult: BatchTransactionResult = {
          id: id,
          calls: encodedCalls.map(call => ({
            to: call.to,
            data: call.data,
            value: call.value !== undefined ? `0x${call.value.toString(16)}` as Hex : undefined,
            gas: call.gas !== undefined ? `0x${call.gas.toString(16)}` as Hex : undefined,
          })),
        };

        setBatchData(batchResult);

        // Send the batch transaction using wagmi's useSendCalls (EIP-5792)
        await sendCalls({
          calls: encodedCalls,
          version: options.version,
          capabilities: options.capabilities,
        });

      } catch (error) {
        setBatchStatus("error");
        setBatchError(error as Error);
        throw error;
      }
    },
    [encodeBatchCalls, sendCalls]
  );

  const reset = useCallback(() => {
    setBatchStatus("idle");
    setBatchError(null);
    setBatchData(undefined);
  }, []);

  return {
    sendBatch,
    status: batchStatus,
    data: batchData,
    error: batchError,
    reset,
    isPending: batchStatus === "pending" || batchStatus === "preparing" || isPending,
    isSuccess: batchStatus === "success",
    isError: batchStatus === "error",
  };
}
