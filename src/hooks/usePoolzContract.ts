import { useAccount, usePublicClient, useWriteContract } from "wagmi";
import { usePoolzContractInfo } from "./usePoolzContractInfo";
import {
  ContractName,
  ContractFunctionName,
  contractNames,
} from "../contracts/contractTypes";
import { WriteContractParameters, ReadContractParameters } from "wagmi/actions";
import { TransactionReceipt } from "viem";

interface ReadContractParams<T extends ContractName>
  extends Omit<ReadContractParameters, "address" | "abi" | "functionName"> {
  functionName: ContractFunctionName<T>;
}

interface WriteContractParams<T extends ContractName>
  extends Omit<WriteContractParameters, "address" | "abi" | "functionName"> {
  functionName: ContractFunctionName<T>;
}

interface MulticallReadParams<T extends ContractName> {
  calls: {
    functionName: ContractFunctionName<T>;
    args: any[];
  }[];
}

type PoolzContractMethods<T extends ContractName> = {
  smcAddress: `0x${string}`;
  readContract: (params: ReadContractParams<T>) => Promise<any>;
  writeContract: (params: WriteContractParams<T>) => Promise<TransactionReceipt>;
  multicall: (params: MulticallReadParams<T>) => Promise<any>;
};

type PoolzContractObject = {
  [K in ContractName]: PoolzContractMethods<K>;
};

export function usePoolzContract() {
  const publicClient = usePublicClient();
  const { address: account, chainId } = useAccount();
  const { usePoolzContractInfo: getContractInfo } = { usePoolzContractInfo };

  function buildContractMethods<T extends ContractName>(contractName: T): PoolzContractMethods<T> {
    const { smcAddress, abi } = getContractInfo({ chainId, contractName });
    const { writeContractAsync } = useWriteContract();

    const readContract = async (params: ReadContractParams<T>) => {
      if (!smcAddress || !abi || !account) {
        throw new Error("Wallet or contract info missing");
      }
      return publicClient.readContract({
        address: smcAddress,
        abi,
        ...params,
      } as any);
    };

    const writeContract = async (params: WriteContractParams<T>): Promise<TransactionReceipt> => {
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
      const contracts = params.calls.map((call) => ({
        address: smcAddress,
        abi,
        functionName: call.functionName,
        args: call.args || [],
      })) as any;
      const results = await publicClient.multicall({ contracts });
      return results;
    };

    return {
      smcAddress,
      readContract,
      writeContract,
      multicall,
    };
  }

  const poolContract = contractNames.reduce((acc, name) => {
    acc[name] = buildContractMethods(name);
    return acc;
  }, {} as PoolzContractObject);

  return { poolContract };
}
