import { encodeFunctionData, Hex } from "viem";
import { getPoolzContractInfo } from "../utils/getPoolzContractInfo";
import { BatchCall, ALLOWED_CONTRACTS } from "../types/batchTypes";

/**
 * Encodes multiple contract calls into ABI-encoded data for batch execution.
 * Validates contracts and returns an array of encoded call objects.
 */
export async function encodeBatchCalls(
  calls: BatchCall[],
  chainId?: number
) {
  if (!chainId) {
    throw new Error("Chain ID not available");
  }

  const allowedContracts = ALLOWED_CONTRACTS;

  const encodedCalls = await Promise.all(
    calls.map(async (call) => {
      // Validate contract is allowed
      if (!allowedContracts.includes(call.contractName)) {
        throw new Error(
          `Contract ${call.contractName} is not allowed for batch operations. Only LockDealNFT are supported.`
        );
      }

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
