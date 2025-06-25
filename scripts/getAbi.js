import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const query =
  "query Contract($documentId: ID!) {\n" +
  "  contract(documentId: $documentId) {\n" +
  "    ABI\n" +
  "    NameVersion\n" +
  "  }\n" +
  "}";

async function fetchContract(documentId) {
  const res = await fetch("https://data.poolz.finance/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: { documentId } }),
  });
  if (!res.ok) {
    throw new Error(`Unexpected response ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  if (json.errors) {
    throw new Error(JSON.stringify(json.errors));
  }
  return json.data.contract;
}

async function main() {
  const id = process.argv[2];
  if (!id) {
    console.error("Usage: get-abi <documentId>");
    process.exit(1);
  }

  const contract = await fetchContract(id);
  if (!contract) {
    throw new Error(`Contract not found for id ${id}`);
  }

  const outDir = path.resolve(__dirname, "../generated/abi");
  await mkdir(outDir, { recursive: true });
  const outFile = path.join(outDir, `${contract.NameVersion}.json`);
  await writeFile(outFile, `${JSON.stringify(contract.ABI, null, 2)}\n`);
  console.log(`Wrote ABI to ${outFile}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
