# ReactHelperV2

A comprehensive React library for seamless interaction with Poolz smart contracts and Web3 operations using WAGMI and TypeScript.

## 🚀 Features

- 🔗 **Multi-chain Support** - Works across all Poolz supported networks
- 🎯 **Type-safe Contract Interactions** - Auto-generated TypeScript types from ABIs
- ⚡ **Clean Web3 API** - Helper functions for contract validation and execution
- 🔍 **Automatic Function Detection** - Validates read vs write functions at compile time
- 🎨 **React Integration** - Built on WAGMI for optimal React hooks
- 📦 **Zero Configuration** - Works out of the box with sensible defaults
- 🚀 **Multicall Support** - Type-safe batch contract calls
- 💰 **Token Utilities** - ERC20 balance, approval, and metadata hooks
- 🖼️ **NFT Support** - NFT metadata fetching and display components
- 👛 **Wallet Management** - Easy wallet connection and management

## 📦 Installation

```bash
npm install reacthelperv2
# or
yarn add reacthelperv2
# or
pnpm add reacthelperv2
```

## 🏁 Quick Start

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
  const lockDealNFT = poolzContract.LockDealNFT;

  // Read contract data
  const handleRead = async () => {
    const balance = await lockDealNFT.balanceOf({
      args: ['0x1234567890123456789012345678901234567890']
    }).read();
    console.log('Balance:', balance);
  };

  // Write to contract
  const handleApprove = async () => {
    try {
      const result = await lockDealNFT.approve({
        args: ['0x1234567890123456789012345678901234567890', 1n]
      }).write();
      console.log('Transaction hash:', result.transactionHash);
    } catch (error) {
      console.error('Transaction failed:', error);
    }
  };

  return (
    <div>
      <p>POOLZ Token: {poolzTokenAddress}</p>
      <button onClick={handleRead}>Read Balance</button>
      <button onClick={handleApprove}>Approve NFT</button>
    </div>
  );
}
```

## 📚 API Reference

### 🌐 usePoolzApp Hook

Hook tổng hợp tiện ích cho ứng dụng Poolz, giúp lấy thông tin chain, account, trạng thái kết nối, và các tiện ích phổ biến.

```tsx
import { usePoolzApp } from 'reacthelperv2';

function AppInfo() {
  const {
    chainId,
    account,
    isConnected,
    isConnecting,
    disconnect,
    nativeSymbol,
    explorerUrl,
    walletClient,
    publicClient
  } = usePoolzApp();

  return (
    <div>
      <p>Chain ID: {chainId}</p>
      <p>Account: {account}</p>
      <p>Native Symbol: {nativeSymbol}</p>
      <p>Explorer: <a href={explorerUrl} target="_blank">{explorerUrl}</a></p>
      <p>Status: {isConnected ? 'Connected' : isConnecting ? 'Connecting...' : 'Disconnected'}</p>
      <button onClick={disconnect}>Disconnect</button>
    </div>
  );
}
```

### 🔗 usePoolzContract Hook

Main hook for interacting with Poolz smart contracts with full type safety.

```tsx
import { usePoolzContract } from 'reacthelperv2';

function ContractExample() {
  const { poolzContract, poolzTokenAddress } = usePoolzContract();

  // Read functions - return data directly
  async function readExamples() {
    const lockDealNFT = poolzContract.LockDealNFT;

    // Simple read
    const name = await lockDealNFT.name({ args: [] }).read();

    // Read with parameters
    const balance = await lockDealNFT.balanceOf({
      args: ["0x1234567890123456789012345678901234567890"]
    }).read();

    // Complex return types
    const poolInfo = await poolzContract.InvestProvider.poolIdToPool({
      args: [BigInt(123)]
    }).read();

    console.log('Pool Info Max Amount:', poolInfo[0]); // bigint
    console.log('Pool Info Left Amount:', poolInfo[1]); // bigint
  }

  // Write functions with return data
  async function writeWithReturnData() {
    // Functions that return data get both receipt and data
    // To fetch return data, set fetchReturnData: true/false
    const createResult = await poolzContract.InvestProvider.createNewPool({
      args: [BigInt(1000), BigInt(0)]
    }).write({ fetchReturnData: true });

    console.log('Receipt:', createResult.transactionHash);
    console.log('Pool ID:', createResult.data); // bigint if function returns data
  }

  // Write functions without return data
  async function writeWithoutReturnData() {
    // Functions without outputs only return receipt
    const transferResult = await poolzContract.LockDealNFT.safeTransferFrom({
      args: ["0x1234...", "0x5678...", BigInt(1)]
    }).write();

    console.log('Receipt:', transferResult.transactionHash);
    // No .data property for functions without return values
  }

  // Multicall - batch multiple calls efficiently
  async function multicallExample() {
    const results = await poolzContract.LockDealNFT.multicall({
      contracts: [
        { functionName: 'name', args: [] },
        { functionName: 'symbol', args: [] },
        { functionName: 'balanceOf', args: ['0x1234...'] }
      ]
    });

    results.forEach((result, index) => {
      if (result.status === 'success') {
        console.log(`Result ${index}:`, result.result);
      } else {
        console.error(`Error ${index}:`, result.error);
      }
    });
  }
}
```

**Available Contracts:**
- `LockDealNFT` - Main NFT contract for locked deals
- `LockDealProvider` - Provider for creating locked deals
- `DelayVault` - Time-delayed vaults
- `InvestProvider` - Investment provider
- `TimedDealProvider` - Time-based deal provider
- `DispenserProvider` - Token dispenser
- And more...

### 💰 useERC20 Hook

Complete ERC20 token operations with async methods and React hooks.

```tsx
import { useERC20 } from 'reacthelperv2';

