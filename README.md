
# ReactHelperV2

A modern React package for seamless interaction with Poolz smart contracts and Web3, built on WAGMI and TypeScript.

## Features

- Multi-chain support
- Type-safe contract interactions
- React hooks for contracts, tokens, balances, and wallet
- Out-of-the-box configuration
- ERC20 and NFT utilities

## Installation

```bash
pnpm add reacthelperv2
# or
yarn add reacthelperv2
# or
npm install reacthelperv2
```

## Quick Start

```tsx
import { PoolzProvider, usePoolzContract } from 'reacthelperv2';

function App() {
  return (
    <PoolzProvider>
      <YourComponent />
    </PoolzProvider>
  );
}

function YourComponent() {
  const { poolzContract, poolzTokenAddress } = usePoolzContract();
  // ...
}
```

## Main Hooks & Components

### `PoolzProvider`
Wrap your app to provide all Poolz/Web3 context.

### `usePoolzApp`
Access chain, account, connection status, and utility info.

```tsx
const { chainId, account, isConnected, disconnect, nativeSymbol } = usePoolzApp();
```

### `usePoolzContract`
Type-safe access to Poolz smart contracts and addresses.

```tsx
const { poolzContract, poolzTokenAddress } = usePoolzContract();
// Example: await poolzContract.LockDealNFT.balanceOf({ args: [address] }).read();
```

### `useERC20`
All-in-one ERC20 token operations (read, approve, info, hooks).

```tsx
const erc20 = useERC20();
const allowance = await erc20.allowance({ tokenAddress, owner, spender });
const balance = await erc20.balance({ tokenAddress, account });
const info = await erc20.tokenInfo({ tokenAddress });
await erc20.approve({ tokenAddress, spender, amount });
```

### `BalanceProvider`, `useTokenBalance`, `useTokenBalances`, `useNativeBalance`
Context and hooks for real-time token and native balances.

```tsx
<BalanceProvider tokenAddresses={[...]}>
  <Component />
</BalanceProvider>
const bal = useTokenBalance(tokenAddress);
const bals = useTokenBalances([token1, token2]);
const native = useNativeBalance();
```

### `useNFTMetadata`, `NFTMetadataModal`, `NFTIdButton`
Fetch and display NFT metadata and UI.

```tsx
const nft = useNFTMetadata();
<NFTIdButton contractAddress="..." tokenId="1" />
<NFTMetadataModal contractAddress="..." tokenId="1" isOpen={open} onClose={close} />
```

### `useWalletConnection`
Easy wallet connect/disconnect and status.

```tsx
const { isConnected, connectWallet, disconnect, walletOptions } = useWalletConnection();
```

### Utilities

```tsx
import { useSidNameForAddress, useTheSiwe, getChainNativeSymbol } from 'reacthelperv2';
const sid = useSidNameForAddress(address);
const siwe = useTheSiwe();
const symbol = getChainNativeSymbol(chainId);
```

## Development

```bash
pnpm install
pnpm test
pnpm build
```

## License

MIT
