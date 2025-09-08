import { config } from "../wagmi";
import { useCallback, useMemo, useState } from "react";
import { useAccount, useChainId, usePublicClient } from "wagmi";
import { namehash as ensNamehash, zeroAddress } from "viem";
import { getEnsName } from "wagmi/actions";

const SID_CONTRACTS: Record<number, string> = {
  56: "0x08CEd32a7f3eeC915Ba84415e9C07a7286977956",
  97: "0xfFB52185b56603e0fd71De9de4F6f902f05EEA23",
  42161: "0x4a067EE58e73ac5E4a43722E008DFdf65B2bF348",
  421613: "0x1f70fc8de5669eaa8C9ce72257c94500DC5ff2E4",
};

const reverseAbi = [
  {
    inputs: [{ internalType: "bytes32", name: "node", type: "bytes32" }],
    name: "resolver",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
];

const resolverAbi = [
  {
    constant: true,
    inputs: [{ name: "node", type: "bytes32" }],
    name: "name",
    outputs: [{ name: "ret", type: "string" }],
    payable: false,
    type: "function",
  },
];

export const useSidNameForAddress = () => {
  const { address } = useAccount();
  const chainId = useChainId();
  const publicClient = usePublicClient();
  const [result, setResult] = useState<string | null>(null);

  const namehash = useCallback((domain: string) => {
    return ensNamehash(domain);
  }, []);

  const lookup = useCallback(
    async (addr?: string) => {
      const userAddress = addr || address;
      if (!userAddress || !publicClient) return setResult(null);

      if ((chainId === 1 || chainId === 11155111)) {
        const ensName = await getEnsName(config,{
          address: userAddress as `0x${string}`,
        })
        setResult(ensName);
        return;
      }

      let sidAddress = config.chains.find((c: any) => c.id === chainId)?.sidRegistry;
      if (!sidAddress) sidAddress = SID_CONTRACTS[chainId];
      if (!sidAddress) return setResult(null);
      const reverseNode = namehash(`${userAddress.slice(2)}.addr.reverse`);
      try {
        const resolverAddress = await publicClient.readContract({
          address: sidAddress as `0x${string}`,
          abi: reverseAbi,
          functionName: "resolver",
          args: [reverseNode],
        });
        if (!resolverAddress || resolverAddress === zeroAddress) {
          setResult(null);
          return;
        }
        const name = await publicClient.readContract({
          address: resolverAddress as `0x${string}`,
          abi: resolverAbi,
          functionName: "name",
          args: [reverseNode],
        });
        setResult(String(name));
      } catch (err) {
        setResult(null);
      }
    },
    [address, chainId, publicClient, namehash]
  );

  return useMemo(() => [lookup, { data: result }] as const, [lookup, result]);
};
