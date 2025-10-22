import { VaultManagerAbi } from "../generated/abi/VaultManager";
import { LockDealNFTAbi } from "../generated/abi/LockDealNFT";
import { DealProviderAbi } from "../generated/abi/DealProvider";
import { LockDealProviderAbi } from "../generated/abi/LockDealProvider";
import { TimedDealProviderAbi } from "../generated/abi/TimedDealProvider";
import { SimpleBuilderAbi } from "../generated/abi/SimpleBuilder";
import { DispenserProviderAbi } from "../generated/abi/DispenserProvider";
import { MultiSenderV2Abi } from "../generated/abi/MultiSenderV2";
import { LockedDealV2Abi } from "../generated/abi/LockedDealV2";
import { CollateralProviderAbi } from "../generated/abi/CollateralProvider";
import { RefundProviderAbi } from "../generated/abi/RefundProvider";
import { SimpleRefundBuilderAbi } from "../generated/abi/SimpleRefundBuilder";
import { Multicall3Abi } from "../generated/abi/Multicall3";

export const chain43114Contracts = {
  VaultManager: { address: "0x9c8F78E0aeAB8190c9d1DF7BEd0B26c1EDcB8DE6", abi: VaultManagerAbi, nameVersion: "VaultManager@1.0.1" },
  LockDealNFT: { address: "0xA2A0bEEfda596Fdb321240dD283D8cBf65b252f1", abi: LockDealNFTAbi, nameVersion: "LockDealNFT@1.0.4-a" },
  DealProvider: { address: "0xa562824D34E555f16544B23305C6CD778B17993c", abi: DealProviderAbi, nameVersion: "DealProvider@1.0.6" },
  LockDealProvider: { address: "0xB1Ecee4191daaD9381DD38A545b31DDcDba7A9A9", abi: LockDealProviderAbi, nameVersion: "LockDealProvider@1.0.6" },
  TimedDealProvider: { address: "0x25ea5cf98A46dbaBefd042B6cEebc501b659be78", abi: TimedDealProviderAbi, nameVersion: "TimedDealProvider@1.0.6" },
  SimpleBuilder: { address: "0x756CD0834C2610f583B8324934A0269E3fef6f72", abi: SimpleBuilderAbi, nameVersion: "SimpleBuilder@1.2.2" },
  DispenserProvider: { address: "0x655a8bc3875aedb2A4bc4aeeF5F84805207cB5DC", abi: DispenserProviderAbi, nameVersion: "DispenserProvider@1.1.2" },
  MultiSenderV2: { address: "0x1E947Ec4F6B74c746F13604438cE1A3026f30553", abi: MultiSenderV2Abi, nameVersion: "MultiSenderV2@2.1.0" },
  LockedDealV2: { address: "0xb16bbdf683ffd6d92290f7610bb10f22f9c71e9e", abi: LockedDealV2Abi, nameVersion: "LockedDeal@2.3.3" },
  CollateralProvider: { address: "0x9cfd8c7834Be0DfE41F3FE68C29124066D5Cd13b", abi: CollateralProviderAbi, nameVersion: "CollateralProvider@1.0.2" },
  RefundProvider: { address: "0xEE099538ED077F831cB9Af44fFD51Ec7Fd95c7DE", abi: RefundProviderAbi, nameVersion: "RefundProvider@1.0.2" },
  SimpleRefundBuilder: { address: "0xff1f0872f5462b30acdA92a08D2388612F7Bf7EE", abi: SimpleRefundBuilderAbi, nameVersion: "SimpleRefundBuilder@1.2.2" },
  Multicall3: { address: "0xcA11bde05977b3631167028862bE2a173976CA11", abi: Multicall3Abi, nameVersion: "Multicall3@1.0.0" }
} as const;
