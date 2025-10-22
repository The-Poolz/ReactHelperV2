import { encodeFunctionData, Hex } from "viem";
import { getPoolzContractInfo } from "../utils/getPoolzContractInfo";
import { BatchCall, ALLOWED_CONTRACTS } from "../types/batchTypes";
import { optimizeBatchCalls } from "./multicallBatchUtils";

/**
 * Encodes multiple contract calls into ABI-encoded data for batch execution.
 * Automatically optimizes large batches using Multicall when beneficial.
 * Validates contracts and returns an array of encoded call objects.
 */
export async function encodeBatchCalls(
  calls: BatchCall[],
  chainId?: number,
  options: {
    autoOptimize?: boolean;
    maxDirectCalls?: number;
  } = {}
) {
  if (!chainId) {
    throw new Error("Chain ID not available");
  }

  const { autoOptimize = true, maxDirectCalls = 10 } = options;
  const allowedContracts = ALLOWED_CONTRACTS;

  // Auto-optimize calls if enabled and we have many calls
  const callsToProcess = autoOptimize && calls.length > maxDirectCalls
    ? optimizeBatchCalls(calls, chainId, maxDirectCalls)
    : calls;

  const encodedCalls = await Promise.all(
    callsToProcess.map(async (call) => {
      // Validate contract is allowed
      if (!allowedContracts.includes(call.contractName)) {
        throw new Error(
          `Contract ${call.contractName} is not allowed for batch operations. Only ${allowedContracts.join(", ")} are supported.`
        );
      }

      // Handle Multicall3 contracts
      if (call.contractName === "Multicall3") {
        const contractInfo = getPoolzContractInfo({
          contractName: "Multicall3",
          chainId,
        });

        if (!contractInfo || !contractInfo.abi) {
          throw new Error(`Multicall3 not available on chain ${chainId}`);
        }

        const data = encodeFunctionData({
          abi: contractInfo.abi,
          functionName: "aggregate3",
          args: call.args as any, // Type assertion needed for complex multicall args
        });

        return {
          to: contractInfo.smcAddress as Hex,
          data,
          value: call.value,
          gas: call.gas,
        };
      }

      // Handle regular contracts
      const contractInfo = getPoolzContractInfo({
        contractName: call.contractName,
        chainId,
      });

      if (!contractInfo || !contractInfo.abi) {
        throw new Error(
          `Contract ${call.contractName} not found for chain ${chainId}`
        );
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
}
