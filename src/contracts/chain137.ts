import { LockDealNFTAbi } from "../../generated/abi/LockDealNFT";
import { VaultManagerAbi } from "../../generated/abi/VaultManager";
import { DealProviderAbi } from "../../generated/abi/DealProvider";
import { LockDealProviderAbi } from "../../generated/abi/LockDealProvider";
import { TimedDealProviderAbi } from "../../generated/abi/TimedDealProvider";
import { SimpleBuilderAbi } from "../../generated/abi/SimpleBuilder";
import { DispenserProviderAbi } from "../../generated/abi/DispenserProvider";
import { MultiSenderV2Abi } from "../../generated/abi/MultiSenderV2";

export const chain137Contracts = {
  LockDealNFT: { address: "0x9C36786836A594e3b355bA572A5Cd6841F69d86e", abi: LockDealNFTAbi },
  VaultManager: { address: "0x06fd710fD167f1f08b61e457F41D6e7c7DD9AF3D", abi: VaultManagerAbi },
  DealProvider: { address: "0x2A42701fE4D3a57AF04B0c9d99bABfbB03Fe8657", abi: DealProviderAbi },
  LockDealProvider: { address: "0x42669ac65847E4CE67925222aCcF713707a43F6d", abi: LockDealProviderAbi },
  TimedDealProvider: { address: "0xf188c5B4d8CCD2a6E16a853Ba9F2dFd20ce1ed70", abi: TimedDealProviderAbi },
  SimpleBuilder: { address: "0x8d82b419a15deb20c43934f5a40ecf876df37e93", abi: SimpleBuilderAbi },
  DispenserProvider: { address: "0x55e7bBC157D3Ce3c9b507ec0A7948782e44BB29b", abi: DispenserProviderAbi },
  MultiSenderV2: { address: "0x9c8f78e0aeab8190c9d1df7bed0b26c1edcb8de6", abi: MultiSenderV2Abi }
} as const;
