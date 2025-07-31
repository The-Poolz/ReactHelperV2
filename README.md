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

## Generating Poolz data

Run `pnpm update-poolz` to fetch contract information from
`https://data.poolz.finance/graphql`. The script writes the list of supported
chain IDs to `src/generated/poolzChains.ts`, stores all contract ABIs under
`src/generated/abi/` and creates contract configuration files in `src/contracts/`.
It also updates `src/wagmi.ts` to include the retrieved chains.

## Poolz Contract Hook (Type-safe Multicall, Read, Write)

The main entrypoint for interacting with Poolz contracts is the `usePoolzContract` hook. This hook provides a type-safe API for reading, writing, and multicall to any supported Poolz contract, with full TypeScript support for function names and arguments.

### Example: Type-safe Read
```tsx
const { poolContract } = usePoolzContract();
const res = await poolContract.LockDealNFT.readContract({
  functionName: "balanceOf",
  args: ["0x1234..."],
});
```

### Example: Type-safe Write
```tsx
const { poolContract } = usePoolzContract();
const receipt = await poolContract.LockDealNFT.writeContract({
  functionName: "safeTransferFrom",
  args: ["0xFrom", "0xTo", 1],
});
```

### Example: Type-safe Multicall
```tsx
const { poolContract } = usePoolzContract();
const result = await poolContract.LockDealNFT.multicall({
  calls: [
    { functionName: "balanceOf", args: ["0x1234..."] },
    { functionName: "ownerOf", args: [1] },
  ]
});
```

All function names and argument types are inferred from the contract ABIs, so you get full autocompletion and type safety.

See the `example/` folder for more usage patterns and advanced scenarios.

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
