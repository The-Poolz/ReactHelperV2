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
import { PoolzBackAbi } from "../generated/abi/PoolzBack";
import { SignUpAbi } from "../generated/abi/SignUp";
import { WhiteListAbi } from "../generated/abi/WhiteList";
import { POOLXAbi } from "../generated/abi/POOLX";
import { CollateralProviderAbi } from "../generated/abi/CollateralProvider";
import { RefundProviderAbi } from "../generated/abi/RefundProvider";
import { SimpleRefundBuilderAbi } from "../generated/abi/SimpleRefundBuilder";

export const chain56Contracts = {
  LockDealNFT: { address: "0x3d2C83bbBbfB54087d46B80585253077509c21AE", abi: LockDealNFTAbi, nameVersion: "LockDealNFT@1.0.4-a" },
  VaultManager: { address: "0xd82C03Bd0543b567C9CeC7B822373be2B167f00F", abi: VaultManagerAbi, nameVersion: "VaultManager@1.0.1" },
  DealProvider: { address: "0x09b158df31ec4edf2dcd2c1dbda60b69dad01347", abi: DealProviderAbi, nameVersion: "DealProvider@1.0.6" },
  SimpleBuilder: { address: "0x4c6842E242B39F16328f2dEEd8cF23b407982aff", abi: SimpleBuilderAbi, nameVersion: "SimpleBuilder@1.2.2" },
  DispenserProvider: { address: "0x93441BF11A3Cc2352253013990d68F5A2b1EC3ed", abi: DispenserProviderAbi, nameVersion: "DispenserProvider@1.1.2" },
  LockDealProvider: { address: "0x2942ee88A75B0c87fC9eEB8DDc9066De84937786", abi: LockDealProviderAbi, nameVersion: "LockDealProvider@1.0.6" },
  TimedDealProvider: { address: "0x43b4CD03ED2504599Ed3Fb56780149A7E7960282", abi: TimedDealProviderAbi, nameVersion: "TimedDealProvider@1.0.6" },
  InvestProvider: { address: "0x80E7DCA0B053D044B0ff477C48e891B0aF01d545", abi: InvestProviderAbi, nameVersion: "InvestProvider@1.3.2" },
  MultiSenderV2: { address: "0x114DAdDE8112A5c43aaBc6373473c282e14948Fa", abi: MultiSenderV2Abi, nameVersion: "MultiSenderV2@2.1.0" },
  LockedDealV2: { address: "0x436CE2ce8d8d2Ccc062f6e92faF410DB4d397905", abi: LockedDealV2Abi, nameVersion: "LockedDeal@2.3.3" },
  DelayVault: { address: "0x5eb57B1210338b13E3D5572d5e1670285Aa71702", abi: DelayVaultAbi, nameVersion: "DelayVault@1.2.2" },
  DelayVaultProvider: { address: "0xeb88Ff7799E0e7b187D98232336722ec9936B86D", abi: DelayVaultProviderAbi, nameVersion: "DelayVaultProvider@0.9.5-ironblocks" },
  TokenNFTConnector: { address: "0x23f561B92AAa13d7C15A1038297Cd59bAe6C47c5", abi: TokenNFTConnectorAbi, nameVersion: "TokenNFTConnector@1.2.1" },
  DelayVaultMigrator: { address: "0x10F1DA58d6d25B5909d5897ea3BA3E76fcE774A5", abi: DelayVaultMigratorAbi, nameVersion: "DelayVaultMigrator@0.9.1-ironblocks" },
  PoolzBack: { address: "0xCc8f6A82Ff034C15dFDAcBcab29F7Ea28C616EF7", abi: PoolzBackAbi, nameVersion: "PoolzBack@1.3.0" },
  SignUp: { address: "0x41b56bF3b21C53F6394a44A2ff84f1d2bBC27841", abi: SignUpAbi, nameVersion: "SignUp@1.0.0" },
  WhiteList: { address: "0x06eD6E9A15D1bae5835544E305e43f5cAB5DB525", abi: WhiteListAbi, nameVersion: "Whitelist@0.6.12" },
  POOLX: { address: "0xbaea9aba1454df334943951d51116ae342eab255", abi: POOLXAbi, nameVersion: "POOLX@1.0.0" },
  CollateralProvider: { address: "0xabc8a53b30b33190c959d304e1044b37c275d28d", abi: CollateralProviderAbi, nameVersion: "CollateralProvider@1.0.2" },
  RefundProvider: { address: "0xfd8d52ee64c85f82ebef6ae8a409e5ccddac0c04", abi: RefundProviderAbi, nameVersion: "RefundProvider@1.0.2" },
  SimpleRefundBuilder: { address: "0x906f2db10cac66cd31859656a2d198ecae7b9ef1", abi: SimpleRefundBuilderAbi, nameVersion: "SimpleRefundBuilder@1.2.2" }
} as const;
