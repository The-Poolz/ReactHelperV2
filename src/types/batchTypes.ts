import { Hex } from "viem";

// Allowed contract names for batch operations
export const ALLOWED_CONTRACTS = ["LockDealNFT", "LockedDealV2", "Multicall3"] as const;

export type AllowedContractName = typeof ALLOWED_CONTRACTS[number];

// Special type for multicall operations
export type MulticallTarget = {
  target: Hex;
  allowFailure: boolean;
  callData: Hex;
  value?: bigint;
};

// EIP-5792 Batch Transaction Types
export type BatchCall<T extends AllowedContractName = AllowedContractName> = T extends "Multicall3"
  ? {
      contractName: "Multicall3";
      functionName: "aggregate3";
      args: [MulticallTarget[]];
      value?: bigint;
      gas?: bigint;
    }
  : {
      contractName: T;
      functionName: string;
      args?: unknown[];
      value?: bigint;
      gas?: bigint;
    };

export type BatchTransactionOptions = {
  version?: "2.0.0";
  from?: Hex;
  capabilities?: Record<string, any>;
};

export type BatchTransactionResult = {
  id: string;
  calls: {
    to: Hex;
    data: Hex;
    value?: Hex;
    gas?: Hex;
  }[];
};

export type BatchTransactionStatus = 
  | "idle"
  | "preparing" 
  | "pending"
  | "success"
  | "error";

export type UseBatchTransactionReturn = {
  sendBatch: (calls: BatchCall[], options?: BatchTransactionOptions) => Promise<void>;
  status: BatchTransactionStatus;
  data?: BatchTransactionResult;
  error: Error | null;
  reset: () => void;
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
};