import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import vm from "node:vm";
import ts from "typescript";

function compileTs(modulePath, mocks = {}) {
  const code = fs.readFileSync(modulePath, "utf8");
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

describe("useTransaction", () => {
  it("throws when no wallet is connected", async () => {
    let called = false;
    const mocks = {
      wagmi: {
        useWriteContract: () => ({
          writeContractAsync: async () => {
            called = true;
          },
        }),
        usePublicClient: () => ({ waitForTransactionReceipt: async () => {} }),
        useAccount: () => ({ address: undefined }),
      },
      "@tanstack/react-query": { useMutation: (opts) => opts },
      "../contracts": { usePoolzContractInfo: () => ({ smcAddress: "0x1", abi: [] }) },
    };
    const mod = compileTs(path.join("src", "hooks", "useTransaction.ts"), mocks);
    const { mutationFn } = mod.useTransaction();
    await assert.rejects(
      () => mutationFn({ chainId: 1, contractName: "test", functionName: "fn", args: [] }),
      /Wallet not connected/,
    );
    assert.strictEqual(called, false);
  });
});
