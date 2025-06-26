import assert from "node:assert";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { describe, it } from "node:test";

async function parsePoolzChains() {
  const file = await readFile(path.join("generated", "poolzChains.ts"), "utf8");
  const match = file.match(/\[(.*)\]/s);
  if (!match) throw new Error("Unable to parse poolzChains");
  return match[1]
    .split(/,\s*/)
    .map((v) => Number(v))
    .filter((v) => !Number.isNaN(v));
}

describe("Poolz configuration", () => {
  it("has contracts for each chain in poolzChains", async () => {
    const chains = await parsePoolzChains();
    const indexContent = await readFile(path.join("src", "contracts", "index.ts"), "utf8");
    for (const id of chains) {
      assert.match(indexContent, new RegExp(`\\b${id}:`), `Missing mapping for chain ${id}`);
    }
  });

  it("has a file for each chain", async () => {
    const chains = await parsePoolzChains();
    const files = await readdir(path.join("src", "contracts"));
    for (const id of chains) {
      assert.ok(files.includes(`chain${id}.ts`), `Missing file chain${id}.ts`);
    }
  });
});
