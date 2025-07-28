import { VaultManagerAbi } from "../generated/abi/VaultManager";
import { LockDealNFTAbi } from "../generated/abi/LockDealNFT";
import { DealProviderAbi } from "../generated/abi/DealProvider";
import { LockDealProviderAbi } from "../generated/abi/LockDealProvider";
import { TimedDealProviderAbi } from "../generated/abi/TimedDealProvider";
import { SimpleBuilderAbi } from "../generated/abi/SimpleBuilder";
import { DispenserProviderAbi } from "../generated/abi/DispenserProvider";
import { MultiSenderV2Abi } from "../generated/abi/MultiSenderV2";
import { LockedDealV2Abi } from "../generated/abi/LockedDealV2";

export const chain1Contracts = {
  VaultManager: { address: "0x9ff1db30c66cd9d3311b4b22da49791610922b13", abi: VaultManagerAbi },
  LockDealNFT: { address: "0x5e0bB1fF9003ac3586f039D482d2974A6D7ED781", abi: LockDealNFTAbi },
  DealProvider: { address: "0xf8449c81E2d132e429caa1cb744E1ba7235C20DE", abi: DealProviderAbi },
  LockDealProvider: { address: "0x83d9a44395b6a4Aa3a907a445CB049C50fF5b962", abi: LockDealProviderAbi },
  TimedDealProvider: { address: "0x313a8Dd9d9399fc625Ec946b328F45020d15A699", abi: TimedDealProviderAbi },
  SimpleBuilder: { address: "0x39dDEE2Ee5dF625Ef91d509Ab40E926bbD83CD0C", abi: SimpleBuilderAbi },
  DispenserProvider: { address: "0xf5e1D15FdCbB8efC617632dCBAcBC74b96a3ccA7", abi: DispenserProviderAbi },
  MultiSenderV2: { address: "0x658bcdfe51795ba43e9fd1ae9e39ddfbb1e70c5f", abi: MultiSenderV2Abi },
  LockedDealV2: { address: "0x285B4866257eF51FfBDD239c10dE5f9493413d8f", abi: LockedDealV2Abi }
} as const;
