import { LockDealNFTAbi } from "../generated/abi/LockDealNFT";
import { VaultManagerAbi } from "../generated/abi/VaultManager";
import { DealProviderAbi } from "../generated/abi/DealProvider";
import { LockDealProviderAbi } from "../generated/abi/LockDealProvider";
import { TimedDealProviderAbi } from "../generated/abi/TimedDealProvider";
import { SimpleBuilderAbi } from "../generated/abi/SimpleBuilder";
import { DispenserProviderAbi } from "../generated/abi/DispenserProvider";
import { MultiSenderV2Abi } from "../generated/abi/MultiSenderV2";
import { LockedDealV2Abi } from "../generated/abi/LockedDealV2";
import { WhiteListAbi } from "../generated/abi/WhiteList";
import { CollateralProviderAbi } from "../generated/abi/CollateralProvider";
import { RefundProviderAbi } from "../generated/abi/RefundProvider";
import { SimpleRefundBuilderAbi } from "../generated/abi/SimpleRefundBuilder";

export const chain137Contracts = {
  LockDealNFT: { address: "0x9C36786836A594e3b355bA572A5Cd6841F69d86e", abi: LockDealNFTAbi, nameVersion: "LockDealNFT@1.0.4-a" },
  VaultManager: { address: "0x06fd710fD167f1f08b61e457F41D6e7c7DD9AF3D", abi: VaultManagerAbi, nameVersion: "VaultManager@1.0.1" },
  DealProvider: { address: "0x2A42701fE4D3a57AF04B0c9d99bABfbB03Fe8657", abi: DealProviderAbi, nameVersion: "DealProvider@1.0.6" },
  LockDealProvider: { address: "0x42669ac65847E4CE67925222aCcF713707a43F6d", abi: LockDealProviderAbi, nameVersion: "LockDealProvider@1.0.6" },
  TimedDealProvider: { address: "0xf188c5B4d8CCD2a6E16a853Ba9F2dFd20ce1ed70", abi: TimedDealProviderAbi, nameVersion: "TimedDealProvider@1.0.6" },
  SimpleBuilder: { address: "0x8d82b419a15deb20c43934f5a40ecf876df37e93", abi: SimpleBuilderAbi, nameVersion: "SimpleBuilder@1.2.2" },
  DispenserProvider: { address: "0x55e7bBC157D3Ce3c9b507ec0A7948782e44BB29b", abi: DispenserProviderAbi, nameVersion: "DispenserProvider@1.1.2" },
  MultiSenderV2: { address: "0x9c8f78e0aeab8190c9d1df7bed0b26c1edcb8de6", abi: MultiSenderV2Abi, nameVersion: "MultiSenderV2@2.1.0" },
  LockedDealV2: { address: "0x9D13B213852669077131f8A24A676f27ab0C2931", abi: LockedDealV2Abi, nameVersion: "LockedDeal@2.3.3" },
  WhiteList: { address: "0xD39eA2C72B99E65F1CDa47E727b453964B45e036", abi: WhiteListAbi, nameVersion: "Whitelist@0.6.12" },
  CollateralProvider: { address: "0x969d6a2a995e0a6e2f82803840581e21ee6f3a97", abi: CollateralProviderAbi, nameVersion: "CollateralProvider@1.0.2" },
  RefundProvider: { address: "0x34fbf73bfe879b868ae2c0f205762798e29b7037", abi: RefundProviderAbi, nameVersion: "RefundProvider@1.0.2" },
  SimpleRefundBuilder: { address: "0xa20262e67e46b40bdf6e647b3eac3acb504ad04d", abi: SimpleRefundBuilderAbi, nameVersion: "SimpleRefundBuilder@1.2.2" }
} as const;
