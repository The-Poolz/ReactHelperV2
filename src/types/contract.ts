import { contractsByChain } from "../contracts";

export type ChainId = keyof typeof contractsByChain;
