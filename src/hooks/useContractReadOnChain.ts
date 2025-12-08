import { useMemo } from "react";
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

	return { read };
};
