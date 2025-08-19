import { useAccount, usePublicClient, useWriteContract } from "wagmi";
import { getPoolzContractInfo } from "../utils/getPoolzContractInfo";
import {
  ContractName,
  ContractReadFunctionName,
  ContractWriteFunctionName,
  contractNames,
  ContractReadSchemas,
  ContractWriteSchemas,
  ContractReturnTypes,
} from "../contracts/contractTypes";
import { WriteContractParameters } from "wagmi/actions";
import { TransactionReceipt } from "viem";
import { useMemo } from "react";

export type MulticallSuccess<T = any> = { result: T; status: "success" };
export type MulticallFailure = { error: Error; status: "failure" };
export type MulticallResult<T = any> = MulticallSuccess<T> | MulticallFailure;

export type MulticallReadUnion<T extends ContractName> = {
  [F in ContractReadFunctionName<T>]: {
    functionName: F;
    args?: ContractReadSchemas[T][F];
  } & Omit<
    WriteContractParameters,
    "address" | "abi" | "functionName" | "args"
  >;
}[ContractReadFunctionName<T>];

export type MulticallReadResults<
  T extends ContractName,
  Calls extends MulticallReadUnion<T>[]
> = {
  [K in keyof Calls]: Calls[K] extends { functionName: infer F }
    ? F extends ContractReadFunctionName<T>
      ? F extends keyof ContractReturnTypes[T]
        ? MulticallResult<ContractReturnTypes[T][F]>
        : MulticallResult
      : MulticallResult
    : MulticallResult;
};

export type BaseContractParams = Omit<
  WriteContractParameters,
  "address" | "abi" | "functionName" | "args"
>;

// Write function result interface - conditional based on whether function has outputs
export type WriteResult<
  T extends ContractName,
  F extends ContractWriteFunctionName<T>
> = F extends keyof ContractReturnTypes[T]
  ? ContractReturnTypes[T][F] extends void
    ? TransactionReceipt
    : TransactionReceipt & { data: ContractReturnTypes[T][F] }
  : TransactionReceipt;

// Clean function interfaces without phantom types
export type ContractReadFunction<
  T extends ContractName,
  F extends ContractReadFunctionName<T>
> = {
  read: () => Promise<F extends keyof ContractReturnTypes[T] ? ContractReturnTypes[T][F] : any>;
};

export type WriteOptions = {
  fetchReturnData?: boolean;
};

export type GasEstimate = {
  gasLimit: bigint;
  gasPrice: bigint;
  gasFee: bigint;
  hasSufficientBalance: boolean;
  currentBalance: bigint;
};

export type ContractWriteFunction<
  T extends ContractName,
  F extends ContractWriteFunctionName<T>
> = {
  write: (options?: WriteOptions) => Promise<WriteResult<T, F>>;
  estimateGas: () => Promise<GasEstimate>;
};

// Union type for all contract functions
export type ContractFunction<
  T extends ContractName,
  F extends ContractReadFunctionName<T> | ContractWriteFunctionName<T>
> = F extends ContractReadFunctionName<T>
  ? ContractReadFunction<T, F>
  : F extends ContractWriteFunctionName<T>
  ? ContractWriteFunction<T, F>
  : never;

// Type for the read function builder - simplified
export type ContractReadFunctionBuilder<
  T extends ContractName,
  F extends ContractReadFunctionName<T>
> = (
  params?: {
    args?: ContractReadSchemas[T][F];
  } & BaseContractParams
) => ContractReadFunction<T, F>;

// Type for the write function builder - simplified
export type ContractWriteFunctionBuilder<
  T extends ContractName,
  F extends ContractWriteFunctionName<T>
> = (
  params?: {
    args?: ContractWriteSchemas[T][F];
  } & BaseContractParams
) => ContractWriteFunction<T, F>;

// Dynamic contract interface with separate read and write functions
export type DynamicReadInterface<T extends ContractName> = {
  [F in ContractReadFunctionName<T>]: ContractReadFunctionBuilder<T, F>;
};

export type DynamicWriteInterface<T extends ContractName> = {
  [F in ContractWriteFunctionName<T>]: ContractWriteFunctionBuilder<T, F>;
};

export type DynamicContractInterface<T extends ContractName> =
  DynamicReadInterface<T> & DynamicWriteInterface<T>;

export type PoolzContractMethods<T extends ContractName> = {
  smcAddress: `0x${string}`;
  multicall: <Calls extends MulticallReadUnion<T>[]>(params: {
    contracts: Calls;
  }) => Promise<MulticallReadResults<T, Calls>>;
} & DynamicContractInterface<T>;

export type PoolzContractObject = {
  [K in ContractName]: PoolzContractMethods<K>;
};

