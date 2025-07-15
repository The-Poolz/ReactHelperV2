import LockDealNFTAbi from "../../generated/abi/LockDealNFT.json";
import VaultManagerAbi from "../../generated/abi/VaultManager.json";
import DealProviderAbi from "../../generated/abi/DealProvider.json";
import LockDealProviderAbi from "../../generated/abi/LockDealProvider.json";
import TimedDealProviderAbi from "../../generated/abi/TimedDealProvider.json";
import SimpleBuilderAbi from "../../generated/abi/SimpleBuilder.json";
import DispenserProviderAbi from "../../generated/abi/DispenserProvider.json";

export const chain8453Contracts = {
  LockDealNFT: { address: "0xb16BBDf683fFd6D92290F7610bb10f22f9c71e9e", abi: LockDealNFTAbi },
  VaultManager: { address: "0x7ff9315f538df7ec76ec4815249dd30519726460", abi: VaultManagerAbi },
  DealProvider: { address: "0x9ba7036aa978509714D137bA7f98e8f66872c19F", abi: DealProviderAbi },
  LockDealProvider: { address: "0xbB407809BadB136E1db0ddb53478D5a830D83805", abi: LockDealProviderAbi },
  TimedDealProvider: { address: "0x83FF82f14920025576Cd04046335c4b748759121", abi: TimedDealProviderAbi },
  SimpleBuilder: { address: "0xA2A0bEEfda596Fdb321240dD283D8cBf65b252f1", abi: SimpleBuilderAbi },
  DispenserProvider: { address: "0x6145F338eCf142813a9Cfcf02A9f95cFC300cfb7", abi: DispenserProviderAbi }
} as const;
