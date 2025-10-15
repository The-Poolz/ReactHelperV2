import { type Address, type Hash, type Hex, keccak256, encodeAbiParameters, parseAbiParameters } from "viem";

/**
 * Create the EIP-7702 authorization signature data
 */
export function createAuthorizationData(
  chainId: bigint,
  contractAddress: Address,
  nonce: bigint
): Hex {
  // EIP-7702 authorization data structure
  const types = parseAbiParameters("uint256,address,uint256");
  
  return encodeAbiParameters(types, [
    chainId,
    contractAddress,
    nonce
  ]);
}

/**
 * Hash the EIP-7702 authorization for signing
 */
export function hashAuthorization(
  chainId: bigint,
  contractAddress: Address,
  nonce: bigint
): Hash {
  const authData = createAuthorizationData(chainId, contractAddress, nonce);
  
  // EIP-7702 domain separator and message hash
  const domainSeparator = keccak256(
    encodeAbiParameters(
      parseAbiParameters("bytes32,uint256"),
      [keccak256("0x"), chainId]
    )
  );
  
  return keccak256(
    encodeAbiParameters(
      parseAbiParameters("bytes32,bytes32"),
      [domainSeparator, keccak256(authData)]
    )
  );
}