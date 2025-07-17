import { LockDealNFTAbi } from "../../generated/abi/LockDealNFT";
import { VaultManagerAbi } from "../../generated/abi/VaultManager";
import { DealProviderAbi } from "../../generated/abi/DealProvider";
import { LockDealProviderAbi } from "../../generated/abi/LockDealProvider";
import { TimedDealProviderAbi } from "../../generated/abi/TimedDealProvider";
import { SimpleBuilderAbi } from "../../generated/abi/SimpleBuilder";
import { DispenserProviderAbi } from "../../generated/abi/DispenserProvider";
import { MultiSenderV2Abi } from "../../generated/abi/MultiSenderV2";

export const chain169Contracts = {
  LockDealNFT: { address: "0xb16BBDf683fFd6D92290F7610bb10f22f9c71e9e", abi: LockDealNFTAbi },
  VaultManager: { address: "0x7Ff9315f538dF7eC76Ec4815249Dd30519726460", abi: VaultManagerAbi },
  DealProvider: { address: "0xD985eFADECBC4A11C731f3086cbad8edE5e3e341", abi: DealProviderAbi },
  LockDealProvider: { address: "0x25ea5cf98A46dbaBefd042B6cEebc501b659be78", abi: LockDealProviderAbi },
  TimedDealProvider: { address: "0xaEb7A13D3608C673E99685798f9ba5ACE41119d3", abi: TimedDealProviderAbi },
  SimpleBuilder: { address: "0xA2A0bEEfda596Fdb321240dD283D8cBf65b252f1", abi: SimpleBuilderAbi },
  DispenserProvider: { address: "0xEe25294438bc5542fEAFACC3E08Bb4658EB3C43f", abi: DispenserProviderAbi },
  MultiSenderV2: { address: "0x655a8bc3875aedb2A4bc4aeeF5F84805207cB5DC", abi: MultiSenderV2Abi }
} as const;
