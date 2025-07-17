import { DealProviderAbi } from "../generated/abi/DealProvider";
import { VaultManagerAbi } from "../generated/abi/VaultManager";
import { LockDealNFTAbi } from "../generated/abi/LockDealNFT";
import { LockDealProviderAbi } from "../generated/abi/LockDealProvider";
import { TimedDealProviderAbi } from "../generated/abi/TimedDealProvider";
import { DispenserProviderAbi } from "../generated/abi/DispenserProvider";

export const chain2632500Contracts = {
  DealProvider: { address: "0x9cfd8c7834Be0DfE41F3FE68C29124066D5Cd13b", abi: DealProviderAbi },
  VaultManager: { address: "0x7Ff9315f538dF7eC76Ec4815249Dd30519726460", abi: VaultManagerAbi },
  LockDealNFT: { address: "0x2Bb9cFF524C76eb2eA27bC6cDbB93447115D8dcC", abi: LockDealNFTAbi },
  LockDealProvider: { address: "0x756CD0834C2610f583B8324934A0269E3fef6f72", abi: LockDealProviderAbi },
  TimedDealProvider: { address: "0x2051f98ca620a4d3E6024f144382d3537452B557", abi: TimedDealProviderAbi },
  DispenserProvider: { address: "0x8b58eeaB0e457c0b6CA68dFC3861a4352D6c5CFb", abi: DispenserProviderAbi }
} as const;
