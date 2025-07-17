import { LockDealNFTAbi } from "../generated/abi/LockDealNFT";
import { VaultManagerAbi } from "../generated/abi/VaultManager";
import { DealProviderAbi } from "../generated/abi/DealProvider";
import { LockDealProviderAbi } from "../generated/abi/LockDealProvider";
import { TimedDealProviderAbi } from "../generated/abi/TimedDealProvider";
import { SimpleBuilderAbi } from "../generated/abi/SimpleBuilder";
import { DispenserProviderAbi } from "../generated/abi/DispenserProvider";
import { MultiSenderV2Abi } from "../generated/abi/MultiSenderV2";

export const chain42161Contracts = {
  LockDealNFT: { address: "0xee099538ed077f831cb9af44ffd51ec7fd95c7de", abi: LockDealNFTAbi },
  VaultManager: { address: "0x9cfd8c7834be0dfe41f3fe68c29124066d5cd13b", abi: VaultManagerAbi },
  DealProvider: { address: "0x9C218bBCdae2dD2B85f08b0a3a7D31a6e6E6bffd", abi: DealProviderAbi },
  LockDealProvider: { address: "0xB0841e6FD7d51D5148ABcc19EB24c7E361fDa8c0", abi: LockDealProviderAbi },
  TimedDealProvider: { address: "0xF0Bd7c3D038FF9F67Fc64903A3EAC82600Dd37D0", abi: TimedDealProviderAbi },
  SimpleBuilder: { address: "0x8b58eeab0e457c0b6ca68dfc3861a4352d6c5cfb", abi: SimpleBuilderAbi },
  DispenserProvider: { address: "0x62BD0CF6B93De01a518975B0b117c886c1F1d973", abi: DispenserProviderAbi },
  MultiSenderV2: { address: "0x25ea5cf98a46dbabefd042b6ceebc501b659be78", abi: MultiSenderV2Abi }
} as const;
