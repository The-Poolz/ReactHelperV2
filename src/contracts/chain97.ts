import { SimpleBuilderAbi } from "../generated/abi/SimpleBuilder";
import { DealProviderAbi } from "../generated/abi/DealProvider";
import { LockDealProviderAbi } from "../generated/abi/LockDealProvider";
import { TimedDealProviderAbi } from "../generated/abi/TimedDealProvider";
import { DispenserProviderAbi } from "../generated/abi/DispenserProvider";
import { VaultManagerAbi } from "../generated/abi/VaultManager";
import { LockDealNFTAbi } from "../generated/abi/LockDealNFT";
import { InvestProviderAbi } from "../generated/abi/InvestProvider";
import { LockedDealV2Abi } from "../generated/abi/LockedDealV2";
import { DelayVaultAbi } from "../generated/abi/DelayVault";
import { DelayVaultProviderAbi } from "../generated/abi/DelayVaultProvider";
import { TokenNFTConnectorAbi } from "../generated/abi/TokenNFTConnector";
import { DelayVaultMigratorAbi } from "../generated/abi/DelayVaultMigrator";

export const chain97Contracts = {
  SimpleBuilder: { address: "0xaE297EeC7A7782e81CC23E6A3B6C06621B12dF26", abi: SimpleBuilderAbi },
  DealProvider: { address: "0x99ad58d94ab699F6d02790E182a0A4c28D4739B5", abi: DealProviderAbi },
  LockDealProvider: { address: "0x7e3e0C930b4Ae650D239964094b703deE75d33DD", abi: LockDealProviderAbi },
  TimedDealProvider: { address: "0xBE7C13C7F320979B44B01207Aa72Fe505fD87696", abi: TimedDealProviderAbi },
  DispenserProvider: { address: "0xa9c68640C1AA52E91A75F4c5e2786F68049541Ad", abi: DispenserProviderAbi },
  VaultManager: { address: "0xF0A8AAc3deB7596527A61697D0a9728E3A67D3B7", abi: VaultManagerAbi },
  LockDealNFT: { address: "0xe42876a77108E8B3B2af53907f5e533Cba2Ce7BE", abi: LockDealNFTAbi },
  InvestProvider: { address: "0x1Bebef1aBf49F9e588850b9Dc0Bf1AC6872C33D2", abi: InvestProviderAbi },
  LockedDealV2: { address: "0x60b157886e908dD0d6F42d01F96681018287A8b0", abi: LockedDealV2Abi },
  DelayVault: { address: "0x607155A953d5f598d2F7CcD9a6395Af389cfecE5", abi: DelayVaultAbi },
  DelayVaultProvider: { address: "0x9fd743f499d852E3A2cFEAC037e5562126468D28", abi: DelayVaultProviderAbi },
  TokenNFTConnector: { address: "0x99dfade11d9cd4c2b192efda205c50d982cd76a1", abi: TokenNFTConnectorAbi },
  DelayVaultMigrator: { address: "0xFc4E9DDd1E21a9BaDEb1A4C81687A20fe135A54F", abi: DelayVaultMigratorAbi }
} as const;
