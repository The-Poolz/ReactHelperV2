import assert from "node:assert";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { describe, it } from "node:test";

async function getChainIdsFromContracts() {
  const indexContent = await readFile(path.join("src", "contracts", "index.ts"), "utf8");
  const match = indexContent.match(/contractsByChain:\s*{([\s\S]*?)} as const;/);
  if (!match) throw new Error("Unable to parse contractsByChain");
  return Array.from(match[1].matchAll(/(\d+):/g)).map((m) => Number(m[1]));
}

describe("Poolz configuration", () => {
  it("has contracts for each chain in contractsByChain", async () => {
    const chains = await getChainIdsFromContracts();
    const indexContent = await readFile(path.join("src", "contracts", "index.ts"), "utf8");
    for (const id of chains) {
      assert.match(indexContent, new RegExp(`\\b${id}:`), `Missing mapping for chain ${id}`);
    }
  });

  it("has a file for each chain", async () => {
    const chains = await getChainIdsFromContracts();
    const files = await readdir(path.join("src", "contracts"));
    for (const id of chains) {
      assert.ok(files.includes(`chain${id}.ts`), `Missing file chain${id}.ts`);
    }
  });
});
