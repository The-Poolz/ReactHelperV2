import { type Address, type Hex, encodeFunctionData } from "viem";
import { getPoolzContractInfo } from "./getPoolzContractInfo";
import type { 
  BatchCallParams, 
  BatchTransactionParams,
  EIP7702SupportOptions 
} from "../types/eip7702Types";
import type { ContractName } from "../contracts/contractTypes";

/**
 * Encode a single contract call for batch execution
 */
export function encodeBatchCall<T extends ContractName>(
  call: BatchCallParams<T>,
  chainId: number
): { to: Address; data: Hex; value: bigint } {
  const contractInfo = getPoolzContractInfo({
    contractName: call.contractName,
    chainId
  });
  
  if (!contractInfo.smcAddress || !contractInfo.abi) {
    throw new Error(`Contract ${call.contractName} not found for chain ${chainId}`);
  }

  const data = encodeFunctionData({
    abi: contractInfo.abi,
    functionName: call.functionName as any,
    args: call.args || [],
  } as any);

  return {
    to: contractInfo.smcAddress,
    data,
    value: call.value || 0n,
  };
}

/**
 * Encode multiple contract calls into a batch
 */
export function encodeBatchCalls(
  params: BatchTransactionParams,
  chainId: number
): Array<{ to: Address; data: Hex; value: bigint }> {
  return params.calls.map(call => encodeBatchCall(call, chainId));
}

/**
 * Validate batch call parameters
 */
export function validateBatchParams(params: BatchTransactionParams): void {
  if (!params.calls || params.calls.length === 0) {
    throw new Error("Batch must contain at least one call");
  }
  
  if (params.calls.length > 100) {
    throw new Error("Batch cannot contain more than 100 calls");
  }
  
  for (const call of params.calls) {
    if (!call.contractName || !call.functionName) {
      throw new Error("Each call must specify contractName and functionName");
    }
  }
}

/**
 * Check if a chain supports EIP-7702
 */
export function supportsEIP7702(
  chainId: number, 
  options?: EIP7702SupportOptions
): boolean {
  const { supportedChains, checkDynamically = false } = options || {};
  
  // If custom supported chains are provided, use those
  if (supportedChains && Array.isArray(supportedChains)) {
    return supportedChains.includes(chainId);
  }
  
  // In the future, this could make an RPC call to check if the chain supports EIP-7702
  if (checkDynamically) {
    // TODO: Implement dynamic checking via RPC when EIP-7702 is standardized
    return false;
  }
  
  // Conservative default: assume no native EIP-7702 support until explicitly configured
  return false;
}

// Re-export auth and execution utilities
export { createAuthorizationData, hashAuthorization } from "./eip7702-auth";
export { estimateBatchGasStandard, createMulticallData } from "./batch-execution";