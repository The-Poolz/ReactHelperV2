import { LockDealNFTAbi } from "../generated/abi/LockDealNFT";
import { VaultManagerAbi } from "../generated/abi/VaultManager";
import { DealProviderAbi } from "../generated/abi/DealProvider";
import { LockDealProviderAbi } from "../generated/abi/LockDealProvider";
import { TimedDealProviderAbi } from "../generated/abi/TimedDealProvider";
import { SimpleBuilderAbi } from "../generated/abi/SimpleBuilder";

export const chain3441005Contracts = {
  LockDealNFT: { address: "0x011c8888C96fd3c1C1c43749ED581D17DE17F42C", abi: LockDealNFTAbi },
  VaultManager: { address: "0xc82633b2c0DAc7e58be68B264399bd6278407688", abi: VaultManagerAbi },
  DealProvider: { address: "0x25E66861ADC9BBA4e539da90EbFb9c8cd0326EF2", abi: DealProviderAbi },
  LockDealProvider: { address: "0x06985B5B1B45F803f3054a93022C8c8824085f2e", abi: LockDealProviderAbi },
  TimedDealProvider: { address: "0x5a1a36821E86bC4a7c9cDAE8DF5C72956B846a6D", abi: TimedDealProviderAbi },
  SimpleBuilder: { address: "0x73b8893E877360526B6Fc9D67DD7e3ce675F6a32", abi: SimpleBuilderAbi }
} as const;
