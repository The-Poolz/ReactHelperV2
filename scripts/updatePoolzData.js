import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as allChains from "viem/chains";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const query = `query Contract($pagination: PaginationArg) {
  latestType {
    Version(pagination: $pagination) {
      ContractType {
        ContractType
      }
      ContractVersion {
        NameVersion
        ABI
      }
    }
  }
  contractsOnChains(pagination: $pagination) {
    RPC
    Explorer
    Decimals
    Chain {
      chainId
      name
      symbol
    }
    Contracts(pagination: $pagination) {
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
    body: JSON.stringify({ query, variables: { pagination: { limit: 1000 } } }),
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

  const abiDir = path.resolve(__dirname, "../src/generated/abi");
  await mkdir(abiDir, { recursive: true });

  const latestTypes = Array.isArray(data.latestType) ? data.latestType : data.latestType ? [data.latestType] : [];
  for (const item of latestTypes) {
    if (!item || !item.Version) continue;
    const versions = Array.isArray(item.Version) ? item.Version : [item.Version];
    for (const version of versions) {
      if (!version || !version.ContractType || !version.ContractVersion) continue;
      const name = version.ContractType.ContractType;
      const abi = version.ContractVersion.ABI;
      if (!name || !abi) continue;
      await writeFile(path.join(abiDir, `${name}.ts`), `export const ${name}Abi = ${JSON.stringify(abi, null, 2)} as const;\n`);
    }
  }

  const chains = [];
  const contractsByChain = {};
  const customChains = {};
  const contractEntries = Array.isArray(data.contractsOnChains)
    ? data.contractsOnChains
    : data.contractsOnChains
      ? [data.contractsOnChains]
      : [];
  for (const entry of contractEntries) {
    if (!entry || !entry.Chain) continue;
    const id = entry.Chain.chainId;
    if (id == null) continue;
    chains.push(id);

    customChains[id] = {
      id,
      name: entry.Chain.name || `Chain unknown`,
      decimals: entry.Decimals || 18,
      symbol: entry.Chain.symbol || 'unknown',
      rpcUrls: [entry.RPC] || [],
      blockExplorers: [entry.Explore] || []
    };

    const map = contractsByChain[id] || {};
    const cList = Array.isArray(entry.Contracts) ? entry.Contracts : entry.Contracts ? [entry.Contracts] : [];
    for (const c of cList) {
      if (!c || !c.ContractType) continue;
      const typeName = c.ContractType.ContractType;
      const address = c.Address;
      // Find matching version info
      let nameVersion = undefined;
      // Search latestTypes for matching contract type
      for (const item of latestTypes) {
        if (!item || !item.Version) continue;
        const versions = Array.isArray(item.Version) ? item.Version : [item.Version];
        for (const version of versions) {
          if (!version || !version.ContractType || !version.ContractVersion) continue;
          if (version.ContractType.ContractType === typeName) {
            nameVersion = version.ContractVersion.NameVersion;
            break;
          }
        }
        if (nameVersion) break;
      }
      if (!typeName || !address) continue;
      map[typeName] = { address, nameVersion };
    }
    contractsByChain[id] = map;
  }

  const outDir = path.resolve(__dirname, "../src/generated");
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, "poolzChains.ts"), `export const poolzChains = ${toTs(chains)} as const;\n`);

  // Update src/wagmi.ts to use the latest Poolz chains
  const chainIdToName = {};
  for (const [name, chain] of Object.entries(allChains)) {
    if (typeof chain === "object" && "id" in chain) {
      chainIdToName[chain.id] = name;
    }
  }

  const existingChainNames = [];
  const missingChains = [];

  for (const id of chains) {
    if (chainIdToName[id]) {
      existingChainNames.push(chainIdToName[id]);
    } else {
      missingChains.push(id);
    }
  }

  // Create custom chain configs for missing chains
  let customChainConfigs = '';
  const customChainNames = [];

  if (missingChains.length > 0) {
    const customConfigs = missingChains.map(id => {
      const chainInfo = customChains[id];
      const chainName = `customChain${id}`;
      customChainNames.push(chainName);

      return `export const ${chainName} = {
  id: ${id},
  name: "${chainInfo.name}",
  nativeCurrency: {
    decimals: ${chainInfo.decimals || 18},
    name: "${chainInfo.symbol}",
    symbol: "${chainInfo.symbol}",
  },
  rpcUrls: {
    default: {
      http: ${JSON.stringify(chainInfo.rpcUrls.length > 0 ? chainInfo.rpcUrls : [`https://rpc-${id}.example.com`])},
    },
  },
  blockExplorers: {
    default: {
      name: "${chainInfo.name} Scan",
      url: "${chainInfo.blockExplorers?.[0] || `https://explorer-${id}.example.com`}",
    },
  },
} as const;`;
    }).join('\n\n');

    customChainConfigs = `\n// Custom chain configs for chains not available in viem/chains\n${customConfigs}\n`;
  }

  const allChainNames = [...existingChainNames, ...customChainNames];
  const uniqueChainNames = [...new Set(allChainNames)];

  if (uniqueChainNames.length) {
    const wagmiFile = path.resolve(__dirname, "../src/wagmi.ts");
    let wagmiContent = await readFile(wagmiFile, "utf8");

    // Remove existing custom chain configs to avoid duplicates (but keep imports)
    const customChainRegex = /\/\/ Custom chain configs for chains not available in viem\/chains[\s\S]*?(?=\ntype WalletConfig)/g;
    wagmiContent = wagmiContent.replace(customChainRegex, '\n');

    // Ensure viem/chains import exists and update it
    const viemChainsImportRegex = /import {[^}]*} from "wagmi\/chains";/;
    if (existingChainNames.length > 0) {
      const newImport = `import { ${[...new Set(existingChainNames)].join(", ")} } from "wagmi/chains";`;
      if (viemChainsImportRegex.test(wagmiContent)) {
        wagmiContent = wagmiContent.replace(viemChainsImportRegex, newImport);
      } else {
        // Add import after connectors import
        wagmiContent = wagmiContent.replace(
          /(import.*from "wagmi\/connectors";)/,
          `$1\n${newImport}`
        );
      }
    }

    // Add custom chain configs after connectors import
    if (customChainConfigs) {
      wagmiContent = wagmiContent.replace(
        /(import.*from "wagmi\/connectors";\s*)/,
        `$1${customChainConfigs}\n`
      );
    }

    // Update chains array
    wagmiContent = wagmiContent.replace(
      /chains: \[[^\]]+\], ?\/\/poolz chains/,
      `chains: [${uniqueChainNames.join(", ")}], //poolz chains`,
    );
    await writeFile(wagmiFile, wagmiContent);
    console.log(`Updated ${wagmiFile}`);
  }

  const contractsDir = path.resolve(__dirname, "../src/contracts");
  await mkdir(contractsDir, { recursive: true });
  const indexImports = [];
  const indexEntries = [];
  for (const [chainId, contracts] of Object.entries(contractsByChain)) {
    const imports = [];
    const entries = [];
    for (const [name, contractInfo] of Object.entries(contracts)) {
      const varName = `${name}Abi`;
      imports.push(`import { ${varName} } from "../generated/abi/${name}";`);
      const nameVersionStr = contractInfo.nameVersion ? `, nameVersion: ${JSON.stringify(contractInfo.nameVersion)}` : '';
      entries.push(`  ${toVar(name)}: { address: "${contractInfo.address}", abi: ${varName}${nameVersionStr} }`);
    }
    const content = `${imports.join("\n")}\n\nexport const chain${chainId}Contracts = {\n${entries.join(",\n")}\n} as const;\n`;
    await writeFile(path.join(contractsDir, `chain${chainId}.ts`), content);
    indexImports.push(`import { chain${chainId}Contracts } from "./chain${chainId}";`);
    indexEntries.push(`  ${chainId}: chain${chainId}Contracts`);
  }

  const chainContractTypes = Object.keys(contractsByChain)
    .map(chainId => `typeof chain${chainId}Contracts`)
    .join(" | ");

  const indexContent = `${indexImports.sort().join("\n")}

export type ChainContracts = ${chainContractTypes};

export const contractsByChain: { [chainId: number]: ChainContracts } = {
${indexEntries.sort().join(",\n")}
} as const;

export type ContractsByChain = typeof contractsByChain;
`;
  await writeFile(path.join(contractsDir, "index.ts"), indexContent);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
