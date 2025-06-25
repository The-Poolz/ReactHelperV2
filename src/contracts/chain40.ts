import DealProviderAbi from "../../generated/abi/DealProvider.json" assert { type: "json" };
import DispenserProviderAbi from "../../generated/abi/DispenserProvider.json" assert { type: "json" };
import LockDealNFTAbi from "../../generated/abi/LockDealNFT.json" assert { type: "json" };
import LockDealProviderAbi from "../../generated/abi/LockDealProvider.json" assert { type: "json" };
import SimpleBuilderAbi from "../../generated/abi/SimpleBuilder.json" assert { type: "json" };
import TimedDealProviderAbi from "../../generated/abi/TimedDealProvider.json" assert { type: "json" };
import VaultManagerAbi from "../../generated/abi/VaultManager.json" assert { type: "json" };

export const chain40Contracts = {
  LockDealNFT: { address: "0x6d77B5147CDE6Fa287c1266A33e09a09651D36d0", abi: LockDealNFTAbi },
  VaultManager: { address: "0x2Bb9cFF524C76eb2eA27bC6cDbB93447115D8dcC", abi: VaultManagerAbi },
  DealProvider: { address: "0xEE099538ED077F831cB9Af44fFD51Ec7Fd95c7DE", abi: DealProviderAbi },
  LockDealProvider: { address: "0xff1f0872f5462b30acdA92a08D2388612F7Bf7EE", abi: LockDealProviderAbi },
  TimedDealProvider: { address: "0x2051f98ca620a4d3E6024f144382d3537452B557", abi: TimedDealProviderAbi },
  SimpleBuilder: { address: "0x960c76BeC76ebB223B3e29B35a70c40925f38d66", abi: SimpleBuilderAbi },
  DispenserProvider: { address: "0xaA40d75Fc2CdAFC61A7c52Ac207e17d694102ef2", abi: DispenserProviderAbi },
} as const;
