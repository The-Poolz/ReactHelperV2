import { LockDealNFTAbi } from "../generated/abi/LockDealNFT";
import { VaultManagerAbi } from "../generated/abi/VaultManager";
import { DealProviderAbi } from "../generated/abi/DealProvider";
import { LockDealProviderAbi } from "../generated/abi/LockDealProvider";
import { TimedDealProviderAbi } from "../generated/abi/TimedDealProvider";
import { SimpleBuilderAbi } from "../generated/abi/SimpleBuilder";
import { DispenserProviderAbi } from "../generated/abi/DispenserProvider";
import { MultiSenderV2Abi } from "../generated/abi/MultiSenderV2";
import { StakingManagerAbi } from "../generated/abi/StakingManager";
import { CollateralProviderAbi } from "../generated/abi/CollateralProvider";
import { RefundProviderAbi } from "../generated/abi/RefundProvider";
import { SimpleRefundBuilderAbi } from "../generated/abi/SimpleRefundBuilder";

export const chain8453Contracts = {
  LockDealNFT: { address: "0xb16BBDf683fFd6D92290F7610bb10f22f9c71e9e", abi: LockDealNFTAbi, nameVersion: "LockDealNFT@1.0.4-a" },
  VaultManager: { address: "0x7ff9315f538df7ec76ec4815249dd30519726460", abi: VaultManagerAbi, nameVersion: "VaultManager@1.0.1" },
  DealProvider: { address: "0x9ba7036aa978509714D137bA7f98e8f66872c19F", abi: DealProviderAbi, nameVersion: "DealProvider@1.0.6" },
  LockDealProvider: { address: "0xbB407809BadB136E1db0ddb53478D5a830D83805", abi: LockDealProviderAbi, nameVersion: "LockDealProvider@1.0.6" },
  TimedDealProvider: { address: "0x83FF82f14920025576Cd04046335c4b748759121", abi: TimedDealProviderAbi, nameVersion: "TimedDealProvider@1.0.6" },
  SimpleBuilder: { address: "0xA2A0bEEfda596Fdb321240dD283D8cBf65b252f1", abi: SimpleBuilderAbi, nameVersion: "SimpleBuilder@1.2.2" },
  DispenserProvider: { address: "0x6145F338eCf142813a9Cfcf02A9f95cFC300cfb7", abi: DispenserProviderAbi, nameVersion: "DispenserProvider@1.1.2" },
  MultiSenderV2: { address: "0x120893ab6f67171d4e6b0e72c151ab96aebe44e4", abi: MultiSenderV2Abi, nameVersion: "MultiSenderV2@2.1.0" },
  StakingManager: { address: "0xCc8f6A82Ff034C15dFDAcBcab29F7Ea28C616EF7", abi: StakingManagerAbi, nameVersion: "StakingManager@1.2.0" },
  CollateralProvider: { address: "0x7521fF2baca97397C8936E35dAc225f6bc1070Cf", abi: CollateralProviderAbi, nameVersion: "CollateralProvider@1.0.2" },
  RefundProvider: { address: "0x9c8F78E0aeAB8190c9d1DF7BEd0B26c1EDcB8DE6", abi: RefundProviderAbi, nameVersion: "RefundProvider@1.0.2" },
  SimpleRefundBuilder: { address: "0x65f62efEb1A43064081443791d8C10Db0A1FB511", abi: SimpleRefundBuilderAbi, nameVersion: "SimpleRefundBuilder@1.2.2" }
} as const;
