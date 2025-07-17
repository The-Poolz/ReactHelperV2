export const DispenserProviderAbi = [
  {
    "type": "constructor",
    "inputs": [
      {
        "name": "_lockDealNFT",
        "type": "address",
        "internalType": "contract ILockDealNFT"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "name": "AddressEmptyCode",
    "type": "error",
    "inputs": [
      {
        "name": "target",
        "type": "address",
        "internalType": "address"
      }
    ]
  },
  {
    "name": "AmountMustBeGreaterThanZero",
    "type": "error",
    "inputs": []
  },
  {
    "name": "CallerNotApproved",
    "type": "error",
    "inputs": [
      {
        "name": "caller",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "receiver",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "poolId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ]
  },
  {
    "name": "ECDSAInvalidSignature",
    "type": "error",
    "inputs": []
  },
  {
    "name": "ECDSAInvalidSignatureLength",
    "type": "error",
    "inputs": [
      {
        "name": "length",
        "type": "uint256",
        "internalType": "uint256"
      }
    ]
  },
  {
    "name": "ECDSAInvalidSignatureS",
    "type": "error",
    "inputs": [
      {
        "name": "s",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ]
  },
  {
    "name": "FailedCall",
    "type": "error",
    "inputs": []
  },
  {
    "name": "InvalidShortString",
    "type": "error",
    "inputs": []
  },
  {
    "name": "InvalidSignature",
    "type": "error",
    "inputs": [
      {
        "name": "poolId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "receiver",
        "type": "address",
        "internalType": "address"
      }
    ]
  },
  {
    "name": "InvalidTime",
    "type": "error",
    "inputs": [
      {
        "name": "currentTime",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "validUntil",
        "type": "uint256",
        "internalType": "uint256"
      }
    ]
  },
  {
    "name": "NotEnoughTokensInPool",
    "type": "error",
    "inputs": [
      {
        "name": "requestedAmount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "availableAmount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ]
  },
  {
    "name": "StringTooLong",
    "type": "error",
    "inputs": [
      {
        "name": "str",
        "type": "string",
        "internalType": "string"
      }
    ]
  },
  {
    "name": "TokensAlreadyTaken",
    "type": "error",
    "inputs": [
      {
        "name": "poolId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "receiver",
        "type": "address",
        "internalType": "address"
      }
    ]
  },
  {
    "name": "ZeroParamsLength",
    "type": "error",
    "inputs": []
  },
  {
    "name": "EIP712DomainChanged",
    "type": "event",
    "inputs": [],
    "anonymous": false
  },
  {
    "name": "FirewallAdminUpdated",
    "type": "event",
    "inputs": [
      {
        "name": "newAdmin",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "name": "FirewallUpdated",
    "type": "event",
    "inputs": [
      {
        "name": "newFirewall",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "name": "PoolCreated",
    "type": "event",
    "inputs": [
      {
        "name": "poolId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "provider",
        "type": "address",
        "indexed": true,
        "internalType": "contract ISimpleProvider"
      }
    ],
    "anonymous": false
  },
  {
    "name": "TokensDispensed",
    "type": "event",
    "inputs": [
      {
        "name": "poolId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "user",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "amountTaken",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "leftAmount",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "name": "UpdateParams",
    "type": "event",
    "inputs": [
      {
        "name": "poolId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "params",
        "type": "uint256[]",
        "indexed": false,
        "internalType": "uint256[]"
      }
    ],
    "anonymous": false
  },
  {
    "name": "BUILDER_TYPEHASH",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "MESSAGE_TYPEHASH",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "acceptFirewallAdmin",
    "type": "function",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "createNewPool",
    "type": "function",
    "inputs": [
      {
        "name": "addresses",
        "type": "address[]",
        "internalType": "address[]"
      },
      {
        "name": "params",
        "type": "uint256[]",
        "internalType": "uint256[]"
      },
      {
        "name": "signature",
        "type": "bytes",
        "internalType": "bytes"
      }
    ],
    "outputs": [
      {
        "name": "poolId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "name": "currentParamsTargetLength",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "dispenseLock",
    "type": "function",
    "inputs": [
      {
        "name": "message",
        "type": "tuple",
        "components": [
          {
            "name": "poolId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "receiver",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "validUntil",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "data",
            "type": "tuple[]",
            "components": [
              {
                "name": "simpleProvider",
                "type": "address",
                "internalType": "contract ISimpleProvider"
              },
              {
                "name": "params",
                "type": "uint256[]",
                "internalType": "uint256[]"
              }
            ],
            "internalType": "struct IDispenserProvider.Builder[]"
          }
        ],
        "internalType": "struct IDispenserProvider.MessageStruct"
      },
      {
        "name": "signature",
        "type": "bytes",
        "internalType": "bytes"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "eip712Domain",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "fields",
        "type": "bytes1",
        "internalType": "bytes1"
      },
      {
        "name": "name",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "version",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "chainId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "verifyingContract",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "salt",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "extensions",
        "type": "uint256[]",
        "internalType": "uint256[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "firewallAdmin",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "getParams",
    "type": "function",
    "inputs": [
      {
        "name": "poolId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "params",
        "type": "uint256[]",
        "internalType": "uint256[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "getSubProvidersPoolIds",
    "type": "function",
    "inputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "poolIds",
        "type": "uint256[]",
        "internalType": "uint256[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "getWithdrawableAmount",
    "type": "function",
    "inputs": [
      {
        "name": "poolId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "isTaken",
    "type": "function",
    "inputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "lockDealNFT",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "contract ILockDealNFT"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "name",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "string",
        "internalType": "string"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "poolIdToAmount",
    "type": "function",
    "inputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "registerPool",
    "type": "function",
    "inputs": [
      {
        "name": "poolId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "params",
        "type": "uint256[]",
        "internalType": "uint256[]"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "safeFunctionCall",
    "type": "function",
    "inputs": [
      {
        "name": "vennPolicy",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "vennPolicyPayload",
        "type": "bytes",
        "internalType": "bytes"
      },
      {
        "name": "data",
        "type": "bytes",
        "internalType": "bytes"
      }
    ],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "name": "setApprovedVennPolicy",
    "type": "function",
    "inputs": [
      {
        "name": "vennPolicy",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "status",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "setApprovedVennPolicyFee",
    "type": "function",
    "inputs": [
      {
        "name": "fee",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "setFirewall",
    "type": "function",
    "inputs": [
      {
        "name": "_firewall",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "setFirewallAdmin",
    "type": "function",
    "inputs": [
      {
        "name": "_firewallAdmin",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "split",
    "type": "function",
    "inputs": [
      {
        "name": "oldPoolId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "newPoolId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "ratio",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "supportsInterface",
    "type": "function",
    "inputs": [
      {
        "name": "interfaceId",
        "type": "bytes4",
        "internalType": "bytes4"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "withdraw",
    "type": "function",
    "inputs": [
      {
        "name": "poolId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "withdrawnAmount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "isFinal",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "name": "withdraw",
    "type": "function",
    "inputs": [
      {
        "name": "poolId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "withdrawnAmount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "isFinal",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "nonpayable"
  }
] as const;
