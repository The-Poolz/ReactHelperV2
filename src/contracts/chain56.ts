import DealProviderAbi from "../../generated/abi/DealProvider.json" assert { type: "json" };
import DispenserProviderAbi from "../../generated/abi/DispenserProvider.json" assert { type: "json" };
import InvestProviderAbi from "../../generated/abi/InvestProvider.json" assert { type: "json" };
import LockDealNFTAbi from "../../generated/abi/LockDealNFT.json" assert { type: "json" };
import LockDealProviderAbi from "../../generated/abi/LockDealProvider.json" assert { type: "json" };
import SimpleBuilderAbi from "../../generated/abi/SimpleBuilder.json" assert { type: "json" };
import TimedDealProviderAbi from "../../generated/abi/TimedDealProvider.json" assert { type: "json" };
import VaultManagerAbi from "../../generated/abi/VaultManager.json" assert { type: "json" };

export const chain56Contracts = {
  LockDealNFT: { address: "0x3d2C83bbBbfB54087d46B80585253077509c21AE", abi: LockDealNFTAbi },
  VaultManager: { address: "0xd82C03Bd0543b567C9CeC7B822373be2B167f00F", abi: VaultManagerAbi },
  DealProvider: { address: "0x09b158df31ec4edf2dcd2c1dbda60b69dad01347", abi: DealProviderAbi },
  SimpleBuilder: { address: "0x4c6842E242B39F16328f2dEEd8cF23b407982aff", abi: SimpleBuilderAbi },
  DispenserProvider: { address: "0x93441BF11A3Cc2352253013990d68F5A2b1EC3ed", abi: DispenserProviderAbi },
  LockDealProvider: { address: "0x2942ee88A75B0c87fC9eEB8DDc9066De84937786", abi: LockDealProviderAbi },
  TimedDealProvider: { address: "0x43b4CD03ED2504599Ed3Fb56780149A7E7960282", abi: TimedDealProviderAbi },
  InvestProvider: { address: "0x80E7DCA0B053D044B0ff477C48e891B0aF01d545", abi: InvestProviderAbi },
} as const;
