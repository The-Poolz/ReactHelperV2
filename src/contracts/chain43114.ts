import DealProviderAbi from "../../generated/abi/DealProvider.json" assert { type: "json" };
import DispenserProviderAbi from "../../generated/abi/DispenserProvider.json" assert { type: "json" };
import LockDealNFTAbi from "../../generated/abi/LockDealNFT.json" assert { type: "json" };
import LockDealProviderAbi from "../../generated/abi/LockDealProvider.json" assert { type: "json" };
import SimpleBuilderAbi from "../../generated/abi/SimpleBuilder.json" assert { type: "json" };
import TimedDealProviderAbi from "../../generated/abi/TimedDealProvider.json" assert { type: "json" };
import VaultManagerAbi from "../../generated/abi/VaultManager.json" assert { type: "json" };

export const chain43114Contracts = {
  VaultManager: { address: "0x9c8F78E0aeAB8190c9d1DF7BEd0B26c1EDcB8DE6", abi: VaultManagerAbi },
  LockDealNFT: { address: "0xA2A0bEEfda596Fdb321240dD283D8cBf65b252f1", abi: LockDealNFTAbi },
  DealProvider: { address: "0xa562824D34E555f16544B23305C6CD778B17993c", abi: DealProviderAbi },
  LockDealProvider: { address: "0xB1Ecee4191daaD9381DD38A545b31DDcDba7A9A9", abi: LockDealProviderAbi },
  TimedDealProvider: { address: "0x25ea5cf98A46dbaBefd042B6cEebc501b659be78", abi: TimedDealProviderAbi },
  SimpleBuilder: { address: "0x756CD0834C2610f583B8324934A0269E3fef6f72", abi: SimpleBuilderAbi },
  DispenserProvider: { address: "0x655a8bc3875aedb2A4bc4aeeF5F84805207cB5DC", abi: DispenserProviderAbi },
} as const;
