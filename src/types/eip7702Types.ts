import type { Address, Hash, Hex } from "viem";
import type { ContractName, ContractWriteFunctionName, ContractWriteSchemas } from "../contracts/contractTypes";

/**
 * EIP-7702 Authorization structure for delegating code execution
 */
export interface EIP7702Authorization {
  /** Chain ID where the authorization is valid */
  chainId: bigint;
  /** Address of the contract to delegate to */
  address: Address;
  /** Nonce for replay protection */
  nonce: bigint;
  /** Authorization signature */
  signature: Hex;
}

/**
 * Parameters for a single contract call in a batch
 */
export interface BatchCallParams<T extends ContractName> {
  /** Contract name */
  contractName: T;
  /** Function name to call */
  functionName: ContractWriteFunctionName<T>;
  /** Function arguments */
  args?: ContractWriteSchemas[T][ContractWriteFunctionName<T>];
  /** Value to send with the call (in wei) */
  value?: bigint;
}

/**
 * Batch transaction parameters
 */
export interface BatchTransactionParams {
  /** Array of contract calls to execute */
  calls: BatchCallParams<any>[];
  /** Gas limit for the entire batch */
  gasLimit?: bigint;
  /** Gas price for the transaction */
  gasPrice?: bigint;
  /** Maximum fee per gas (EIP-1559) */
  maxFeePerGas?: bigint;
  /** Maximum priority fee per gas (EIP-1559) */
  maxPriorityFeePerGas?: bigint;
}

/**
 * Result of a batch execution
 */
export interface BatchExecutionResult {
  /** Transaction hash */
  hash: Hash;
  /** Whether the batch was successful */
  success: boolean;
  /** Results for each call in the batch */
  callResults: Array<{
    success: boolean;
    returnData?: Hex;
    error?: string;
  }>;
  /** Gas used for the entire batch */
  gasUsed?: bigint;
}

/**
 * Options for EIP-7702 batch execution
 */
export interface EIP7702BatchOptions {
  /** Whether to use EIP-7702 delegation */
  useEIP7702?: boolean;
  /** Authorization data for EIP-7702 */
  authorization?: EIP7702Authorization;
  /** Whether to simulate the batch before execution */
  simulate?: boolean;
  /** Maximum gas to use for the batch */
  maxGas?: bigint;
}

/**
 * Configuration options for EIP-7702 support detection
 */
export interface EIP7702SupportOptions {
  /** Custom list of chain IDs that support EIP-7702 */
  supportedChains?: number[];
  /** Enable dynamic chain capability checking */
  checkDynamically?: boolean;
}

/**
 * Hook return type for EIP-7702 batch operations
 */
export interface UseEIP7702BatchResult {
  /** Execute a batch of contract calls */
  executeBatch: (
    params: BatchTransactionParams,
    options?: EIP7702BatchOptions
  ) => Promise<BatchExecutionResult>;
  
  /** Create an EIP-7702 authorization */
  createAuthorization: (
    contractAddress: Address,
    chainId?: bigint
  ) => Promise<EIP7702Authorization>;
  
  /** Estimate gas for a batch of calls */
  estimateBatchGas: (
    params: BatchTransactionParams,
    options?: EIP7702BatchOptions
  ) => Promise<bigint>;
  
  /** Whether the current wallet supports EIP-7702 */
  supportsEIP7702: boolean;
  
  /** Current loading state */
  isLoading: boolean;
  
  /** Current error state */
  error: Error | null;
}