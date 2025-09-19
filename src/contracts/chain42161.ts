import { LockDealNFTAbi } from "../generated/abi/LockDealNFT";
import { VaultManagerAbi } from "../generated/abi/VaultManager";
import { DealProviderAbi } from "../generated/abi/DealProvider";
import { LockDealProviderAbi } from "../generated/abi/LockDealProvider";
import { TimedDealProviderAbi } from "../generated/abi/TimedDealProvider";
import { SimpleBuilderAbi } from "../generated/abi/SimpleBuilder";
import { DispenserProviderAbi } from "../generated/abi/DispenserProvider";
import { MultiSenderV2Abi } from "../generated/abi/MultiSenderV2";
import { LockedDealV2Abi } from "../generated/abi/LockedDealV2";
import { CollateralProviderAbi } from "../generated/abi/CollateralProvider";
import { RefundProviderAbi } from "../generated/abi/RefundProvider";
import { SimpleRefundBuilderAbi } from "../generated/abi/SimpleRefundBuilder";

export const chain42161Contracts = {
  LockDealNFT: { address: "0xee099538ed077f831cb9af44ffd51ec7fd95c7de", abi: LockDealNFTAbi, nameVersion: "LockDealNFT@1.0.4-a" },
  VaultManager: { address: "0x9cfd8c7834be0dfe41f3fe68c29124066d5cd13b", abi: VaultManagerAbi, nameVersion: "VaultManager@1.0.1" },
  DealProvider: { address: "0x9C218bBCdae2dD2B85f08b0a3a7D31a6e6E6bffd", abi: DealProviderAbi, nameVersion: "DealProvider@1.0.6" },
  LockDealProvider: { address: "0xB0841e6FD7d51D5148ABcc19EB24c7E361fDa8c0", abi: LockDealProviderAbi, nameVersion: "LockDealProvider@1.0.6" },
  TimedDealProvider: { address: "0xF0Bd7c3D038FF9F67Fc64903A3EAC82600Dd37D0", abi: TimedDealProviderAbi, nameVersion: "TimedDealProvider@1.0.6" },
  SimpleBuilder: { address: "0x8b58eeab0e457c0b6ca68dfc3861a4352d6c5cfb", abi: SimpleBuilderAbi, nameVersion: "SimpleBuilder@1.2.2" },
  DispenserProvider: { address: "0x62BD0CF6B93De01a518975B0b117c886c1F1d973", abi: DispenserProviderAbi, nameVersion: "DispenserProvider@1.1.2" },
  MultiSenderV2: { address: "0x25ea5cf98a46dbabefd042b6ceebc501b659be78", abi: MultiSenderV2Abi, nameVersion: "MultiSenderV2@2.1.0" },
  LockedDealV2: { address: "0x7Ff9315f538dF7eC76Ec4815249Dd30519726460", abi: LockedDealV2Abi, nameVersion: "LockedDeal@2.3.3" },
  CollateralProvider: { address: "0x2051f98ca620a4d3e6024f144382d3537452b557", abi: CollateralProviderAbi, nameVersion: "CollateralProvider@1.0.2" },
  RefundProvider: { address: "0xaa40d75fc2cdafc61a7c52ac207e17d694102ef2", abi: RefundProviderAbi, nameVersion: "RefundProvider@1.0.2" },
  SimpleRefundBuilder: { address: "0x120893ab6f67171d4e6b0e72c151ab96aebe44e4", abi: SimpleRefundBuilderAbi, nameVersion: "SimpleRefundBuilder@1.2.2" }
} as const;
