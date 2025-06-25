import DealProviderAbi from "../../generated/abi/DealProvider.json" assert { type: "json" };
import DispenserProviderAbi from "../../generated/abi/DispenserProvider.json" assert { type: "json" };
import LockDealNFTAbi from "../../generated/abi/LockDealNFT.json" assert { type: "json" };
import LockDealProviderAbi from "../../generated/abi/LockDealProvider.json" assert { type: "json" };
import TimedDealProviderAbi from "../../generated/abi/TimedDealProvider.json" assert { type: "json" };
import VaultManagerAbi from "../../generated/abi/VaultManager.json" assert { type: "json" };

export const chain11155111Contracts = {
  LockDealNFT: { address: "0x25E66861ADC9BBA4e539da90EbFb9c8cd0326EF2", abi: LockDealNFTAbi },
  VaultManager: { address: "0x011c8888C96fd3c1C1c43749ED581D17DE17F42C", abi: VaultManagerAbi },
  DealProvider: { address: "0x4Fc800ca9e30f540238538555B4f759DeDCE7dBa", abi: DealProviderAbi },
  LockDealProvider: { address: "0x398cc8B9d891fFEFA0E82EB0fb3845c19C887451", abi: LockDealProviderAbi },
  TimedDealProvider: { address: "0xc30405F76FCb8913d9A2719d19A2b1B7017CaE5b", abi: TimedDealProviderAbi },
  DispenserProvider: { address: "0x78012fc722660E22778af214f3bc560673f37721", abi: DispenserProviderAbi },
} as const;
