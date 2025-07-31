import { useAccount, usePublicClient, useWriteContract } from "wagmi";
import { usePoolzContractInfo } from "./usePoolzContractInfo";
import {
  ContractName,
  ContractFunctionName,
  contractNames,
  ContractFunctionArgs,
} from "../contracts/contractTypes";
import { WriteContractParameters, ReadContractParameters } from "wagmi/actions";
import { TransactionReceipt } from "viem";

export type MulticallSuccess = { result: any; status: "success" };
export type MulticallFailure = { error: Error; status: "failure" };
export type MulticallResult = MulticallSuccess | MulticallFailure;

export type MulticallCallUnion<T extends ContractName> =
  {
    [F in ContractFunctionName<T>]: {
      functionName: F;
      args?: ContractFunctionArgs<T, F>;
    } & Omit<WriteContractParameters, "address" | "abi" | "functionName" | "args">;
  }[ContractFunctionName<T>];

export type MulticallReadParams<T extends ContractName> = {
  contracts: Array<MulticallCallUnion<T>>;
};

export type TypedWriteContract<T extends ContractName> = <
  F extends ContractFunctionName<T>
>(
  params: {
    functionName: F;
    args?: ContractFunctionArgs<T, F>;
  } & Omit<WriteContractParameters, "address" | "abi" | "functionName" | "args">
) => Promise<TransactionReceipt>;

export type TypedReadContract<T extends ContractName> = <
  F extends ContractFunctionName<T>
>(
  params: {
    functionName: F;
    args?: ContractFunctionArgs<T, F>;
  } & Omit<ReadContractParameters, "address" | "abi" | "functionName" | "args">
) => Promise<any>;

export type PoolzContractMethods<T extends ContractName> = {
  smcAddress: `0x${string}`;
  readContract: TypedReadContract<T>;
  writeContract: TypedWriteContract<T>;
  multicall: (params: MulticallReadParams<T>) => Promise<MulticallResult[]>;
};

type PoolzContractObject = {
  [K in ContractName]: PoolzContractMethods<K>;
};

export function usePoolzContract() {
  const publicClient = usePublicClient();
  const { address: account, chainId } = useAccount();
  const { usePoolzContractInfo: getContractInfo } = { usePoolzContractInfo };

  function buildContractMethods<T extends ContractName>(
    contractName: T
  ): PoolzContractMethods<T> {
    const { smcAddress, abi } = getContractInfo({ chainId, contractName });
    const { writeContractAsync } = useWriteContract();

    const readContract: TypedReadContract<T> = async (params) => {
      if (!smcAddress || !abi || !account) {
        throw new Error("Wallet or contract info missing");
      }
      return publicClient.readContract({
        address: smcAddress,
        abi,
        ...params,
      } as any);
    };

    const writeContract: TypedWriteContract<T> = async (params) => {
      if (!smcAddress || !abi || !account) {
        throw new Error("Wallet or contract info missing");
      }
      const hash = await writeContractAsync({
        address: smcAddress,
        abi,
        ...params,
      } as any);
      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      return receipt;
    };

    const multicall = async (params: MulticallReadParams<T>) => {
      if (!smcAddress || !abi || !publicClient) {
        throw new Error("PublicClient or contract info missing");
      }
      const contracts = params.contracts.map((c) => ({
        address: smcAddress,
        abi,
        functionName: c.functionName,
        args: c.args || [],
      })) as any;
      const results = await publicClient.multicall({ contracts });
      // Convert to mutable array and cast to MulticallResult[]
      return Array.from(results) as MulticallResult[];
    };

    return {
      smcAddress,
      readContract,
      writeContract,
      multicall,
    };
  }

  const poolContract = Object.assign(
    {} as PoolzContractObject,
    Object.fromEntries(
      contractNames.map((name) => [name, buildContractMethods(name)])
    )
  );

  return { poolContract };
}
