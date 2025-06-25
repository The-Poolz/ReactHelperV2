import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as allChains from "viem/chains";

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

  const toTs = (value) => JSON.stringify(value, null, 2).replace(/"([^"\n]+)":/g, "$1:");

  const chainsContent = `export const poolzChains = ${toTs(chains)} as const;\n`;
  const walletsContent = `export const poolzWallets = ${toTs(wallets)} as const;\n`;

  const chainsFile = path.join(outDir, "poolzChains.ts");
  const walletsFile = path.join(outDir, "poolzWallets.ts");

  await writeFile(chainsFile, chainsContent);
  await writeFile(walletsFile, walletsContent);

  console.log(`Wrote chains to ${chainsFile}`);
  console.log(`Wrote wallets to ${walletsFile}`);

  // Update src/wagmi.ts to use the latest Poolz chains
  const chainIdToName = {};
  for (const [name, chain] of Object.entries(allChains)) {
    if (typeof chain === "object" && "id" in chain) {
      chainIdToName[chain.id] = name;
    }
  }

  const chainNames = chains.map((id) => chainIdToName[id]).filter(Boolean);

  if (chainNames.length) {
    const wagmiFile = path.resolve(__dirname, "../src/wagmi.ts");
    let wagmiContent = await readFile(wagmiFile, "utf8");
    wagmiContent = wagmiContent.replace(
      /import {[^}]+} from "wagmi\/chains";/,
      `import { ${chainNames.join(", ")} } from "wagmi/chains";`,
    );
    wagmiContent = wagmiContent.replace(
      /chains: \[[^\]]+\], ?\/\/poolz main chain/,
      `chains: [${chainNames.join(", ")}], //poolz chains`,
    );
    await writeFile(wagmiFile, wagmiContent);
    console.log(`Updated ${wagmiFile}`);
  } else {
    console.warn("No matching chain definitions found to update wagmi.ts");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
