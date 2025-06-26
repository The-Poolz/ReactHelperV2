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

## Generating Poolz data

Run `pnpm update-poolz` to fetch contract information from
`https://data.poolz.finance/graphql`. The script writes the list of supported
chain IDs to `generated/poolzChains.ts`, stores all contract ABIs under
`generated/abi/` and creates contract configuration files in `src/contracts/`.
It also updates `src/wagmi.ts` to include the retrieved chains.
