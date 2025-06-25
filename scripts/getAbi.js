import { spawn } from "node:child_process";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
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
  const baseName = contract.NameVersion.split("@")[0];
  const outFile = path.join(outDir, `${baseName}.json`);
  await writeFile(outFile, `${JSON.stringify(contract.ABI, null, 2)}\n`);
  console.log(`Wrote ABI to ${outFile}`);

  const wagmiConfig = path.resolve(__dirname, `../generated/${baseName}.wagmi.config.js`);
  const contractsDir = path.resolve(__dirname, "../generated/contracts");
  await mkdir(contractsDir, { recursive: true });
  const wagmiOutFile = `generated/contracts/${baseName}.ts`;
  const wagmiConfigContent = `import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'
import abi from './abi/${baseName}.json' assert { type: 'json' }

export default defineConfig({
  out: '${wagmiOutFile}',
  contracts: [{ name: '${baseName}', abi }],
  plugins: [react()],
})
`;
  await writeFile(wagmiConfig, wagmiConfigContent);
  const require = createRequire(import.meta.url);
  const wagmiCli = require.resolve("@wagmi/cli/dist/esm/cli.js");
  await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [wagmiCli, "generate", "--config", wagmiConfig], { stdio: "inherit" });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`wagmi exited with code ${code}`));
    });
  });
  await unlink(wagmiConfig).catch(() => {});
  console.log(`Wrote wagmi contract to ${path.join(contractsDir, `${baseName}.ts`)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
