import { chain11155111Contracts } from "./chain11155111";
import { chain1284Contracts } from "./chain1284";
import { chain130Contracts } from "./chain130";
import { chain137Contracts } from "./chain137";
import { chain169Contracts } from "./chain169";
import { chain1Contracts } from "./chain1";
import { chain2632500Contracts } from "./chain2632500";
import { chain3441005Contracts } from "./chain3441005";
import { chain40Contracts } from "./chain40";
import { chain42161Contracts } from "./chain42161";
import { chain43114Contracts } from "./chain43114";
import { chain56Contracts } from "./chain56";
import { chain7082400Contracts } from "./chain7082400";
import { chain8453Contracts } from "./chain8453";
import { chain97Contracts } from "./chain97";

export type ChainContracts = typeof chain1Contracts | typeof chain40Contracts | typeof chain56Contracts | typeof chain97Contracts | typeof chain130Contracts | typeof chain137Contracts | typeof chain169Contracts | typeof chain1284Contracts | typeof chain8453Contracts | typeof chain42161Contracts | typeof chain43114Contracts | typeof chain2632500Contracts | typeof chain3441005Contracts | typeof chain7082400Contracts | typeof chain11155111Contracts;

export const contractsByChain: { [chainId: number]: ChainContracts } = {
  11155111: chain11155111Contracts,
  1284: chain1284Contracts,
  130: chain130Contracts,
  137: chain137Contracts,
  169: chain169Contracts,
  1: chain1Contracts,
  2632500: chain2632500Contracts,
  3441005: chain3441005Contracts,
  40: chain40Contracts,
  42161: chain42161Contracts,
  43114: chain43114Contracts,
  56: chain56Contracts,
  7082400: chain7082400Contracts,
  8453: chain8453Contracts,
  97: chain97Contracts
} as const;

export type ContractsByChain = typeof contractsByChain;
