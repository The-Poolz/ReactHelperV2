import VaultManagerAbi from "../../generated/abi/VaultManager.json";
import LockDealNFTAbi from "../../generated/abi/LockDealNFT.json";
import DealProviderAbi from "../../generated/abi/DealProvider.json";
import LockDealProviderAbi from "../../generated/abi/LockDealProvider.json";
import TimedDealProviderAbi from "../../generated/abi/TimedDealProvider.json";
import SimpleBuilderAbi from "../../generated/abi/SimpleBuilder.json";
import DispenserProviderAbi from "../../generated/abi/DispenserProvider.json";

export const chain1Contracts = {
  VaultManager: { address: "0x9ff1db30c66cd9d3311b4b22da49791610922b13", abi: VaultManagerAbi },
  LockDealNFT: { address: "0x5e0bB1fF9003ac3586f039D482d2974A6D7ED781", abi: LockDealNFTAbi },
  DealProvider: { address: "0xf8449c81E2d132e429caa1cb744E1ba7235C20DE", abi: DealProviderAbi },
  LockDealProvider: { address: "0x83d9a44395b6a4Aa3a907a445CB049C50fF5b962", abi: LockDealProviderAbi },
  TimedDealProvider: { address: "0x313a8Dd9d9399fc625Ec946b328F45020d15A699", abi: TimedDealProviderAbi },
  SimpleBuilder: { address: "0x39dDEE2Ee5dF625Ef91d509Ab40E926bbD83CD0C", abi: SimpleBuilderAbi },
  DispenserProvider: { address: "0xf5e1D15FdCbB8efC617632dCBAcBC74b96a3ccA7", abi: DispenserProviderAbi }
} as const;
