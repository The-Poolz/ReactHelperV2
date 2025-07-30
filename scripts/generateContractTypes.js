// This script generates TypeScript types for contract names and function names from ABI files.
// Run this script to update types when ABI changes.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const abiDir = path.resolve(__dirname, '../src/generated/abi');
const outFile = path.resolve(__dirname, '../src/contracts/contractTypes.ts');

const files = fs.readdirSync(abiDir).filter(f => f.endsWith('.ts'));

const contractSchemas = [];
const abiImports = [];
const abiMapEntries = [];
const contractMapEntries = [];

// Helper function to convert Solidity type to TypeScript type
function solidityToTSType(solidityType) {
  if (solidityType.startsWith('uint') || solidityType.startsWith('int')) {
    return 'bigint';
  }
  if (solidityType === 'address') {
    return '`0x${string}`';
  }
  if (solidityType === 'bool') {
    return 'boolean';
  }
  if (solidityType === 'string') {
    return 'string';
  }
  if (solidityType === 'bytes' || solidityType.startsWith('bytes')) {
    return '`0x${string}`';
  }
  if (solidityType.endsWith('[]')) {
    const baseType = solidityType.slice(0, -2);
    return `${solidityToTSType(baseType)}[]`;
  }
  // Default fallback
  return 'any';
}

for (const file of files) {
  const contractName = file.replace('.ts', '');
  const abiFilePath = path.join(abiDir, file);
  const abiContent = fs.readFileSync(abiFilePath, 'utf8');
  const match = abiContent.match(/export const \w+Abi = (\[[\s\S]*?\]) as const;/);
  if (!match) continue;

  const abi = JSON.parse(match[1]);
  const functions = abi.filter((item) => item.type === 'function');
  const functionsByName = {};

  // Group functions by name (handle overloads)
  functions.forEach(func => {
    if (!functionsByName[func.name]) {
      functionsByName[func.name] = [];
    }
    functionsByName[func.name].push(func);
  });

  const functionEntries = [];
  Object.entries(functionsByName).forEach(([funcName, funcs]) => {
    if (funcs.length === 1) {
      // Single function, no overloads
      const func = funcs[0];
      const inputs = func.inputs || [];
      if (inputs.length === 0) {
        functionEntries.push(`    '${funcName}': readonly [];`);
      } else {
        const args = inputs.map(input => {
          const tsType = solidityToTSType(input.type);
          return input.name ? `${input.name}: ${tsType}` : tsType;
        }).join(', ');
        functionEntries.push(`    '${funcName}': readonly [${args}];`);
      }
    } else {
      // Multiple overloads - use union type
      const overloadTypes = funcs.map(func => {
        const inputs = func.inputs || [];
        if (inputs.length === 0) {
          return 'readonly []';
        }
        const args = inputs.map(input => {
          const tsType = solidityToTSType(input.type);
          return input.name ? `${input.name}: ${tsType}` : tsType;
        }).join(', ');
        return `readonly [${args}]`;
      });
      functionEntries.push(`    '${funcName}': ${overloadTypes.join(' | ')};`);
    }
  });

  contractSchemas.push(`  ${contractName}: {\n${functionEntries.join('\n')}\n  };`);

  abiImports.push(`import { ${contractName}Abi } from "../generated/abi/${contractName}";`);
  abiMapEntries.push(`  ${contractName}: typeof ${contractName}Abi;`);
  contractMapEntries.push(contractName);
}

const contractNames = contractMapEntries;
const contractNamesConst = `export const contractNames = [${contractNames.map(name => `'${name}'`).join(', ')}] as const;`;

const content = `// AUTO-GENERATED FILE. DO NOT EDIT.
// Run scripts/generateContractTypes.js to update.

// Contract schemas with function names and args combined
export type ContractSchemas = {
${contractSchemas.join('\n')}
};

${contractNamesConst}

export type ContractName = typeof contractNames[number];

// Utility types extracted from schemas
export type ContractFunctionName<T extends ContractName> = keyof ContractSchemas[T];

export type ContractFunctionArgs<
  T extends ContractName,
  F extends ContractFunctionName<T>
> = ContractSchemas[T][F];

import { Abi } from "viem";
// ABI mappings
${abiImports.join('\n')}

export type ContractAbiMap = {
${abiMapEntries.join('\n')}
};

export type ContractAbi<T extends ContractName> = T extends keyof ContractAbiMap ? ContractAbiMap[T] : Abi;
`;

fs.writeFileSync(outFile, content);
console.log('Generated contract types with ABI mappings and contractNames!');
