import VaultManagerAbi from "../../generated/abi/VaultManager.json";
import LockDealNFTAbi from "../../generated/abi/LockDealNFT.json";
import DealProviderAbi from "../../generated/abi/DealProvider.json";
import LockDealProviderAbi from "../../generated/abi/LockDealProvider.json";
import TimedDealProviderAbi from "../../generated/abi/TimedDealProvider.json";
import SimpleBuilderAbi from "../../generated/abi/SimpleBuilder.json";
import DispenserProviderAbi from "../../generated/abi/DispenserProvider.json";

export const chain1284Contracts = {
  VaultManager: { address: "0x2Bb9cFF524C76eb2eA27bC6cDbB93447115D8dcC", abi: VaultManagerAbi },
  LockDealNFT: { address: "0x6d77B5147CDE6Fa287c1266A33e09a09651D36d0", abi: LockDealNFTAbi },
  DealProvider: { address: "0xfB98B82D02C5E5241193Cab39956654A555F9A15", abi: DealProviderAbi },
  LockDealProvider: { address: "0x1E947Ec4F6B74c746F13604438cE1A3026f30553", abi: LockDealProviderAbi },
  TimedDealProvider: { address: "0x57cbaC84d9345eDd42a0CA31e50bda301268cD7d", abi: TimedDealProviderAbi },
  SimpleBuilder: { address: "0xA2A0bEEfda596Fdb321240dD283D8cBf65b252f1", abi: SimpleBuilderAbi },
  DispenserProvider: { address: "0xa562824D34E555f16544B23305C6CD778B17993c", abi: DispenserProviderAbi }
} as const;
