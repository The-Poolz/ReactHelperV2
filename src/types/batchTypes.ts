import { Hex } from "viem";

// Allowed contract names for batch operations
export type AllowedContractName = "LockDealNFT" | "LockedDealV2" | "DispenserProvider";

// EIP-7702 Batch Transaction Types
export type BatchCall<T extends AllowedContractName = AllowedContractName> = {
  contractName: T;
  functionName: string;
  args?: any[];
  value?: bigint;
  gas?: bigint;
};

export type BatchTransactionOptions = {
  version?: "1.0";
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