import { SimpleBuilderAbi } from "../../generated/abi/SimpleBuilder";
import { DealProviderAbi } from "../../generated/abi/DealProvider";
import { LockDealProviderAbi } from "../../generated/abi/LockDealProvider";
import { TimedDealProviderAbi } from "../../generated/abi/TimedDealProvider";
import { DispenserProviderAbi } from "../../generated/abi/DispenserProvider";
import { VaultManagerAbi } from "../../generated/abi/VaultManager";
import { LockDealNFTAbi } from "../../generated/abi/LockDealNFT";

export const chain97Contracts = {
  SimpleBuilder: { address: "0xaE297EeC7A7782e81CC23E6A3B6C06621B12dF26", abi: SimpleBuilderAbi },
  DealProvider: { address: "0x99ad58d94ab699F6d02790E182a0A4c28D4739B5", abi: DealProviderAbi },
  LockDealProvider: { address: "0x7e3e0C930b4Ae650D239964094b703deE75d33DD", abi: LockDealProviderAbi },
  TimedDealProvider: { address: "0xBE7C13C7F320979B44B01207Aa72Fe505fD87696", abi: TimedDealProviderAbi },
  DispenserProvider: { address: "0xa9c68640C1AA52E91A75F4c5e2786F68049541Ad", abi: DispenserProviderAbi },
  VaultManager: { address: "0xF0A8AAc3deB7596527A61697D0a9728E3A67D3B7", abi: VaultManagerAbi },
  LockDealNFT: { address: "0xe42876a77108E8B3B2af53907f5e533Cba2Ce7BE", abi: LockDealNFTAbi }
} as const;
