import type { usePublicClient } from "wagmi";

export interface MulticallContract {
  address: `0x${string}`;
  abi: any;
  functionName: string;
  args?: any[];
}

export interface MulticallResult<T = any> {
  status: "success" | "failure";
  result?: T;
  error?: Error;
}

/**
 * Smart multicall helper for PublicClient (for use in hooks)
 * @param publicClient - Viem PublicClient
 * @param contracts - Array of contract calls
 * @returns Promise<MulticallResult[]>
 */
export async function safeMulticall({
  client,
  contracts,
}: {
  client: ReturnType<typeof usePublicClient>;
  contracts: any[];
}): Promise<MulticallResult[]> {
  if (!client || !contracts || contracts.length === 0) {
    return [];
  }

  try {
    const results = await client?.multicall({ contracts });

    return results.map((result: any) => {
      if ("error" in result) {
        return {
          status: "failure",
          error: result.error,
        };
      }
      return {
        status: "success",
        result: result.result,
      };
    });
  } catch (error: any) {
    const isMulticallNotSupported =
      error?.message?.includes("multicall3") ||
      error?.message?.includes("does not support");

    if (!isMulticallNotSupported) throw error;

    const results = await Promise.allSettled(
      contracts.map(async (contract) => {
        return await client?.readContract({
          address: contract.address,
          abi: contract.abi,
          functionName: contract.functionName,
          args: contract.args || [],
        });
      })
    );
    return results.map((result) => {
      if (result.status === "fulfilled") {
        return {
          status: "success" as const,
          result: result.value,
        };
      } else {
        return {
          status: "failure" as const,
          error:
            result.reason instanceof Error
              ? result.reason
              : new Error(String(result.reason)),
        };
      }
    });
  }
}
