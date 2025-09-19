import { LockDealNFTAbi } from "../generated/abi/LockDealNFT";
import { VaultManagerAbi } from "../generated/abi/VaultManager";
import { DealProviderAbi } from "../generated/abi/DealProvider";
import { LockDealProviderAbi } from "../generated/abi/LockDealProvider";
import { TimedDealProviderAbi } from "../generated/abi/TimedDealProvider";
import { SimpleBuilderAbi } from "../generated/abi/SimpleBuilder";
import { DispenserProviderAbi } from "../generated/abi/DispenserProvider";
import { MultiSenderV2Abi } from "../generated/abi/MultiSenderV2";
import { CollateralProviderAbi } from "../generated/abi/CollateralProvider";
import { RefundProviderAbi } from "../generated/abi/RefundProvider";
import { SimpleRefundBuilderAbi } from "../generated/abi/SimpleRefundBuilder";

export const chain169Contracts = {
  LockDealNFT: { address: "0xb16BBDf683fFd6D92290F7610bb10f22f9c71e9e", abi: LockDealNFTAbi, nameVersion: "LockDealNFT@1.0.4-a" },
  VaultManager: { address: "0x7Ff9315f538dF7eC76Ec4815249Dd30519726460", abi: VaultManagerAbi, nameVersion: "VaultManager@1.0.1" },
  DealProvider: { address: "0xD985eFADECBC4A11C731f3086cbad8edE5e3e341", abi: DealProviderAbi, nameVersion: "DealProvider@1.0.6" },
  LockDealProvider: { address: "0x25ea5cf98A46dbaBefd042B6cEebc501b659be78", abi: LockDealProviderAbi, nameVersion: "LockDealProvider@1.0.6" },
  TimedDealProvider: { address: "0xaEb7A13D3608C673E99685798f9ba5ACE41119d3", abi: TimedDealProviderAbi, nameVersion: "TimedDealProvider@1.0.6" },
  SimpleBuilder: { address: "0xA2A0bEEfda596Fdb321240dD283D8cBf65b252f1", abi: SimpleBuilderAbi, nameVersion: "SimpleBuilder@1.2.2" },
  DispenserProvider: { address: "0xEe25294438bc5542fEAFACC3E08Bb4658EB3C43f", abi: DispenserProviderAbi, nameVersion: "DispenserProvider@1.1.2" },
  MultiSenderV2: { address: "0x655a8bc3875aedb2A4bc4aeeF5F84805207cB5DC", abi: MultiSenderV2Abi, nameVersion: "MultiSenderV2@2.1.0" },
  CollateralProvider: { address: "0x7521fF2baca97397C8936E35dAc225f6bc1070Cf", abi: CollateralProviderAbi, nameVersion: "CollateralProvider@1.0.2" },
  RefundProvider: { address: "0x9c8F78E0aeAB8190c9d1DF7BEd0B26c1EDcB8DE6", abi: RefundProviderAbi, nameVersion: "RefundProvider@1.0.2" },
  SimpleRefundBuilder: { address: "0x65f62efEb1A43064081443791d8C10Db0A1FB511", abi: SimpleRefundBuilderAbi, nameVersion: "SimpleRefundBuilder@1.2.2" }
} as const;
