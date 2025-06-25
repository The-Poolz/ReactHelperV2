import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const query = `query Chain($sort: [String]) {
  chains {
    chainId
  }
  defaultWallets(sort: $sort) {
    Icon {
      url
    }
    Link
    Name
  }
}`;

async function fetchPoolzData() {
  const res = await fetch("https://data.poolz.finance/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: { sort: "order" } }),
  });
  if (!res.ok) {
    throw new Error(`Unexpected response ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  return json.data;
}

async function main() {
  const data = await fetchPoolzData();
  const chains = data.chains.map((c) => c.chainId);
  const wallets = data.defaultWallets.map((w) => ({
    name: w.Name,
    link: w.Link,
    iconUrl: w.Icon.url,
  }));

  const outDir = path.resolve(__dirname, "../generated");
  await mkdir(outDir, { recursive: true });

  const chainsContent = `export const poolzChains = ${JSON.stringify(chains, null, 2)} as const;\n`;
  const walletsContent = `export const poolzWallets = ${JSON.stringify(wallets, null, 2)} as const;\n`;

  const chainsFile = path.join(outDir, "poolzChains.ts");
  const walletsFile = path.join(outDir, "poolzWallets.ts");

  await writeFile(chainsFile, chainsContent);
  await writeFile(walletsFile, walletsContent);

  console.log(`Wrote chains to ${chainsFile}`);
  console.log(`Wrote wallets to ${walletsFile}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
