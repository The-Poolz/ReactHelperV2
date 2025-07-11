import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";

/**
 * Mutation hook result with all available methods and properties
 *
 * @template TData - The data type returned on success
 * @template TError - The error type thrown on failure
 * @template TVariables - The variables passed to mutationFn
 * @template TContext - Additional context data
 */
export interface MutationHookResult<TData = any, TError = Error, TVariables = any, TContext = unknown>
  extends Omit<UseMutationResult<TData, TError, TVariables, TContext>, never> {
  /**
   * Function to trigger the mutation (fire and forget)
   * @param variables - Variables to pass to the mutation function
   * @param options - Mutation options (onSuccess, onError, etc.)
   */
  mutate: (variables: TVariables, options?: any) => void;

  /**
   * Async function to trigger the mutation (returns promise)
   * @param variables - Variables to pass to the mutation function
   * @param options - Mutation options (onSuccess, onError, etc.)
   * @returns Promise that resolves with mutation result
   */
  mutateAsync: (variables: TVariables, options?: any) => Promise<TData>;

  /** Whether the mutation is currently pending/loading */
  isPending: boolean;

  /** Whether the mutation is currently idle (not called yet) */
  isIdle: boolean;

  /** Whether the mutation has succeeded */
  isSuccess: boolean;

  /** Whether the mutation has failed */
  isError: boolean;

  /** The error object if mutation failed */
  error: TError | null;

  /** The data returned from successful mutation */
  data: TData | undefined;

  /** Function to reset the mutation state */
  reset: () => void;

  /** Current status of the mutation */
  status: 'idle' | 'pending' | 'error' | 'success';
}

/**
 * Query hook result with all available methods and properties
 *
 * @template TData - The data type returned on success
 * @template TError - The error type thrown on failure
 */
export interface QueryHookResult<TData = any, TError = Error>
  extends Omit<UseQueryResult<TData, TError>, never> {
  /** The data returned from successful query */
  data: TData | undefined;

  /** The error object if query failed */
  error: TError | null;

  /** Whether the query is currently loading for the first time */
  isLoading: boolean;

  /** Whether the query is currently fetching (includes refetching) */
  isFetching: boolean;

  /** Whether the query has succeeded */
  isSuccess: boolean;

  /** Whether the query has failed */
  isError: boolean;

  /** Whether the query is pending (loading for first time) */
  isPending: boolean;

  /** Function to manually refetch the query */
  refetch: () => Promise<any>;

  /** Current status of the query */
  status: 'pending' | 'error' | 'success';

  /** How many times query has been fetched */
  fetchStatus: 'fetching' | 'paused' | 'idle';
}

/**
 * Common wallet connection result interface
 */
export interface WalletConnectionResult {
  /** Current connected wallet address */
  address: `0x${string}` | undefined;

  /** Whether wallet is connected */
  isConnected: boolean;

  /** Whether connection is in progress */
  isConnecting: boolean;

  /** Connection error if any */
  error: Error | null;

  /** Function to connect to a specific wallet */
  connect: (walletId: string) => void;

  /** Function to disconnect wallet */
  disconnect: () => void;

  /** Available wallet options */
  walletOptions: WalletOption[];

  /** Function to check if wallet is installed */
  isWalletInstalled: (walletId: string) => boolean;
}

/**
 * Individual wallet option interface
 */
export interface WalletOption {
  id: string;
  name: string;
  connect: () => void;
  installed?: boolean;
  installUrl?: string;
}

/**
 * Contract transaction result
 */
export interface ContractTransactionResult {
  /** Transaction hash */
  transactionHash: `0x${string}`;

  /** Block number where transaction was mined */
  blockNumber: bigint;

  /** Gas used by the transaction */
  gasUsed: bigint;

  /** Transaction status (1 = success, 0 = failed) */
  status: 'success' | 'reverted';

  /** Events/logs emitted by the transaction */
  logs: any[];
}

/**
 * Token balance information
 */
export interface TokenBalanceInfo {
  /** Token contract address */
  address: string;

  /** Raw balance amount */
  balance: string | bigint | number;

  /** Human readable formatted balance */
  formattedBalance: string;

  /** Token decimals */
  decimals: number;

  /** Token symbol */
  symbol: string;

  /** Whether balance is currently loading */
  isLoading: boolean;

  /** Error message if balance fetch failed */
  error?: string;
}
