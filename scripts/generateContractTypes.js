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

const contractReadSchemas = [];
const contractWriteSchemas = [];
const contractReturnTypes = [];
const abiImports = [];
const abiMapEntries = [];
const contractMapEntries = [];

// Helper function to convert Solidity type to TypeScript type
function solidityToTSType(solidityType, components = null) {
  // Handle tuple[] specifically first (before general array handling)
  if (solidityType === 'tuple[]' && components) {
    // Handle array of tuples with components
    const tupleFields = components.map(comp => {
      const fieldType = solidityToTSType(comp.type, comp.components);
      return comp.name ? `${comp.name}: ${fieldType}` : fieldType;
    }).join('; ');
    return `{ ${tupleFields} }[]`;
  }
  if (solidityType === 'tuple' && components) {
    // Handle tuple type with components
    const tupleFields = components.map(comp => {
      const fieldType = solidityToTSType(comp.type, comp.components);
      return comp.name ? `${comp.name}: ${fieldType}` : fieldType;
    }).join('; ');
    return `{ ${tupleFields} }`;
  }
  // Handle other array types
  if (solidityType.endsWith('[]')) {
    const baseType = solidityType.slice(0, -2);
    return `${solidityToTSType(baseType)}[]`;
  }
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
  // Default fallback
  return 'any';
}

// Helper function to generate function args type
function generateArgsType(inputs) {
  if (inputs.length === 0) return 'readonly []';

  const args = inputs.map(input => {
    const tsType = solidityToTSType(input.type, input.components);
    return input.name ? `${input.name}: ${tsType}` : tsType;
  }).join(', ');

  return `readonly [${args}]`;
}

// Helper function to generate return type
function generateReturnType(outputs) {
  if (!outputs || outputs.length === 0) return 'void';

  if (outputs.length === 1) {
    return solidityToTSType(outputs[0].type, outputs[0].components);
  }

  return `[${outputs.map(output => solidityToTSType(output.type, output.components)).join(', ')}]`;
}

// Helper function to check if function is read-only
function isReadOnlyFunction(func) {
  return func.stateMutability === 'view' ||
         func.stateMutability === 'pure' ||
         func.stateMutability === 'constant';
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

  const readFunctionEntries = [];
  const writeFunctionEntries = [];
  const returnTypeEntries = [];

  Object.entries(functionsByName).forEach(([funcName, funcs]) => {
    // Determine if function is read-only based on state mutability
    const isReadOnly = funcs.every(func => isReadOnlyFunction(func));

    // Get return type
    const returnType = generateReturnType(funcs[0].outputs);

    if (funcs.length === 1) {
      // Single function, no overloads
      const func = funcs[0];
      const argsType = generateArgsType(func.inputs || []);

      if (isReadOnly) {
        readFunctionEntries.push(`    '${funcName}': ${argsType};`);
      } else {
        writeFunctionEntries.push(`    '${funcName}': ${argsType};`);
      }

      returnTypeEntries.push(`    '${funcName}': ${returnType};`);
    } else {
      // Multiple overloads - use union type
      const overloadTypes = funcs.map(func => generateArgsType(func.inputs || []));
      const unionType = overloadTypes.join(' | ');

      if (isReadOnly) {
        readFunctionEntries.push(`    '${funcName}': ${unionType};`);
      } else {
        writeFunctionEntries.push(`    '${funcName}': ${unionType};`);
      }

      returnTypeEntries.push(`    '${funcName}': ${returnType};`);
    }
  });

  contractReadSchemas.push(`  ${contractName}: {\n${readFunctionEntries.join('\n')}\n  };`);
  contractWriteSchemas.push(`  ${contractName}: {\n${writeFunctionEntries.join('\n')}\n  };`);
  contractReturnTypes.push(`  ${contractName}: {\n${returnTypeEntries.join('\n')}\n  };`);

  abiImports.push(`import { ${contractName}Abi } from "../generated/abi/${contractName}";`);
  abiMapEntries.push(`  ${contractName}: typeof ${contractName}Abi;`);
  contractMapEntries.push(contractName);
}

const contractNames = contractMapEntries;
const contractNamesConst = `export const contractNames = [${contractNames.map(name => `'${name}'`).join(', ')}] as const;`;

const content = `// AUTO-GENERATED FILE. DO NOT EDIT.
// Run scripts/generateContractTypes.js to update.

// Read-only functions
export type ContractReadSchemas = {
${contractReadSchemas.join('\n')}
};

// Write functions (state-changing)
export type ContractWriteSchemas = {
${contractWriteSchemas.join('\n')}
};

// Function return types
export type ContractReturnTypes = {
${contractReturnTypes.join('\n')}
};

${contractNamesConst}

export type ContractName = typeof contractNames[number];

// Utility types extracted from schemas
export type ContractReadFunctionName<T extends ContractName> = keyof ContractReadSchemas[T];
export type ContractWriteFunctionName<T extends ContractName> = keyof ContractWriteSchemas[T];

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
