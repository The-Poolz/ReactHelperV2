import { LockDealNFTAbi } from "../generated/abi/LockDealNFT";
import { VaultManagerAbi } from "../generated/abi/VaultManager";
import { DealProviderAbi } from "../generated/abi/DealProvider";
import { LockDealProviderAbi } from "../generated/abi/LockDealProvider";
import { TimedDealProviderAbi } from "../generated/abi/TimedDealProvider";
import { DispenserProviderAbi } from "../generated/abi/DispenserProvider";
import { DaoStationAbi } from "../generated/abi/DaoStation";
import { StakingManagerAbi } from "../generated/abi/StakingManager";

export const chain11155111Contracts = {
  LockDealNFT: { address: "0x25E66861ADC9BBA4e539da90EbFb9c8cd0326EF2", abi: LockDealNFTAbi },
  VaultManager: { address: "0x011c8888C96fd3c1C1c43749ED581D17DE17F42C", abi: VaultManagerAbi },
  DealProvider: { address: "0x4Fc800ca9e30f540238538555B4f759DeDCE7dBa", abi: DealProviderAbi },
  LockDealProvider: { address: "0x398cc8B9d891fFEFA0E82EB0fb3845c19C887451", abi: LockDealProviderAbi },
  TimedDealProvider: { address: "0xc30405F76FCb8913d9A2719d19A2b1B7017CaE5b", abi: TimedDealProviderAbi },
  DispenserProvider: { address: "0x78012fc722660E22778af214f3bc560673f37721", abi: DispenserProviderAbi },
  DaoStation: { address: "0x6a2B94EC32BE1Acce6dADdabE1c8b7DcA333B6a6", abi: DaoStationAbi },
  StakingManager: { address: "0x153AA7818cBF29B52C1fbe90def08C779BB31B4E", abi: StakingManagerAbi }
} as const;
