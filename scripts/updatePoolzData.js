import { writeFile } from "node:fs/promises";
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
  const content =
    `export const poolzChains = ${JSON.stringify(chains, null, 2)} as const;\n` +
    `export const poolzWallets = ${JSON.stringify(wallets, null, 2)} as const;\n`;
  const outFile = path.resolve(__dirname, "../src/poolzData.ts");
  await writeFile(outFile, content);
  console.log(`Wrote data to ${outFile}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
