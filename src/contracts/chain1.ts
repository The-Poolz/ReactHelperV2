import { VaultManagerAbi } from "../generated/abi/VaultManager";
import { LockDealNFTAbi } from "../generated/abi/LockDealNFT";
import { DealProviderAbi } from "../generated/abi/DealProvider";
import { LockDealProviderAbi } from "../generated/abi/LockDealProvider";
import { TimedDealProviderAbi } from "../generated/abi/TimedDealProvider";
import { SimpleBuilderAbi } from "../generated/abi/SimpleBuilder";
import { DispenserProviderAbi } from "../generated/abi/DispenserProvider";
import { MultiSenderV2Abi } from "../generated/abi/MultiSenderV2";
import { LockedDealV2Abi } from "../generated/abi/LockedDealV2";
import { PoolzBackAbi } from "../generated/abi/PoolzBack";
import { WhiteListAbi } from "../generated/abi/WhiteList";

export const chain1Contracts = {
  VaultManager: { address: "0x9ff1db30c66cd9d3311b4b22da49791610922b13", abi: VaultManagerAbi, nameVersion: "VaultManager@1.0.1" },
  LockDealNFT: { address: "0x5e0bB1fF9003ac3586f039D482d2974A6D7ED781", abi: LockDealNFTAbi, nameVersion: "LockDealNFT@1.0.4-a" },
  DealProvider: { address: "0xf8449c81E2d132e429caa1cb744E1ba7235C20DE", abi: DealProviderAbi, nameVersion: "DealProvider@1.0.6" },
  LockDealProvider: { address: "0x83d9a44395b6a4Aa3a907a445CB049C50fF5b962", abi: LockDealProviderAbi, nameVersion: "LockDealProvider@1.0.6" },
  TimedDealProvider: { address: "0x313a8Dd9d9399fc625Ec946b328F45020d15A699", abi: TimedDealProviderAbi, nameVersion: "TimedDealProvider@1.0.6" },
  SimpleBuilder: { address: "0x39dDEE2Ee5dF625Ef91d509Ab40E926bbD83CD0C", abi: SimpleBuilderAbi, nameVersion: "SimpleBuilder@1.2.2" },
  DispenserProvider: { address: "0xf5e1D15FdCbB8efC617632dCBAcBC74b96a3ccA7", abi: DispenserProviderAbi, nameVersion: "DispenserProvider@1.1.2" },
  MultiSenderV2: { address: "0x658bcdfe51795ba43e9fd1ae9e39ddfbb1e70c5f", abi: MultiSenderV2Abi, nameVersion: "MultiSenderV2@2.1.0" },
  LockedDealV2: { address: "0x285B4866257eF51FfBDD239c10dE5f9493413d8f", abi: LockedDealV2Abi, nameVersion: "LockedDeal@2.3.3" },
  PoolzBack: { address: "0x99896BA5fde6CED06569CF848982d2c7779d2694", abi: PoolzBackAbi, nameVersion: "PoolzBack@1.3.0" },
  WhiteList: { address: "0xf5BbB7f9D38387A2196CD242e51808dc7E5CEF88", abi: WhiteListAbi, nameVersion: "Whitelist@0.6.12" }
} as const;
