import { useContext } from "react";
import { PoolzAppContext } from "../contexts/PoolzAppContext";
import { config } from "../wagmi";
import { watchAccount } from "wagmi/actions";

export function watchAccountChange(callback: (account: any) => void) {
  return watchAccount(config, {
    onChange: callback,
  });
}

export const usePoolzApp = () => {
  const context = useContext(PoolzAppContext);
  if (!context) {
    throw new Error('usePoolzApp must be used within a PoolzAppProvider');
  }
  return context;
};