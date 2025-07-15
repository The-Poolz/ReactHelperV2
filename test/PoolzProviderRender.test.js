import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import vm from "node:vm";
import React from "react";
import ts from "typescript";

function compileTs(modulePath, mocks = {}) {
  const code = fs.readFileSync(modulePath, "utf8").replace(/import\.meta\.env\.VITE_WC_PROJECT_ID/g, '"test"');
  const js = ts.transpileModule(code, {
    compilerOptions: {
      module: "commonjs",
      target: "es2018",
      jsx: "react",
      esModuleInterop: true,
    },
  }).outputText;
  const requireMock = (spec) => {
    if (spec in mocks) return mocks[spec];
    if (spec.startsWith("./") || spec.startsWith("../")) {
      const full = path.join(path.dirname(modulePath), spec);
      return compileTs(full.endsWith(".ts") || full.endsWith(".tsx") ? full : `${full}.ts`, mocks);
    }
    return require(spec);
  };
  const module = { exports: {} };
  vm.runInNewContext(js, { require: requireMock, module, exports: module.exports }, { filename: modulePath });
  return module.exports;
}

function shallowRender(element) {
  let el = element;
  while (true) {
    if (typeof el.type === "function") {
      el = el.type(el.props);
      continue;
    }
    if (typeof el.type === "symbol") {
      el = React.Children.only(el.props.children);
      continue;
    }
    return el;
  }
}

describe("PoolzProvider", () => {
  it("supplies wagmi config to WagmiProvider", () => {
    const wagmiMock = {};
    let received;
    wagmiMock.WagmiProvider = ({ config, children }) => {
      received = config;
      return children;
    };
    wagmiMock.useConfig = () => received;

    const commonMocks = {
      wagmi: { createConfig: (opts) => ({ opts }), http: () => {} },
      "wagmi/connectors": {
        injected: () => {},
        coinbaseWallet: () => {},
        metaMask: () => {},
        walletConnect: () => () => {},
      },
      "wagmi/chains": new Proxy({}, { get: () => ({}) }),
      viem: { createClient: () => ({}) },
      react: React,
    };

    const configModule = compileTs(path.join("src", "wagmi.ts"), commonMocks);
    const ProviderModule = compileTs(path.join("src", "PoolzProvider.tsx"), {
      ...commonMocks,
      wagmi: wagmiMock,
      "./wagmi": configModule,
      "./contexts/BalanceContext": {
        BalanceProvider: ({ children }) => children,
        useBalanceContext: () => ({}),
      },
      "./utils/balance-helper": {
        normalizeTokenAddresses: () => [],
        buildTokenMulticallContracts: () => [],
        setTokenBalancesLoading: () => ({}),
        parseTokenMulticallResults: () => ({}),
        getChainNativeSymbol: () => "ETH",
      },
      "@tanstack/react-query": {
        QueryClient: class {},
        QueryClientProvider: (p) => p.children,
      },
    });

    shallowRender(React.createElement(ProviderModule.PoolzProvider, null, React.createElement("div")));
    assert.strictEqual(wagmiMock.useConfig(), configModule.config);
  });
});
