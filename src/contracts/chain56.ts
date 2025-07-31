import { LockDealNFTAbi } from "../generated/abi/LockDealNFT";
import { VaultManagerAbi } from "../generated/abi/VaultManager";
import { DealProviderAbi } from "../generated/abi/DealProvider";
import { SimpleBuilderAbi } from "../generated/abi/SimpleBuilder";
import { DispenserProviderAbi } from "../generated/abi/DispenserProvider";
import { LockDealProviderAbi } from "../generated/abi/LockDealProvider";
import { TimedDealProviderAbi } from "../generated/abi/TimedDealProvider";
import { InvestProviderAbi } from "../generated/abi/InvestProvider";
import { MultiSenderV2Abi } from "../generated/abi/MultiSenderV2";
import { LockedDealV2Abi } from "../generated/abi/LockedDealV2";
import { DelayVaultAbi } from "../generated/abi/DelayVault";
import { DelayVaultProviderAbi } from "../generated/abi/DelayVaultProvider";
import { TokenNFTConnectorAbi } from "../generated/abi/TokenNFTConnector";
import { DelayVaultMigratorAbi } from "../generated/abi/DelayVaultMigrator";

export const chain56Contracts = {
  LockDealNFT: { address: "0x3d2C83bbBbfB54087d46B80585253077509c21AE", abi: LockDealNFTAbi },
  VaultManager: { address: "0xd82C03Bd0543b567C9CeC7B822373be2B167f00F", abi: VaultManagerAbi },
  DealProvider: { address: "0x09b158df31ec4edf2dcd2c1dbda60b69dad01347", abi: DealProviderAbi },
  SimpleBuilder: { address: "0x4c6842E242B39F16328f2dEEd8cF23b407982aff", abi: SimpleBuilderAbi },
  DispenserProvider: { address: "0x93441BF11A3Cc2352253013990d68F5A2b1EC3ed", abi: DispenserProviderAbi },
  LockDealProvider: { address: "0x2942ee88A75B0c87fC9eEB8DDc9066De84937786", abi: LockDealProviderAbi },
  TimedDealProvider: { address: "0x43b4CD03ED2504599Ed3Fb56780149A7E7960282", abi: TimedDealProviderAbi },
  InvestProvider: { address: "0x80E7DCA0B053D044B0ff477C48e891B0aF01d545", abi: InvestProviderAbi },
  MultiSenderV2: { address: "0x114DAdDE8112A5c43aaBc6373473c282e14948Fa", abi: MultiSenderV2Abi },
  LockedDealV2: { address: "0x436CE2ce8d8d2Ccc062f6e92faF410DB4d397905", abi: LockedDealV2Abi },
  DelayVault: { address: "0x5eb57B1210338b13E3D5572d5e1670285Aa71702", abi: DelayVaultAbi },
  DelayVaultProvider: { address: "0xeb88Ff7799E0e7b187D98232336722ec9936B86D", abi: DelayVaultProviderAbi },
  TokenNFTConnector: { address: "0x23f561B92AAa13d7C15A1038297Cd59bAe6C47c5", abi: TokenNFTConnectorAbi },
  DelayVaultMigrator: { address: "0x10F1DA58d6d25B5909d5897ea3BA3E76fcE774A5", abi: DelayVaultMigratorAbi }
} as const;
