import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export interface MetaMaskLockState {
	isLocked: boolean;
	isUnlocked: boolean;
	lastChangeTimestamp: number | null;
}

/**
 * Hook to detect MetaMask lock/unlock state changes
 *
 * This hook listens to the `accountsChanged` event from MetaMask.
 * When MetaMask is locked, it emits an empty accounts array.
 * When unlocked, it emits the accounts array with addresses.
 *
 * @returns {MetaMaskLockState} Object containing lock state information
 *
 * @example
 * ```tsx
 * const { isLocked, isUnlocked, lastChangeTimestamp } = useMetaMaskLockState();
 *
 * useEffect(() => {
 *   if (isLocked) {
 *     console.log('MetaMask is locked');
 *   }
 * }, [isLocked]);
 * ```
 */
export const useMetaMaskLockState = (): MetaMaskLockState => {
	const { isConnected, address } = useAccount();
	const [isLocked, setIsLocked] = useState(false);
	const [lastChangeTimestamp, setLastChangeTimestamp] = useState<number | null>(
		null,
	);

	useEffect(() => {
		// Only listen if ethereum provider exists (MetaMask installed)
		if (
			globalThis.window === undefined ||
			!(globalThis as any).ethereum
		) {
			return;
		}

		const ethereum = (globalThis as any).ethereum;

		const handleAccountsChanged = (accounts: string[]) => {
			const timestamp = Date.now();
			setLastChangeTimestamp(timestamp);

			// If accounts array is empty and we were connected, MetaMask is locked
			if (accounts.length === 0 && isConnected) {
				setIsLocked(true);
			} else if (accounts.length > 0) {
				// MetaMask is unlocked and has accounts
				setIsLocked(false);
			}
		};

		// Listen to accounts changed event
		ethereum.on("accountsChanged", handleAccountsChanged);

		// Initial check
		if (isConnected && address) {
			setIsLocked(false);
		}

		return () => {
			if (ethereum.removeListener) {
				ethereum.removeListener("accountsChanged", handleAccountsChanged);
			}
		};
	}, [isConnected, address]);

	return {
		isLocked,
		isUnlocked: !isLocked && isConnected,
		lastChangeTimestamp,
	};
};
