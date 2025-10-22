import { BatchCall } from "../types/batchTypes";
import { createMulticallBatch } from "./multicallBatchUtils";

/**
 * Batch operation builders for common patterns including multicall optimizations
 */
export class BatchOperationBuilder {
  constructor(private chainId: number) {}

  /**
   * Creates a multicall batch from multiple individual calls
   */
  createMulticallBatch(
    calls: Array<{
      contractName: "LockDealNFT" | "LockedDealV2";
      functionName: string;
      args?: unknown[];
      value?: bigint;
    }>,
    options: {
      allowFailure?: boolean;
    } = {}
  ): BatchCall<"Multicall3"> {
    return createMulticallBatch(calls, this.chainId, options);
  }

  /**
   * Create an approval-wrapped multicall batch for NFT operations
   * Automatically adds setApprovalForAll(true) before and setApprovalForAll(false) after
   * the multicall operations for proper NFT handling with Multicall3
   */
  createApprovalWrappedBatch(
    nftCalls: Array<{
      contractName: "LockDealNFT" | "LockedDealV2";
      functionName: string;
      args?: unknown[];
      value?: bigint;
    }>,
    multicall3Address: string,
    options: {
      allowFailure?: boolean;
      chunkSize?: number; // Split large operations into chunks
    } = {}
  ): BatchCall[] {
    const { allowFailure = true, chunkSize = 20 } = options;
    const result: BatchCall[] = [];

    // Step 1: Enable approval for Multicall3
    result.push({
      contractName: "LockDealNFT",
      functionName: "setApprovalForAll",
      args: [multicall3Address, true],
    });

    // Step 2: Create multicall batches (split into chunks if needed)
    for (let i = 0; i < nftCalls.length; i += chunkSize) {
      const chunk = nftCalls.slice(i, i + chunkSize);
      const multicallBatch = this.createMulticallBatch(chunk, { allowFailure });
      result.push(multicallBatch);
    }

    // Step 3: Disable approval for Multicall3
    result.push({
      contractName: "LockDealNFT",
      functionName: "setApprovalForAll",
      args: [multicall3Address, false],
    });

    return result;
  }
}