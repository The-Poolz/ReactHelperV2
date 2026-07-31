import { VaultManagerAbi } from "../generated/abi/VaultManager";
import { LockDealNFTAbi } from "../generated/abi/LockDealNFT";
import { DealProviderAbi } from "../generated/abi/DealProvider";
import { LockDealProviderAbi } from "../generated/abi/LockDealProvider";
import { TimedDealProviderAbi } from "../generated/abi/TimedDealProvider";
import { DispenserProviderAbi } from "../generated/abi/DispenserProvider";

export const chain4663Contracts = {
  VaultManager: { address: "0x6ad87F3be276bAdF799496da092A7724C75C6499", abi: VaultManagerAbi, nameVersion: "VaultManager@1.0.1" },
  LockDealNFT: { address: "0x69A75DB56f5D67Ff3461Ba73d85c28333846c748", abi: LockDealNFTAbi, nameVersion: "LockDealNFT@1.0.4-a" },
  DealProvider: { address: "0xc6244d0293470801F98A7335605A90cD5AF8083e", abi: DealProviderAbi, nameVersion: "DealProvider@1.0.6" },
  LockDealProvider: { address: "0x694E11A943Ad756F9D71f8030c2A19d6dbae6fdd", abi: LockDealProviderAbi, nameVersion: "LockDealProvider@1.0.6" },
  TimedDealProvider: { address: "0x42f2859881F8fDbBaEDD1d5c8d3955F34d8e79f4", abi: TimedDealProviderAbi, nameVersion: "TimedDealProvider@1.0.6" },
  DispenserProvider: { address: "0xB1511c89E5A594f906d0132f9a6E68e22f4ae94E", abi: DispenserProviderAbi, nameVersion: "DispenserProvider@1.1.2" }
} as const;
