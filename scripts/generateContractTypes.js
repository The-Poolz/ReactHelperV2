// This script generates TypeScript types for contract names and function names from ABI files.
// Run this script to update types when ABI changes.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const abiDir = path.resolve(__dirname, '../generated/abi');
const outFile = path.resolve(__dirname, '../src/contracts/contractTypes.ts');

const files = fs.readdirSync(abiDir).filter(f => f.endsWith('.json'));

const contractTypes = [];

for (const file of files) {
  const contractName = file.replace('.json', '');
  const abi = JSON.parse(fs.readFileSync(path.join(abiDir, file), 'utf8'));
  const functions = abi.filter((item) => item.type === 'function').map((item) => item.name);
  const uniqueFunctions = Array.from(new Set(functions));
  contractTypes.push(`export type ${contractName}FunctionName =${uniqueFunctions.map(fn => `\n  | '${fn}'`).join('')};`);
}

const contractNames = files.map(f => f.replace('.json', ''));
const contractNameUnion = contractNames.map(name => `'${name}'`).join(' | ');

const contractFunctionNameUnion = files.map(f => f.replace('.json', 'FunctionName')).join(' | ');

// Generate a mapping type: ContractFunctionNameMap
const contractFunctionNameMapEntries = contractNames.map(
  name => `  ${name}: ${name}FunctionName;`
).join('\n');

const content = `// AUTO-GENERATED FILE. DO NOT EDIT.\n// Run scripts/generateContractTypes.ts to update.\n\n${contractTypes.join('\n\n')}\n\nexport type ContractName = ${contractNameUnion};\n\nexport type ContractFunctionNameMap = {\n${contractFunctionNameMapEntries}\n};\n\nexport type ContractFunctionName<T extends ContractName = ContractName> =\n  T extends keyof ContractFunctionNameMap ? ContractFunctionNameMap[T] : never;\n`;

fs.writeFileSync(outFile, content);
console.log('Generated contract types!');
