import { LockDealNFTAbi } from "../generated/abi/LockDealNFT";
import { VaultManagerAbi } from "../generated/abi/VaultManager";
import { DealProviderAbi } from "../generated/abi/DealProvider";
import { LockDealProviderAbi } from "../generated/abi/LockDealProvider";
import { TimedDealProviderAbi } from "../generated/abi/TimedDealProvider";
import { SimpleBuilderAbi } from "../generated/abi/SimpleBuilder";
import { DispenserProviderAbi } from "../generated/abi/DispenserProvider";
import { MultiSenderV2Abi } from "../generated/abi/MultiSenderV2";
import { StakingManagerAbi } from "../generated/abi/StakingManager";

export const chain8453Contracts = {
  LockDealNFT: { address: "0xb16BBDf683fFd6D92290F7610bb10f22f9c71e9e", abi: LockDealNFTAbi },
  VaultManager: { address: "0x7ff9315f538df7ec76ec4815249dd30519726460", abi: VaultManagerAbi },
  DealProvider: { address: "0x9ba7036aa978509714D137bA7f98e8f66872c19F", abi: DealProviderAbi },
  LockDealProvider: { address: "0xbB407809BadB136E1db0ddb53478D5a830D83805", abi: LockDealProviderAbi },
  TimedDealProvider: { address: "0x83FF82f14920025576Cd04046335c4b748759121", abi: TimedDealProviderAbi },
  SimpleBuilder: { address: "0xA2A0bEEfda596Fdb321240dD283D8cBf65b252f1", abi: SimpleBuilderAbi },
  DispenserProvider: { address: "0x6145F338eCf142813a9Cfcf02A9f95cFC300cfb7", abi: DispenserProviderAbi },
  MultiSenderV2: { address: "0x120893ab6f67171d4e6b0e72c151ab96aebe44e4", abi: MultiSenderV2Abi },
  StakingManager: { address: "0xCc8f6A82Ff034C15dFDAcBcab29F7Ea28C616EF7", abi: StakingManagerAbi }
} as const;