function TokenExample() {
  const erc20 = useERC20();
  const { poolzContract } = usePoolzContract();

  async function tokenOperations() {
    const tokenAddress = "0x1234567890123456789012345678901234567890";
    const account = "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef";
    const spender = poolzContract.InvestProvider.smcAddress;

    // Get token allowance
    const allowance = await erc20.allowance({
      tokenAddress,
      owner: account,
      spender
    });
    console.log('Allowance:', allowance);

    // Get token balance
    const balance = await erc20.balance({
      tokenAddress,
      account
    });
    console.log('Balance:', balance);

    // Get token info
    const tokenInfo = await erc20.tokenInfo({
      tokenAddress,
      publicClient: null // Will be auto-filled
    });
    console.log('Token Info:', tokenInfo);

    // Approve tokens
    await erc20.approve({
      tokenAddress,
      spender,
      amount: BigInt("1000000000000000000") // 1 token with 18 decimals
    });
  }

  // Using React hooks for real-time data
  function ReactHookExamples() {
    const tokenAddress = "0x1234...";
    const account = "0xabcd...";

    // Real-time balance hook
    const balanceQuery = erc20.useBalance({
      tokenAddress,
      account,
      enabled: !!account
    });

    // Real-time allowance hook
    const allowanceQuery = erc20.useAllowance({
      tokenAddress,
      owner: account,
      spender: poolzContract.InvestProvider.smcAddress,
      enabled: !!account
    });

    // Approve mutation state
    const { isLoading: isApproving, error: approveError } = erc20.approveState;

    return (
      <div>
        <p>Balance: {balanceQuery.data}</p>
        <p>Allowance: {allowanceQuery.data}</p>
        {isApproving && <p>Approving...</p>}
        {approveError && <p>Approve Error: {approveError.message}</p>}
      </div>
    );
  }
}
```

### 📊 Token Balance Hooks

Convenient hooks for managing token balances with BalanceProvider context.

```tsx
import {
  BalanceProvider,
  useTokenBalance,
  useTokenBalances,
  useNativeBalance
} from 'reacthelperv2';

function App() {
  const tokenAddresses = [
    "0x1234567890123456789012345678901234567890", // USDT
    "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef"  // DAI
  ];

  return (
    <BalanceProvider tokenAddresses={tokenAddresses}>
      <BalanceExample />
    </BalanceProvider>
  );
}

function BalanceExample() {
  // Single token balance
  const usdtBalance = useTokenBalance("0x1234567890123456789012345678901234567890");

  // Multiple token balances
  const tokenBalances = useTokenBalances([
    "0x1234567890123456789012345678901234567890",
    "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef"
  ]);

  // Native balance (ETH, BNB, MATIC, etc.)
  const nativeBalance = useNativeBalance();

  return (
    <div>
      <h3>Native Balance</h3>
      <p>{nativeBalance.formattedBalance} {nativeBalance.symbol}</p>

      <h3>USDT Balance</h3>
      <p>{usdtBalance.formattedBalance} {usdtBalance.symbol}</p>
      <p>Decimals: {usdtBalance.decimals}</p>

      <h3>All Token Balances</h3>
      {tokenBalances.map((token, index) => (
        <div key={index}>
          <p>{token.formattedBalance} {token.symbol}</p>
          {token.isLoading && <span>Loading...</span>}
        </div>
      ))}
    </div>
  );
}
```

### 🖼️ NFT Metadata Hooks

Fetch and display NFT metadata with built-in UI components.

```tsx
import {
  useNFTMetadata,
  NFTMetadataModal,
  NFTIdButton
} from 'reacthelperv2';

