import { LockedDealV2Abi } from "../generated/abi/LockedDealV2";
import { WhiteListAbi } from "../generated/abi/WhiteList";

export const chain245022934Contracts = {
  LockedDealV2: { address: "0x7ff9315f538df7ec76ec4815249dd30519726460", abi: LockedDealV2Abi, nameVersion: "LockedDeal@2.3.3" },
  WhiteList: { address: "0x9c8f78e0aeab8190c9d1df7bed0b26c1edcb8de6", abi: WhiteListAbi, nameVersion: "Whitelist@0.6.12" }
} as const;
