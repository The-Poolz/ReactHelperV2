import { useState, useEffect, useCallback } from "react";
import { useSendCalls } from "wagmi";
import { encodeFunctionData, Hex } from "viem";
import { getPoolzContractInfo } from "../utils/getPoolzContractInfo";
import { usePoolzApp } from "./usePoolzApp";
import {
  BatchCall,
  BatchTransactionOptions,
  BatchTransactionResult,
  BatchTransactionStatus,
  UseBatchTransactionReturn,
  AllowedContractName,
} from "../types/batchTypes";

/**
 * Hook for executing batch transactions using EIP-7702 and wagmi's useSendCalls
 * Supports LockDealNFT, LockedDealV2, and DispenserProvider contracts
 * This provides true atomic batch execution in a single transaction
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

  const encodeBatchCalls = useCallback(
    async (calls: BatchCall[]) => {
      if (!chainId) {
        throw new Error("Chain ID not available");
      }

      const allowedContracts: AllowedContractName[] = ["LockDealNFT", "LockedDealV2", "DispenserProvider"];
      
      const encodedCalls = await Promise.all(
        calls.map(async (call) => {
          // Validate contract is allowed
          if (!allowedContracts.includes(call.contractName)) {
            throw new Error(`Contract ${call.contractName} is not allowed for batch operations. Only LockDealNFT, LockedDealV2, and DispenserProvider are supported.`);
          }

          const contractInfo = getPoolzContractInfo({
            contractName: call.contractName as any,
            chainId: chainId,
          });
          
          if (!contractInfo || !contractInfo.abi) {
            throw new Error(`Contract ${call.contractName} not found for chain ${chainId}`);
          }

          const data = encodeFunctionData({
            abi: contractInfo.abi,
            functionName: call.functionName,
            args: call.args || [],
          });

          return {
            to: contractInfo.smcAddress as Hex,
            data,
            value: call.value,
            gas: call.gas,
          };
        })
      );

      return encodedCalls;
    },
    [chainId]
  );

  const sendBatch = useCallback(
    async (calls: BatchCall[], options: BatchTransactionOptions = {}) => {
      try {
        setBatchStatus("preparing");
        setBatchError(null);

        const encodedCalls = await encodeBatchCalls(calls);
        
        const batchResult: BatchTransactionResult = {
          id: Date.now().toString(),
          calls: encodedCalls.map(call => ({
            to: call.to,
            data: call.data,
            value: call.value ? `0x${call.value.toString(16)}` as Hex : undefined,
            gas: call.gas ? `0x${call.gas.toString(16)}` as Hex : undefined,
          })),
        };

        setBatchData(batchResult);

        // Send the batch transaction using wagmi's useSendCalls (EIP-7702)
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