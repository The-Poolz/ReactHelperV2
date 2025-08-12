export { PoolzProvider } from "./PoolzProvider";

export { getPoolzContractInfo } from "./utils/getPoolzContractInfo";
export type { PoolzContractInfoReturn } from "./utils/getPoolzContractInfo";
export { usePoolzApp } from "./hooks/usePoolzApp";
export { usePoolzContract } from "./hooks/usePoolzContract";
export type {
  PoolzContractMethods,
  MulticallReadUnion,
  MulticallResult,
  MulticallReadResults,
  MulticallSuccess,
  MulticallFailure,
  PoolzContractObject,
  ContractReadFunction,
  ContractWriteFunction,
  ContractFunction,
  ContractReadFunctionBuilder,
  ContractWriteFunctionBuilder,
  DynamicContractInterface,
  DynamicReadInterface,
  DynamicWriteInterface,
  BaseContractParams,
  WriteResult,
  WriteOptions,
} from "./hooks/usePoolzContract";

// Export contract types for advanced usage
export type {
  ContractName,
  ContractReadFunctionName,
  ContractWriteFunctionName,
  ContractReadSchemas,
  ContractWriteSchemas,
  ContractReturnTypes,
} from "./contracts/contractTypes";
export { contractNames } from "./contracts/contractTypes";

export { useTokenApproval } from "./hooks/useTokenApproval";
export type { UseTokenApprovalReturn, UseTokenApprovalOptions } from "./hooks/useTokenApproval";

// Exporting hooks and components related to ERC20 tokens
export { useERC20 } from "./hooks/useERC20";
export type { UseERC20Return } from "./hooks/useERC20";
export type { ERC20BalanceParams, UseERC20BalanceReturn } from "./hooks/useERC20Balance";
export type { ERC20InfoParams, IERC20Info } from "./hooks/useERC20Info";
export type { ERC20AllowanceParams, UseERC20AllowanceReturn } from "./hooks/useERC20Allowance";
export type { ERC20ApproveArgs, UseERC20ApproveReturn } from "./hooks/useERC20Approve";

// Exporting NFT metadata related hooks and components
export { useNFTMetadata } from "./hooks/useNFTMetadata";
export { NFTMetadataModal } from "./components/NFTMetadataModal";
export { NFTIdButton } from "./components/NFTIdButton";
export type { NFTMetadata, NFTMetadataState, UseNFTMetadataReturn } from "./hooks/useNFTMetadata";
export type { NFTMetadataModalProps } from "./components/NFTMetadataModal";
export type { NFTIdButtonProps } from "./components/NFTIdButton";

// Exporting hooks for token balances and native balances
export { useTokenBalance, useTokenBalances, useNativeBalance } from './hooks/useTokenBalance';
export type { TokenBalance, NativeBalance } from './contexts/BalanceContext';
export { useSidNameForAddress } from "./hooks/useSidNameForAddress";
export { useWalletConnection } from "./hooks/useWalletConnection";
export { useTheSiwe } from "./hooks/useTheSiwe";

export type {
  QueryHookResult,
  WalletConnectionResult,
  WalletOption,
} from "./types/hookTypes";
export { getChainNativeSymbol } from './utils/balance-helper';
export * from './utils/helpers';