export const SimpleBuilderAbi = [
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
    "name": "FailedInnerCall",
    "type": "error",
    "inputs": []
  },
  {
    "name": "InvalidParamsLength",
    "type": "error",
    "inputs": [
      {
        "name": "paramsLength",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "minLength",
        "type": "uint256",
        "internalType": "uint256"
      }
    ]
  },
  {
    "name": "InvalidProviderType",
    "type": "error",
    "inputs": []
  },
  {
    "name": "InvalidUserLength",
    "type": "error",
    "inputs": []
  },
  {
    "name": "NoZeroAddress",
    "type": "error",
    "inputs": []
  },
  {
    "name": "NoZeroAmount",
    "type": "error",
    "inputs": []
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
    "name": "MassPoolsCreated",
    "type": "event",
    "inputs": [
      {
        "name": "token",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "provider",
        "type": "address",
        "indexed": true,
        "internalType": "contract IProvider"
      },
      {
        "name": "firstPoolId",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "userLength",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "name": "acceptFirewallAdmin",
    "type": "function",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "buildMassPools",
    "type": "function",
    "inputs": [
      {
        "name": "addressParams",
        "type": "address[]",
        "internalType": "address[]"
      },
      {
        "name": "userData",
        "type": "tuple",
        "components": [
          {
            "name": "userPools",
            "type": "tuple[]",
            "components": [
              {
                "name": "user",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "amount",
                "type": "uint256",
                "internalType": "uint256"
              }
            ],
            "internalType": "struct BuilderState.UserPool[]"
          },
          {
            "name": "totalAmount",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "internalType": "struct BuilderState.Builder"
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
    "outputs": [],
    "stateMutability": "nonpayable"
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
    "name": "onERC721Received",
    "type": "function",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "",
        "type": "bytes",
        "internalType": "bytes"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bytes4",
        "internalType": "bytes4"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "name": "safeFunctionCall",
    "type": "function",
    "inputs": [
      {
        "name": "target",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "targetPayload",
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
    "name": "setApprovedTarget",
    "type": "function",
    "inputs": [
      {
        "name": "target",
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
  }
] as const;
