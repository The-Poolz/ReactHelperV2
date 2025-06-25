import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as allChains from "viem/chains";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const query = `query Contract {
  latestType {
    Version {
      ContractType {
        ContractType
      }
      ContractVersion {
        ABI
      }
    }
  }
  contractsOnChains {
    Chain {
      chainId
    }
    Contracts {
      Address
      ContractType {
        ContractType
      }
    }
  }
}`;

async function fetchPoolzData() {
  const res = await fetch("https://data.poolz.finance/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  if (!res.ok) {
    throw new Error(`Unexpected response ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  return json.data;
}

function toVar(name) {
  const v = name.replace(/[^a-zA-Z0-9_$]/g, "_");
  return /^[a-zA-Z_$]/.test(v) ? v : `_${v}`;
}

function toTs(value) {
  return JSON.stringify(value, null, 2).replace(/"([^"\n]+)":/g, "$1:");
}

async function main() {
  const data = await fetchPoolzData();

  const abiDir = path.resolve(__dirname, "../generated/abi");
  await mkdir(abiDir, { recursive: true });

  const abis = {};
  for (const item of data.latestType ?? []) {
    const name = item.Version.ContractType.ContractType;
    const abi = item.Version.ContractVersion.ABI;
    abis[name] = abi;
    await writeFile(path.join(abiDir, `${name}.json`), `${JSON.stringify(abi, null, 2)}\n`);
  }

  const chains = [];
  const contractsByChain = {};
  for (const entry of data.contractsOnChains ?? []) {
    const id = entry.Chain.chainId;
    chains.push(id);
    const map = contractsByChain[id] || {};
    for (const c of entry.Contracts ?? []) {
      map[c.ContractType.ContractType] = c.Address;
    }
    contractsByChain[id] = map;
  }

  const outDir = path.resolve(__dirname, "../generated");
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, "poolzChains.ts"), `export const poolzChains = ${toTs(chains)} as const;\n`);

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
      /chains: \[[^\]]+\], ?\/\/poolz chains/,
      `chains: [${chainNames.join(", ")}], //poolz chains`,
    );
    await writeFile(wagmiFile, wagmiContent);
    console.log(`Updated ${wagmiFile}`);
  }

  const contractsDir = path.resolve(__dirname, "../src/contracts");
  await mkdir(contractsDir, { recursive: true });
  for (const [chainId, contracts] of Object.entries(contractsByChain)) {
    const imports = [];
    const entries = [];
    for (const [name, address] of Object.entries(contracts)) {
      const varName = `${toVar(name)}Abi`;
      imports.push(`import ${varName} from "../../generated/abi/${name}.json" assert { type: "json" };`);
      entries.push(`  ${toVar(name)}: { address: "${address}", abi: ${varName} }`);
    }
    const content = `${imports.join("\n")}\n\nexport const chain${chainId}Contracts = {\n${entries.join(",\n")}\n} as const;\n`;
    await writeFile(path.join(contractsDir, `chain${chainId}.ts`), content);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
