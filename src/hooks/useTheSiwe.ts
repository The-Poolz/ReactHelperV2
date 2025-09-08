import { useCallback, useMemo } from "react";
import { useSignMessage } from "wagmi";
import { usePoolzApp } from "./usePoolzApp";
import { isAddressEqual } from "viem";

interface ISiwe {
  Domain: string;
  URI: string;
  Statement: string;
  Version: string;
  ChainId: number;
  Nonce: number;
  IssuedAt: string;
  ExpirationAt: string;
}

type TProps = () => Promise<Partial<ISiwe>>;

export const useTheSiwe = (props: TProps) => {
  const { account, connectedAccount } = usePoolzApp();
  const { signMessageAsync } = useSignMessage();

  const templateEip4361message = useCallback(async () => {
    const { Domain, URI, Statement, Version, ChainId, Nonce, IssuedAt, ExpirationAt } = await props();
    const { host: domain, href: uri } = window.location;

    return `${Domain ?? domain} wants you to sign in with your Ethereum account:
${account}

${Statement ?? "I accept the Poolz Terms & Conditions: https://www.poolz.finance/terms-conditions"}

URI: ${URI ?? uri}
Version: ${String(Version ?? 1)}
Chain ID: ${Number(ChainId ?? 56)}
Nonce: ${Nonce ?? new Date().getTime()}
Issued At: ${IssuedAt ?? new Date().toISOString()}
Expiration Time: ${ExpirationAt ?? new Date(new Date().getTime() + 1000 * 60 * 60 * 24).toISOString()}`;
  }, [props, account]);

  return useMemo(() => {
    const signInWithEthereum = async () => {
      if (!account || !connectedAccount) throw new Error("No account connected");

      if(!isAddressEqual(connectedAccount, account)) {
        throw new Error("Connected account does not match the account in context");
      }

      const eip4361message = await templateEip4361message();
      const formattedMessage = eip4361message.replace(/[\r\n]/g, "\n");

      const signature = await signMessageAsync({
        message: formattedMessage,
      });

      return {
        eip4361message,
        signature,
        formatedMessage: eip4361message.replace(/\n/g, "\\n")
      };
    };

    return { signInWithEthereum };
  }, [account, templateEip4361message, signMessageAsync]);
};