function buildContractMethods<T extends ContractName>(
  contractName: T,
  chainId: number | undefined,
  account: string | undefined,
  publicClient: ReturnType<typeof usePublicClient>,
  writeContractAsync: ReturnType<typeof useWriteContract>["writeContractAsync"]
): PoolzContractMethods<T> {
  const { smcAddress, abi } = getPoolzContractInfo({ chainId, contractName });

  const multicall = async <Calls extends MulticallReadUnion<T>[]>(params: {
    contracts: Calls;
  }): Promise<MulticallReadResults<T, Calls>> => {
    if (!smcAddress || !abi || !publicClient) {
      throw new Error("PublicClient or contract info missing");
    }
    const contracts = params.contracts.map((c) => ({
      address: smcAddress,
      abi,
      functionName: c.functionName,
      args: c.args || [],
    }));
    const results = await publicClient.multicall({ contracts });

    return results.map((result: any) => {
      if ("error" in result) {
        return { error: result.error, status: "failure" } as MulticallFailure;
      }
      return {
        result: result.result,
        status: "success",
      } as MulticallSuccess;
    }) as MulticallReadResults<T, Calls>;
  };

  const dynamicInterface = {} as DynamicContractInterface<T>;

  if (!abi) {
    return {
      smcAddress,
      multicall,
      ...dynamicInterface,
    };
  }

  const abiArray = Array.isArray(abi) ? abi : [];
  const functions = abiArray.filter((item: any) => item.type === "function");

  functions.forEach((func: any) => {
    const functionName = func.name;
    const isReadOnly =
      func.stateMutability === "view" ||
      func.stateMutability === "pure" ||
      func.stateMutability === "constant";
    const hasReturnData = func.outputs && func.outputs.length > 0;

    (dynamicInterface as any)[functionName] = (params: any = {}) => {
      const { args, ...additionalParams } = params;

      if (isReadOnly) {
        return {
          read: async () => {
            if (!smcAddress || !abi) {
              throw new Error("Contract info missing");
            }
            return publicClient.readContract({
              address: smcAddress,
              abi,
              functionName,
              args: args || [],
              ...additionalParams,
            } as any);
          },
        };
      } else {
        return {
          write: async (options?: WriteOptions) => {
            if (!smcAddress || !abi || !account) {
              throw new Error("Wallet or contract info missing");
            }
            const hash = await writeContractAsync({
              address: smcAddress,
              abi,
              functionName,
              args: args || [],
              ...additionalParams,
            } as any);
            const receipt = await publicClient.waitForTransactionReceipt({
              hash,
            });

            if (hasReturnData && options?.fetchReturnData) {
              try {
                const returnData = await publicClient.readContract({
                  address: smcAddress,
                  abi,
                  functionName,
                  args: args || [],
                  blockNumber: receipt.blockNumber,
                } as any);
                return { ...receipt, data: returnData };
              } catch (error) {
                console.warn(
                  `Could not retrieve return data for ${functionName}:`,
                  error
                );
                return receipt;
              }
            }

            return receipt;
          },
          estimateGas: async (): Promise<GasEstimate> => {
            if (!smcAddress || !abi || !account) {
              throw new Error("Wallet or contract info missing");
            }

            const gasLimit = await publicClient.estimateContractGas({
              address: smcAddress,
              abi,
              functionName,
              args: args || [],
              account,
              ...additionalParams,
            } as any);

            const gasPrice = await publicClient.getGasPrice();

            const gasFee = gasLimit * gasPrice;

            const currentBalance = await publicClient.getBalance({
              address: account,
            });

            const hasSufficientBalance = currentBalance >= gasFee;

            return {
              gasLimit,
              gasPrice,
              gasFee: BigInt(gasFee),
              hasSufficientBalance,
              currentBalance,
            };
          },
        };
      }
    };
  });

  return {
    smcAddress,
    multicall,
    ...dynamicInterface,
  };
}

export function usePoolzContract() {
  const publicClient = usePublicClient();
  const { address: account, chainId } = useAccount();
  const { writeContractAsync } = useWriteContract();

  const poolzContract = useMemo(() => {
    return Object.assign(
      {} as PoolzContractObject,
      Object.fromEntries(
        contractNames.map((name) => [
          name,
          buildContractMethods(
            name,
            chainId,
            account,
            publicClient,
            writeContractAsync
          ),
        ])
      )
    );
  }, [account, chainId, publicClient, writeContractAsync]);

  const poolzTokenAddress = useMemo((): `0x${string}` => {
    switch (chainId) {
      case 56: // BSC Mainnet
        return "0xbAeA9aBA1454DF334943951d51116aE342eAB255";
      case 97: // BSC Testnet
      default:
        return "0xE14A2A1006B83F363569BC7b5b733191E919ca34";
    }
  }, [chainId]);

  return {
    poolzContract,
    poolzTokenAddress,
  };
}
