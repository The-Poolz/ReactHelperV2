import DealProviderAbi from "../../generated/abi/DealProvider.json" assert { type: "json" };
import DispenserProviderAbi from "../../generated/abi/DispenserProvider.json" assert { type: "json" };
import LockDealNFTAbi from "../../generated/abi/LockDealNFT.json" assert { type: "json" };
import LockDealProviderAbi from "../../generated/abi/LockDealProvider.json" assert { type: "json" };
import SimpleBuilderAbi from "../../generated/abi/SimpleBuilder.json" assert { type: "json" };
import TimedDealProviderAbi from "../../generated/abi/TimedDealProvider.json" assert { type: "json" };
import VaultManagerAbi from "../../generated/abi/VaultManager.json" assert { type: "json" };

export const chain1284Contracts = {
  VaultManager: { address: "0x2Bb9cFF524C76eb2eA27bC6cDbB93447115D8dcC", abi: VaultManagerAbi },
  LockDealNFT: { address: "0x6d77B5147CDE6Fa287c1266A33e09a09651D36d0", abi: LockDealNFTAbi },
  DealProvider: { address: "0xfB98B82D02C5E5241193Cab39956654A555F9A15", abi: DealProviderAbi },
  LockDealProvider: { address: "0x1E947Ec4F6B74c746F13604438cE1A3026f30553", abi: LockDealProviderAbi },
  TimedDealProvider: { address: "0x57cbaC84d9345eDd42a0CA31e50bda301268cD7d", abi: TimedDealProviderAbi },
  SimpleBuilder: { address: "0xA2A0bEEfda596Fdb321240dD283D8cBf65b252f1", abi: SimpleBuilderAbi },
  DispenserProvider: { address: "0xa562824D34E555f16544B23305C6CD778B17993c", abi: DispenserProviderAbi },
} as const;
