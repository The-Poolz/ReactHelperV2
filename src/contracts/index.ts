import { chain0Contracts } from "./chain0";
import { chain10Contracts } from "./chain10";
import { chain11155111Contracts } from "./chain11155111";
import { chain122Contracts } from "./chain122";
import { chain1284Contracts } from "./chain1284";
import { chain130Contracts } from "./chain130";
import { chain137Contracts } from "./chain137";
import { chain1666600000Contracts } from "./chain1666600000";
import { chain169Contracts } from "./chain169";
import { chain1Contracts } from "./chain1";
import { chain245022934Contracts } from "./chain245022934";
import { chain248Contracts } from "./chain248";
import { chain2632500Contracts } from "./chain2632500";
import { chain2741Contracts } from "./chain2741";
import { chain3441005Contracts } from "./chain3441005";
import { chain3441006Contracts } from "./chain3441006";
import { chain40Contracts } from "./chain40";
import { chain42161Contracts } from "./chain42161";
import { chain42Contracts } from "./chain42";
import { chain43113Contracts } from "./chain43113";
import { chain43114Contracts } from "./chain43114";
import { chain56Contracts } from "./chain56";
import { chain59144Contracts } from "./chain59144";
import { chain7082400Contracts } from "./chain7082400";
import { chain80002Contracts } from "./chain80002";
import { chain8453Contracts } from "./chain8453";
import { chain88Contracts } from "./chain88";
import { chain97Contracts } from "./chain97";

export type ChainContracts = typeof chain0Contracts | typeof chain1Contracts | typeof chain10Contracts | typeof chain40Contracts | typeof chain42Contracts | typeof chain56Contracts | typeof chain88Contracts | typeof chain97Contracts | typeof chain122Contracts | typeof chain130Contracts | typeof chain137Contracts | typeof chain169Contracts | typeof chain248Contracts | typeof chain1284Contracts | typeof chain2741Contracts | typeof chain8453Contracts | typeof chain42161Contracts | typeof chain43113Contracts | typeof chain43114Contracts | typeof chain59144Contracts | typeof chain80002Contracts | typeof chain2632500Contracts | typeof chain3441005Contracts | typeof chain3441006Contracts | typeof chain7082400Contracts | typeof chain11155111Contracts | typeof chain245022934Contracts | typeof chain1666600000Contracts;

export const contractsByChain: { [chainId: number]: ChainContracts } = {
  0: chain0Contracts,
  10: chain10Contracts,
  11155111: chain11155111Contracts,
  122: chain122Contracts,
  1284: chain1284Contracts,
  130: chain130Contracts,
  137: chain137Contracts,
  1666600000: chain1666600000Contracts,
  169: chain169Contracts,
  1: chain1Contracts,
  245022934: chain245022934Contracts,
  248: chain248Contracts,
  2632500: chain2632500Contracts,
  2741: chain2741Contracts,
  3441005: chain3441005Contracts,
  3441006: chain3441006Contracts,
  40: chain40Contracts,
  42161: chain42161Contracts,
  42: chain42Contracts,
  43113: chain43113Contracts,
  43114: chain43114Contracts,
  56: chain56Contracts,
  59144: chain59144Contracts,
  7082400: chain7082400Contracts,
  80002: chain80002Contracts,
  8453: chain8453Contracts,
  88: chain88Contracts,
  97: chain97Contracts
} as const;

export type ContractsByChain = typeof contractsByChain;
