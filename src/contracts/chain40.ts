import { LockDealNFTAbi } from "../generated/abi/LockDealNFT";
import { VaultManagerAbi } from "../generated/abi/VaultManager";
import { DealProviderAbi } from "../generated/abi/DealProvider";
import { LockDealProviderAbi } from "../generated/abi/LockDealProvider";
import { TimedDealProviderAbi } from "../generated/abi/TimedDealProvider";
import { SimpleBuilderAbi } from "../generated/abi/SimpleBuilder";
import { DispenserProviderAbi } from "../generated/abi/DispenserProvider";
import { MultiSenderV2Abi } from "../generated/abi/MultiSenderV2";
import { WhiteListAbi } from "../generated/abi/WhiteList";
import { CollateralProviderAbi } from "../generated/abi/CollateralProvider";
import { RefundProviderAbi } from "../generated/abi/RefundProvider";
import { SimpleRefundBuilderAbi } from "../generated/abi/SimpleRefundBuilder";
import { Multicall3Abi } from "../generated/abi/Multicall3";

export const chain40Contracts = {
  LockDealNFT: { address: "0x6d77B5147CDE6Fa287c1266A33e09a09651D36d0", abi: LockDealNFTAbi, nameVersion: "LockDealNFT@1.0.4-a" },
  VaultManager: { address: "0x2Bb9cFF524C76eb2eA27bC6cDbB93447115D8dcC", abi: VaultManagerAbi, nameVersion: "VaultManager@1.0.1" },
  DealProvider: { address: "0xEE099538ED077F831cB9Af44fFD51Ec7Fd95c7DE", abi: DealProviderAbi, nameVersion: "DealProvider@1.0.6" },
  LockDealProvider: { address: "0xff1f0872f5462b30acdA92a08D2388612F7Bf7EE", abi: LockDealProviderAbi, nameVersion: "LockDealProvider@1.0.6" },
  TimedDealProvider: { address: "0x2051f98ca620a4d3E6024f144382d3537452B557", abi: TimedDealProviderAbi, nameVersion: "TimedDealProvider@1.0.6" },
  SimpleBuilder: { address: "0x960c76BeC76ebB223B3e29B35a70c40925f38d66", abi: SimpleBuilderAbi, nameVersion: "SimpleBuilder@1.2.2" },
  DispenserProvider: { address: "0xaA40d75Fc2CdAFC61A7c52Ac207e17d694102ef2", abi: DispenserProviderAbi, nameVersion: "DispenserProvider@1.1.2" },
  MultiSenderV2: { address: "0x9cfd8c7834Be0DfE41F3FE68C29124066D5Cd13b", abi: MultiSenderV2Abi, nameVersion: "MultiSenderV2@2.1.0" },
  WhiteList: { address: "0xb16BBDf683fFd6D92290F7610bb10f22f9c71e9e", abi: WhiteListAbi, nameVersion: "Whitelist@0.6.12" },
  CollateralProvider: { address: "0xA2A0bEEfda596Fdb321240dD283D8cBf65b252f1", abi: CollateralProviderAbi, nameVersion: "CollateralProvider@1.0.2" },
  RefundProvider: { address: "0x65f62efEb1A43064081443791d8C10Db0A1FB511", abi: RefundProviderAbi, nameVersion: "RefundProvider@1.0.2" },
  SimpleRefundBuilder: { address: "0x2dd5B5E374B2d32152507100a42CA15f7707F504", abi: SimpleRefundBuilderAbi, nameVersion: "SimpleRefundBuilder@1.2.2" },
  Multicall3: { address: "0xcA11bde05977b3631167028862bE2a173976CA11", abi: Multicall3Abi, nameVersion: "Multicall3@1.0.0" }
} as const;
