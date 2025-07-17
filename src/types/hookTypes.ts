import type { UseQueryResult } from "@tanstack/react-query";

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
