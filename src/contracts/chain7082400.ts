import DealProviderAbi from "../../generated/abi/DealProvider.json" assert { type: "json" };
import DispenserProviderAbi from "../../generated/abi/DispenserProvider.json" assert { type: "json" };
import LockDealNFTAbi from "../../generated/abi/LockDealNFT.json" assert { type: "json" };
import LockDealProviderAbi from "../../generated/abi/LockDealProvider.json" assert { type: "json" };
import TimedDealProviderAbi from "../../generated/abi/TimedDealProvider.json" assert { type: "json" };
import VaultManagerAbi from "../../generated/abi/VaultManager.json" assert { type: "json" };

export const chain7082400Contracts = {
  VaultManager: { address: "0x3A3717a198f0b69155D666D61984e3BBeD084C48", abi: VaultManagerAbi },
  LockDealNFT: { address: "0x398cc8B9d891fFEFA0E82EB0fb3845c19C887451", abi: LockDealNFTAbi },
  DealProvider: { address: "0x8169b222ECeb16beF40cF94Ba0d50678d706F6D0", abi: DealProviderAbi },
  LockDealProvider: { address: "0x66a550610d38Fd4964635b6bf6828f4CF75Ab42A", abi: LockDealProviderAbi },
  TimedDealProvider: { address: "0x29552d4fa4e2ecF802a2dcf6fA5513386a4BCCBb", abi: TimedDealProviderAbi },
  DispenserProvider: { address: "0x0D8c24f2D33864D82ddBCb64D15D8EDA635db0d0", abi: DispenserProviderAbi },
} as const;
