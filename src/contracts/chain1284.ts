import { VaultManagerAbi } from "../generated/abi/VaultManager";
import { LockDealNFTAbi } from "../generated/abi/LockDealNFT";
import { DealProviderAbi } from "../generated/abi/DealProvider";
import { LockDealProviderAbi } from "../generated/abi/LockDealProvider";
import { TimedDealProviderAbi } from "../generated/abi/TimedDealProvider";
import { SimpleBuilderAbi } from "../generated/abi/SimpleBuilder";
import { DispenserProviderAbi } from "../generated/abi/DispenserProvider";
import { Multicall3Abi } from "../generated/abi/Multicall3";

export const chain1284Contracts = {
  VaultManager: { address: "0x2Bb9cFF524C76eb2eA27bC6cDbB93447115D8dcC", abi: VaultManagerAbi, nameVersion: "VaultManager@1.0.1" },
  LockDealNFT: { address: "0x6d77B5147CDE6Fa287c1266A33e09a09651D36d0", abi: LockDealNFTAbi, nameVersion: "LockDealNFT@1.0.4-a" },
  DealProvider: { address: "0xfB98B82D02C5E5241193Cab39956654A555F9A15", abi: DealProviderAbi, nameVersion: "DealProvider@1.0.6" },
  LockDealProvider: { address: "0x1E947Ec4F6B74c746F13604438cE1A3026f30553", abi: LockDealProviderAbi, nameVersion: "LockDealProvider@1.0.6" },
  TimedDealProvider: { address: "0x57cbaC84d9345eDd42a0CA31e50bda301268cD7d", abi: TimedDealProviderAbi, nameVersion: "TimedDealProvider@1.0.6" },
  SimpleBuilder: { address: "0xA2A0bEEfda596Fdb321240dD283D8cBf65b252f1", abi: SimpleBuilderAbi, nameVersion: "SimpleBuilder@1.2.2" },
  DispenserProvider: { address: "0xa562824D34E555f16544B23305C6CD778B17993c", abi: DispenserProviderAbi, nameVersion: "DispenserProvider@1.1.2" },
  Multicall3: { address: "0xcA11bde05977b3631167028862bE2a173976CA11", abi: Multicall3Abi, nameVersion: "Multicall3@1.0.0" }
} as const;
