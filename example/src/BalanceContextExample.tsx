import React from 'react';
import { BalanceProvider, useBalanceContext } from '../../src/contexts/BalanceContext';
import { useTokenBalances, useNativeBalance } from '../../src/hooks/useTokenBalance';

// Example component using multiple token balances
const MultiTokenBalanceExample: React.FC<{ tokenAddresses: string[] }> = ({ tokenAddresses }) => {
  const tokenBalances = useTokenBalances(tokenAddresses);

  return (
    <div className="multi-token-balance">
      <h3>Token Balances</h3>
      {tokenBalances.map((balance, index) => (
        <div key={index} className="token-row">
          <span>{balance.symbol}: {balance.formattedBalance}</span>
          {balance.isLoading && <span> (Loading...)</span>}
        </div>
      ))}
    </div>
  );
};

// Example component showing native balance
const NativeBalanceExample: React.FC = () => {
  const nativeBalance = useNativeBalance();

  return (
    <div className="native-balance-card">
      <h3>Native Balance</h3>
      <p>{nativeBalance.symbol}: {nativeBalance.formattedBalance}</p>
      {nativeBalance.isLoading && <p>Loading...</p>}
      {nativeBalance.error && <p style={{ color: 'red' }}>Error: {nativeBalance.error}</p>}
    </div>
  );
};

const BalanceManagerExample: React.FC = () => {
  const { balances, nativeBalance, addTokenAddress,  refreshBalances, refreshNativeBalance, isRefreshing } = useBalanceContext();
  const [newAddress, setNewAddress] = React.useState('');

  const handleAddToken = () => {
    if (newAddress.trim()) {
      addTokenAddress(newAddress.trim());
      setNewAddress('');
    }
  };

  const handleRefreshAll = () => {
    refreshBalances();
    refreshNativeBalance();
  };

  return (
    <div className="balance-manager">
      <h3>Balance Manager</h3>

      <div className="native-balance-display">
        <h4>Native Balance</h4>
        <p>{nativeBalance.symbol}: {nativeBalance.formattedBalance}</p>
        {nativeBalance.isLoading && <span>Loading...</span>}
        {nativeBalance.error && <span style={{ color: 'red' }}>Error: {nativeBalance.error}</span>}
      </div>

      <div className="controls">
        <input
          type="text"
          placeholder="Enter token address"
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
        />
        <button onClick={handleAddToken}>Add Token</button>
        <button onClick={handleRefreshAll} disabled={isRefreshing}>
          {isRefreshing ? 'Refreshing...' : 'Refresh All'}
        </button>
      </div>

      <div className="balance-list">
        <h4>Token Balances</h4>
        {Object.values(balances).map((balance) => (
          <div key={balance.address} className="balance-item">
            <div>
              <strong>{balance.symbol}</strong>: {balance.formattedBalance}
            </div>
            <div>
              <small>{balance.address}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main example component
const BalanceContextExample: React.FC = () => {
  const exampleTokens = [
    '0x0ED75ACF1464E632E09b97F04635c0cBCaF85A66',
    '0xcD1eF832eB8A5A77842C440032E03c4330974D21',
  ];

  return (
    <BalanceProvider
      tokenAddresses={exampleTokens}
      refreshInterval={30000}
    >
      <div className="balance-context-example">
        <h2>Balance Context Example</h2>

        <div className="examples">
          <NativeBalanceExample />

          <MultiTokenBalanceExample tokenAddresses={exampleTokens} />

          <BalanceManagerExample />
        </div>
      </div>
    </BalanceProvider>
  );
};

export default BalanceContextExample;
