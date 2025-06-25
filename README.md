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
helper functions.

This is a [Vite](https://vitejs.dev) project bootstrapped with [`create-wagmi`](https://github.com/wevm/wagmi/tree/main/packages/create-wagmi).

## Updating supported wallets and chains

Run `npm run update-poolz` to fetch the latest wallet list and chain IDs from
`https://data.poolz.finance/graphql`. The script writes the information to
`src/poolzData.ts`.

## Fetching contract ABIs

Run `pnpm get-abi <documentId>` to download a contract ABI from
`https://data.poolz.finance/graphql`. The file will be saved under
`generated/abi/` using the contract's `NameVersion` as the filename.
