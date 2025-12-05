import { useMemo } from "react";
import { usePublicClient } from "wagmi";
import { createPublicClient, http } from "viem";
import type { Address, Abi, PublicClient, Chain } from "viem";
import { getPoolzContractInfo } from "../utils/getPoolzContractInfo";
import type {
	ContractName,
	ContractReadFunctionName,
} from "../contracts/contractTypes";
import type {
	ContractReadSchemas,
	ContractReturnTypes,
} from "../contracts/contractTypes";
import { config } from "../wagmi";

export interface ReadOnChainOptions<
	T extends ContractName,
	F extends ContractReadFunctionName<T>,
> {
	chainId: number;
	contractName: T;
	functionName: F;
	args?: ContractReadSchemas[T][F];
}

export interface MulticallOnChainOptions<T extends ContractName> {
	chainId: number;
	contractName: T;
	calls: Array<{
		functionName: ContractReadFunctionName<T>;
		args?: any[];
	}>;
}

export type MulticallOnChainResult<T = any> =
	| { result: T; status: "success" }
	| { error: Error; status: "failure" };

const clientCache = new Map<number, PublicClient>();

const getPublicClient = (chainId: number): PublicClient => {
	if (clientCache.has(chainId)) {
		return clientCache.get(chainId)!;
	}

	const chain = config.chains.find((c: Chain) => c.id === chainId);
	if (!chain) {
		throw new Error(`Unsupported chain ID: ${chainId}`);
	}

	const client = createPublicClient({
		chain,
		transport: http(),
	}) as PublicClient;

	clientCache.set(chainId, client);
	return client;
};

export const useContractReadOnChain = () => {
	const currentPublicClient = usePublicClient();

	const read = useMemo(
		() =>
			async <T extends ContractName, F extends ContractReadFunctionName<T>>(
				options: ReadOnChainOptions<T, F>,
			): Promise<
				F extends keyof ContractReturnTypes[T] ? ContractReturnTypes[T][F] : any
			> => {
				const { chainId, contractName, functionName, args } = options;

				const { smcAddress, abi } = getPoolzContractInfo({
					chainId,
					contractName,
				});

				if (!smcAddress || !abi) {
					throw new Error(
						`Contract ${contractName} not found on chain ${chainId}`,
					);
				}

				const publicClient = getPublicClient(chainId);

				try {
					const result = await publicClient.readContract({
						address: smcAddress as Address,
						abi: abi as Abi,
						functionName: functionName as string,
						args: args as any[],
					});

					return result as any;
				} catch (error) {
					throw new Error(
						`Failed to read ${functionName as string} from ${contractName} on chain ${chainId}: ${
							error instanceof Error ? error.message : "Unknown error"
						}`,
					);
				}
			},
		[],
	);

	const multicall = useMemo(
		() =>
			async <T extends ContractName>(
				options: MulticallOnChainOptions<T>,
			): Promise<MulticallOnChainResult[]> => {
				const { chainId, contractName, calls } = options;

				const { smcAddress, abi } = getPoolzContractInfo({
					chainId,
					contractName,
				});

				if (!smcAddress || !abi) {
					throw new Error(
						`Contract ${contractName} not found on chain ${chainId}`,
					);
				}

				const publicClient = getPublicClient(chainId);

				try {
					const contracts = calls.map((call) => ({
						address: smcAddress as Address,
						abi: abi as Abi,
						functionName: call.functionName as string,
						args: call.args,
					}));

					const results = await publicClient.multicall({
						contracts,
						allowFailure: true,
					});

					return results.map((result) => {
						if (result.status === "success") {
							return {
								result: result.result,
								status: "success" as const,
							};
						}
						return {
							error: new Error(result.error?.message || "Multicall failed"),
							status: "failure" as const,
						};
					});
				} catch (error) {
					throw new Error(
						`Multicall failed on chain ${chainId}: ${
							error instanceof Error ? error.message : "Unknown error"
						}`,
					);
				}
			},
		[],
	);

	const readWithFallback = useMemo(
		() =>
			async <T extends ContractName, F extends ContractReadFunctionName<T>>(
				options: ReadOnChainOptions<T, F>,
			): Promise<
				F extends keyof ContractReturnTypes[T] ? ContractReturnTypes[T][F] : any
			> => {
				try {
					return await read(options);
				} catch (error) {
					if (currentPublicClient) {
						console.warn(
							`Failed to read from chain ${options.chainId}, falling back to connected chain`,
							error,
						);

						const { smcAddress, abi } = getPoolzContractInfo({
							contractName: options.contractName,
						});

						if (smcAddress && abi) {
							const result = await currentPublicClient.readContract({
								address: smcAddress as Address,
								abi: abi as Abi,
								functionName: options.functionName as string,
								args: options.args as any[],
							});
							return result as any;
						}
					}
					throw error;
				}
			},
		[currentPublicClient, read],
	);

	return useMemo(
		() => ({
			read,
			multicall,
			readWithFallback,
		}),
		[read, multicall, readWithFallback],
	);
};
