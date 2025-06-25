import DealProviderAbi from "../../generated/abi/DealProvider.json" assert { type: "json" };
import DispenserProviderAbi from "../../generated/abi/DispenserProvider.json" assert { type: "json" };
import LockDealNFTAbi from "../../generated/abi/LockDealNFT.json" assert { type: "json" };
import LockDealProviderAbi from "../../generated/abi/LockDealProvider.json" assert { type: "json" };
import SimpleBuilderAbi from "../../generated/abi/SimpleBuilder.json" assert { type: "json" };
import TimedDealProviderAbi from "../../generated/abi/TimedDealProvider.json" assert { type: "json" };
import VaultManagerAbi from "../../generated/abi/VaultManager.json" assert { type: "json" };

export const chain42161Contracts = {
  LockDealNFT: { address: "0xee099538ed077f831cb9af44ffd51ec7fd95c7de", abi: LockDealNFTAbi },
  VaultManager: { address: "0x9cfd8c7834be0dfe41f3fe68c29124066d5cd13b", abi: VaultManagerAbi },
  DealProvider: { address: "0x9C218bBCdae2dD2B85f08b0a3a7D31a6e6E6bffd", abi: DealProviderAbi },
  LockDealProvider: { address: "0xB0841e6FD7d51D5148ABcc19EB24c7E361fDa8c0", abi: LockDealProviderAbi },
  TimedDealProvider: { address: "0xF0Bd7c3D038FF9F67Fc64903A3EAC82600Dd37D0", abi: TimedDealProviderAbi },
  SimpleBuilder: { address: "0x8b58eeab0e457c0b6ca68dfc3861a4352d6c5cfb", abi: SimpleBuilderAbi },
  DispenserProvider: { address: "0x62BD0CF6B93De01a518975B0b117c886c1F1d973", abi: DispenserProviderAbi },
} as const;
