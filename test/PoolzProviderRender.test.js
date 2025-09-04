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
  it("renders children and passes props to BalanceProvider", () => {
    const wagmiMock = {};
    let receivedConfig;
    wagmiMock.WagmiProvider = ({ config, children }) => {
      receivedConfig = config;
      return children;
    };

    let receivedBalanceProps;
    const BalanceProviderMock = ({ children, tokenAddresses, refreshInterval }) => {
      receivedBalanceProps = { tokenAddresses, refreshInterval };
      return children;
    };

    const PoolzAppProviderMock = ({ children }) => children;

    const commonMocks = {
      wagmi: wagmiMock,
      react: React,
    };

    const configModule = { config: { test: true } };
    const ProviderModule = compileTs(path.join("src", "PoolzProvider.tsx"), {
      ...commonMocks,
      "./wagmi": configModule,
      "./contexts/BalanceContext": {
        BalanceProvider: BalanceProviderMock,
        useBalanceContext: () => ({}),
      },
      "./contexts/PoolzAppContext": {
        PoolzAppProvider: PoolzAppProviderMock,
      },
      "@tanstack/react-query": {
        QueryClient: class {},
        QueryClientProvider: (p) => p.children,
      },
    });

    const testTokenAddresses = ["0x123", "0x456"];
    const testRefreshInterval = 5000;
    const child = React.createElement("div", { id: "test-child" });
    shallowRender(
      React.createElement(
        ProviderModule.PoolzProvider,
        { tokenAddresses: testTokenAddresses, refreshInterval: testRefreshInterval },
        child
      )
    );
    assert.deepStrictEqual(receivedBalanceProps, {
      tokenAddresses: testTokenAddresses,
      refreshInterval: testRefreshInterval,
    });
    assert.strictEqual(receivedConfig, configModule.config);
  });
});
