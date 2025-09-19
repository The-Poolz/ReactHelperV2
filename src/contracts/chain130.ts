import { VaultManagerAbi } from "../generated/abi/VaultManager";
import { LockDealNFTAbi } from "../generated/abi/LockDealNFT";
import { DealProviderAbi } from "../generated/abi/DealProvider";
import { LockDealProviderAbi } from "../generated/abi/LockDealProvider";
import { TimedDealProviderAbi } from "../generated/abi/TimedDealProvider";
import { DispenserProviderAbi } from "../generated/abi/DispenserProvider";
import { MultiSenderV2Abi } from "../generated/abi/MultiSenderV2";

export const chain130Contracts = {
  VaultManager: { address: "0x7Ff9315f538dF7eC76Ec4815249Dd30519726460", abi: VaultManagerAbi, nameVersion: "VaultManager@1.0.1" },
  LockDealNFT: { address: "0xb16BBDf683fFd6D92290F7610bb10f22f9c71e9e", abi: LockDealNFTAbi, nameVersion: "LockDealNFT@1.0.4-a" },
  DealProvider: { address: "0x6d77B5147CDE6Fa287c1266A33e09a09651D36d0", abi: DealProviderAbi, nameVersion: "DealProvider@1.0.6" },
  LockDealProvider: { address: "0x7521fF2baca97397C8936E35dAc225f6bc1070Cf", abi: LockDealProviderAbi, nameVersion: "LockDealProvider@1.0.6" },
  TimedDealProvider: { address: "0xA2A0bEEfda596Fdb321240dD283D8cBf65b252f1", abi: TimedDealProviderAbi, nameVersion: "TimedDealProvider@1.0.6" },
  DispenserProvider: { address: "0x960c76BeC76ebB223B3e29B35a70c40925f38d66", abi: DispenserProviderAbi, nameVersion: "DispenserProvider@1.1.2" },
  MultiSenderV2: { address: "0x756CD0834C2610f583B8324934A0269E3fef6f72", abi: MultiSenderV2Abi, nameVersion: "MultiSenderV2@2.1.0" }
} as const;