function NFTExample() {
  const nftMetadata = useNFTMetadata();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFetchMetadata = async () => {
    const tokenURI = "https://api.example.com/metadata/1";
    await nftMetadata.fetchMetadata(BigInt(1), tokenURI);
    setIsModalOpen(true);
  };

  return (
    <div>
      <button onClick={handleFetchMetadata}>
        Fetch NFT Metadata
      </button>

      {/* Quick NFT ID button with auto-fetch */}
      <NFTIdButton
        contractAddress="0x1234567890123456789012345678901234567890"
        tokenId="1"
        className="custom-button"
      />

      {/* Metadata modal */}
      <NFTMetadataModal
        contractAddress="0x1234567890123456789012345678901234567890"
        tokenId="1"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Manual metadata display */}
      {nftMetadata.selectedNFT && (
        <div>
          <h3>{nftMetadata.selectedNFT.metadata?.name}</h3>
          <p>{nftMetadata.selectedNFT.metadata?.description}</p>
          {nftMetadata.selectedNFT.metadata?.image && (
            <img
              src={nftMetadata.selectedNFT.metadata.image}
              alt="NFT"
              style={{ maxWidth: '200px' }}
            />
          )}
        </div>
      )}
    </div>
  );
}
```

### 👛 Wallet Connection Hook

Easy wallet connection and management.

```tsx
import { useWalletConnection } from 'reacthelperv2';

function WalletExample() {
  const {
    isConnected,
    isConnecting,
    address,
    chainId,
    walletOptions,
    connectWallet,
    disconnect,
    error
  } = useWalletConnection();

  if (isConnected) {
    return (
      <div>
        <p>Connected: {address}</p>
        <p>Chain ID: {chainId}</p>
        <button onClick={disconnect}>Disconnect</button>
      </div>
    );
  }

  return (
    <div>
      <h3>Connect Wallet</h3>
      {walletOptions.map((wallet) => (
        <div key={wallet.id}>
          <button
            onClick={() => connectWallet(wallet.id)}
            disabled={isConnecting || !wallet.installed}
          >
            {wallet.name}
            {!wallet.installed && " (Not Installed)"}
          </button>
          {!wallet.installed && wallet.installUrl && (
            <a href={wallet.installUrl} target="_blank" rel="noopener noreferrer">
              Install {wallet.name}
            </a>
          )}
        </div>
      ))}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}
```

### 🛠️ Additional Utilities

```tsx
import {
  useTokenApproval,
  useSidNameForAddress,
  useTheSiwe,
  getChainNativeSymbol
} from 'reacthelperv2';

function UtilityExample() {
  // Token approval management
  const tokenApproval = useTokenApproval({
    tokenAddress: "0x1234...",
    spenderAddress: "0x5678...",
    amount: BigInt("1000000000000000000")
  });

  // SID name resolution
  const sidName = useSidNameForAddress("0x1234567890123456789012345678901234567890");

  // SIWE (Sign-In with Ethereum)
  const siwe = useTheSiwe();

  // Get native symbol for chain
  const symbol = getChainNativeSymbol(1); // "ETH" for Ethereum mainnet

  return (
    <div>
      <p>Token Approved: {tokenApproval.isApproved ? 'Yes' : 'No'}</p>
      <p>SID Name: {sidName.data || 'No name found'}</p>
      <p>Chain Symbol: {symbol}</p>

      <button onClick={() => tokenApproval.approve()}>
        Approve Token
      </button>

      <button onClick={() => siwe.signIn()}>
        Sign In with Ethereum
      </button>
    </div>
  );
}
```

## 🔧 Development

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Build the library
pnpm build

# Generate contract types (after ABI changes)
pnpm generate:types

# Update Poolz data from GraphQL
pnpm update-poolz

# Start example app
pnpm dev
```

## 🏗️ Advanced Usage

### Custom Hook Combinations

```tsx
function AdvancedExample() {
  const { poolzContract, poolzTokenAddress } = usePoolzContract();
  const erc20 = useERC20();
  const { isConnected, address } = useWalletConnection();
  const poolzBalance = useTokenBalance(poolzTokenAddress);

  const handleInvestWithApproval = async () => {
    if (!isConnected || !address) return;

    const amount = BigInt("1000000000000000000"); // 1 POOLZ
    const investProvider = poolzContract.InvestProvider;

    // Check current allowance
    const currentAllowance = await erc20.allowance({
      tokenAddress: poolzTokenAddress,
      owner: address,
      spender: investProvider.smcAddress
    });

    // Approve if needed
    if (BigInt(currentAllowance) < amount) {
      await erc20.approve({
        tokenAddress: poolzTokenAddress,
        spender: investProvider.smcAddress,
        amount
      });
    }

    // Invest
    const result = await investProvider.invest({
      args: [BigInt(123), amount, BigInt(Date.now() + 3600), "0x"]
    }).write();

    console.log('Investment successful:', result.transactionHash);
  };

  return (
    <div>
      <p>POOLZ Balance: {poolzBalance.formattedBalance}</p>
      <button onClick={handleInvestWithApproval}>
        Invest 1 POOLZ
      </button>
    </div>
  );
}
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
