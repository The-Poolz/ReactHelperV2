import { encodeFunctionData, Hex } from "viem";
import { getPoolzContractInfo } from "./getPoolzContractInfo";
import { BatchCall, MulticallTarget } from "../types/batchTypes";

// Creates multicall targets from individual contract calls
export function createMulticallTargets(
  calls: Array<{
    contractName: "LockDealNFT" | "LockedDealV2";
    functionName: string;
    args?: unknown[];
    value?: bigint;
  }>,
  chainId: number,
  allowFailure: boolean = false
): MulticallTarget[] {
  return calls.map(call => {
    const contractInfo = getPoolzContractInfo({
      contractName: call.contractName,
      chainId,
    });

    if (!contractInfo || !contractInfo.abi) {
      throw new Error(`Contract ${call.contractName} not found for chain ${chainId}`);
    }

    const callData = encodeFunctionData({
      abi: contractInfo.abi,
      functionName: call.functionName,
      args: call.args || [],
    });

    return {
      target: contractInfo.smcAddress as Hex,
      allowFailure,
      callData,
      value: call.value,
    };
  });
}

// Creates a multicall BatchCall that bundles multiple operations
export function createMulticallBatch(
  calls: Array<{
    contractName: "LockDealNFT" | "LockedDealV2";
    functionName: string;
    args?: unknown[];
    value?: bigint;
  }>,
  chainId: number,
  options: {
    allowFailure?: boolean;
  } = {}
): BatchCall<"Multicall3"> {
  const { allowFailure = false } = options;
  const targets = createMulticallTargets(calls, chainId, allowFailure);

  // Use aggregate3 - args should be just the array of targets
  const args: [MulticallTarget[]] = [targets];

  return { contractName: "Multicall3", functionName: "aggregate3", args, value: undefined };
}

// Automatically groups calls into optimal batches using multicall when needed
export function optimizeBatchCalls(
  calls: BatchCall[],
  chainId: number,
  maxDirectCalls: number = 10 // multicalls in the 10-call limit
): BatchCall[] {
  // Separate direct calls from multicall calls
  const directCalls = calls.filter(call => call.contractName !== "Multicall3");
  const multicallCalls = calls.filter(call => call.contractName === "Multicall3");

  // If we're within the limit, return as-is
  if (calls.length <= maxDirectCalls) return calls;

  // Group eligible calls for multicall (LockDealNFT and LockedDealV2)
  const eligibleForMulticall = directCalls.filter(call => 
    call.contractName === "LockDealNFT" || call.contractName === "LockedDealV2"
  );
  const notEligibleForMulticall = directCalls.filter(call => 
    call.contractName !== "LockDealNFT" && call.contractName !== "LockedDealV2"
  );

  // If we have many eligible calls, group them into multicalls
  const optimizedCalls: BatchCall[] = [...multicallCalls, ...notEligibleForMulticall];
  
  // Group eligible calls into chunks that fit within multicall limits
  const multicallChunkSize = 50; // Multicall can handle many more calls than direct sendCalls
  for (let i = 0; i < eligibleForMulticall.length; i += multicallChunkSize) {
    const chunk = eligibleForMulticall.slice(i, i + multicallChunkSize);
    const multicallBatch = createMulticallBatch(
      chunk.map(call => ({
        contractName: call.contractName as "LockDealNFT" | "LockedDealV2",
        functionName: call.functionName,
        args: call.args,
        value: call.value,
      })),
      chainId
    );
    optimizedCalls.push(multicallBatch);
  }

  return optimizedCalls;
}