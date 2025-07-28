import { VaultManagerAbi } from "../generated/abi/VaultManager";
import { LockDealNFTAbi } from "../generated/abi/LockDealNFT";
import { DealProviderAbi } from "../generated/abi/DealProvider";
import { LockDealProviderAbi } from "../generated/abi/LockDealProvider";
import { TimedDealProviderAbi } from "../generated/abi/TimedDealProvider";
import { SimpleBuilderAbi } from "../generated/abi/SimpleBuilder";
import { DispenserProviderAbi } from "../generated/abi/DispenserProvider";
import { MultiSenderV2Abi } from "../generated/abi/MultiSenderV2";
import { LockedDealV2Abi } from "../generated/abi/LockedDealV2";

export const chain43114Contracts = {
  VaultManager: { address: "0x9c8F78E0aeAB8190c9d1DF7BEd0B26c1EDcB8DE6", abi: VaultManagerAbi },
  LockDealNFT: { address: "0xA2A0bEEfda596Fdb321240dD283D8cBf65b252f1", abi: LockDealNFTAbi },
  DealProvider: { address: "0xa562824D34E555f16544B23305C6CD778B17993c", abi: DealProviderAbi },
  LockDealProvider: { address: "0xB1Ecee4191daaD9381DD38A545b31DDcDba7A9A9", abi: LockDealProviderAbi },
  TimedDealProvider: { address: "0x25ea5cf98A46dbaBefd042B6cEebc501b659be78", abi: TimedDealProviderAbi },
  SimpleBuilder: { address: "0x756CD0834C2610f583B8324934A0269E3fef6f72", abi: SimpleBuilderAbi },
  DispenserProvider: { address: "0x655a8bc3875aedb2A4bc4aeeF5F84805207cB5DC", abi: DispenserProviderAbi },
  MultiSenderV2: { address: "0x1E947Ec4F6B74c746F13604438cE1A3026f30553", abi: MultiSenderV2Abi },
  LockedDealV2: { address: "0xb16bbdf683ffd6d92290f7610bb10f22f9c71e9e", abi: LockedDealV2Abi }
} as const;
