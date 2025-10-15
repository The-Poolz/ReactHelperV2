import { type Address, type Hex, encodeAbiParameters, parseAbiParameters } from "viem";

/**
 * Estimate gas for batch calls without EIP-7702
 */
export async function estimateBatchGasStandard(
  calls: Array<{ to: Address; data: Hex; value: bigint }>,
  publicClient: any,
  account: Address
): Promise<bigint> {
  let totalGas = 0n;
  
  for (const call of calls) {
    try {
      const gasEstimate = await publicClient.estimateGas({
        account,
        to: call.to,
        data: call.data,
        value: call.value,
      });
      totalGas += gasEstimate;
    } catch (error) {
      // Add a fallback gas estimate if individual estimation fails
      totalGas += 100000n; // 100k gas fallback
    }
  }
  
  // Add 20% buffer for batch overhead
  return (totalGas * 120n) / 100n;
}

/**
 * Create a multicall data structure for batching
 */
export function createMulticallData(
  calls: Array<{ to: Address; data: Hex; value: bigint }>
): Hex {
  const multicallTypes = parseAbiParameters("(address,bytes,uint256)[]");
  
  const callData = calls.map(call => [call.to, call.data, call.value] as const);
  
  return encodeAbiParameters(multicallTypes, [callData]);
}