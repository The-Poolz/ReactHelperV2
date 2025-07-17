# React Helper V2

This repository provides utilities to consume Poolz data from the GraphQL
endpoint at <https://data.poolz.finance/graphql>. Its goal is to simplify
integration of contract information, supported chains and wallet providers in
React applications.

The project uses **WAGMI** to handle wallet connections and Web3 interactions.
By wrapping common configuration with WAGMI, it offers a ready-to-use setup for
React apps that need to connect to Poolz smart contracts and fetch on-chain
data.

This repository is currently minimal and will be expanded with examples and
helper functions. An example Vite project lives under the `example` directory.
Run `pnpm dev` from the repository root to start the demo application. The
package exports a `PoolzProvider` component that wraps `WagmiProvider` and
`@tanstack/react-query` so your app only needs to supply its content.

This is a [Vite](https://vitejs.dev) project bootstrapped with [`create-wagmi`](https://github.com/wevm/wagmi/tree/main/packages/create-wagmi).

## Setup

1. Install **Node.js 20** (the same version used in CI).
2. Install dependencies by running `pnpm install`.
3. After installing dependencies, run `pnpm lint` to check code style.
4. Run `pnpm test` to execute the test suite.
5. WalletConnect connections require the `VITE_WC_PROJECT_ID` environment variable.

## Generating Poolz data

Run `pnpm update-poolz` to fetch contract information from
`https://data.poolz.finance/graphql`. The script writes the list of supported
chain IDs to `src/generated/poolzChains.ts`, stores all contract ABIs under
`src/generated/abi/` and creates contract configuration files in `src/contracts/`.
It also updates `src/wagmi.ts` to include the retrieved chains.

## Configuration

`src/wagmi.ts` expects the environment variable `VITE_WC_PROJECT_ID` to be set.
If it is missing, the module throws an error on startup so WalletConnect cannot
be misconfigured.

## Custom React Hooks

The `src/hooks/` folder provides a set of custom hooks to interact with Poolz smart contracts and blockchain data in a type-safe, convenient way. Below are the main hooks and usage examples:

### useContractRead
Type-safe read from any Poolz contract.
```tsx
const nameQuery = useContractRead({
  chainId: 56,
  contractName: "LockDealNFT",
  functionName: "name",
});
// Usage: await nameQuery.mutateAsync([])
```

### useContractWrite
Type-safe write to any Poolz contract.
```tsx
const transferMutation = useContractWrite({
  chainId: 56,
  contractName: "LockDealNFT",
  functionName: "safeTransferFrom",
});
// Usage: transferMutation.mutate([from, to, tokenId])
```

### useERC20Info
Get ERC20 token info (symbol, decimals, name).
```tsx
const { symbol, decimals, name } = useERC20Info(chainId, tokenAddress);
```

### useERC20Balance
Get ERC20 token balance for an account.
```tsx
const balance = useERC20Balance(chainId, tokenAddress, account);
```

### useERC20Allowance
Get ERC20 allowance for a spender.
```tsx
const allowance = useERC20Allowance(chainId, tokenAddress, owner, spender);
```

### useERC20Approve
Approve ERC20 tokens for a spender.
```tsx
const approveMutation = useERC20Approve(chainId, tokenAddress);
// Usage: approveMutation.mutate([spender, amount])
```

### useCheckGasFee
Estimate and check if the account has enough gas for a contract call.
```tsx
const checkGas = useCheckGasFee({
  chainId,
  contractName: "LockDealNFT",
  functionName: "safeTransferFrom",
  account,
  balance,
});
// Usage: checkGas.mutate([args...])
```

### usePoolzContractInfo
Get contract address and ABI by chainId and contractName.
```tsx
const { smcAddress, abi } = usePoolzContractInfo(chainId, contractName);
```

---

All hooks are fully type-safe and optimized for Poolz contracts. See the `example/` folder for more usage patterns.

## Usage

### PoolzProvider
Wrap your app with `PoolzProvider` to enable all wagmi, react-query, and Poolz context features:

```tsx
import { PoolzProvider } from 'react-helper-v2';

function App() {
  return (
    <PoolzProvider>
      {/* your app components */}
    </PoolzProvider>
  );
}
```

- `PoolzProvider` automatically sets up:
  - wagmi config (wallet connection, chain info)
  - react-query client
  - React.StrictMode

### Balance Context

To get ERC20 and native token balances for the connected wallet, use the context and hooks:

```tsx
import { BalanceProvider, useTokenBalance, useTokenBalances, useNativeBalance } from 'react-helper-v2';

<BalanceProvider tokenAddresses={["0x...", "0x..."]}>
  <YourComponent />
</BalanceProvider>

// In your component:
const { formattedBalance, symbol } = useNativeBalance();
const token = useTokenBalance("0x...");
const tokens = useTokenBalances(["0x...", "0x..."]);
```

See `example/BalanceContextExample.tsx` for a full demo.
