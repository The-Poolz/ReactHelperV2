// This script generates TypeScript types for contract names and function names from ABI files.
// Run this script to update types when ABI changes.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const abiDir = path.resolve(__dirname, '../generated/abi');
const outFile = path.resolve(__dirname, '../src/contracts/contractTypes.ts');

const files = fs.readdirSync(abiDir).filter(f => f.endsWith('.ts'));

const contractTypes = [];
const abiImports = [];
const abiMapEntries = [];

for (const file of files) {
  const contractName = file.replace('.ts', '');
  const abiFilePath = path.join(abiDir, file);
  const abiContent = fs.readFileSync(abiFilePath, 'utf8');
  const match = abiContent.match(/export const \w+Abi = (\[[\s\S]*?\]) as const;/);
  if (!match) continue;

  const abi = JSON.parse(match[1]);
  const functions = abi.filter((item) => item.type === 'function').map((item) => item.name);
  const uniqueFunctions = Array.from(new Set(functions));
  contractTypes.push(`export type ${contractName}FunctionName =${uniqueFunctions.map(fn => `\n  | '${fn}'`).join('')};`);

  abiImports.push(`import { ${contractName}Abi } from "../../generated/abi/${contractName}";`);
  abiMapEntries.push(`  ${contractName}: typeof ${contractName}Abi;`);
}

const contractNames = files.map(f => f.replace('.ts', ''));
const contractNameUnion = contractNames.map(name => `'${name}'`).join(' | ');

// Generate a mapping type: ContractFunctionNameMap
const contractFunctionNameMapEntries = contractNames.map(
  name => `  ${name}: ${name}FunctionName;`
).join('\n');

const content = `// AUTO-GENERATED FILE. DO NOT EDIT.
// Run scripts/generateContractTypes.js to update.

${contractTypes.join('\n\n')}

export type ContractName = ${contractNameUnion};

export type ContractFunctionNameMap = {
${contractFunctionNameMapEntries}
};

export type ContractFunctionName<T extends ContractName = ContractName> =
  T extends keyof ContractFunctionNameMap ? ContractFunctionNameMap[T] : never;

// ABI type mappings for type-safe contract interactions
${abiImports.join('\n')}

export type ContractAbiMap = {
${abiMapEntries.join('\n')}
};

export type ContractAbi<T extends ContractName> = T extends keyof ContractAbiMap ? ContractAbiMap[T] : never;
`;

fs.writeFileSync(outFile, content);
console.log('Generated contract types with ABI mappings!');
