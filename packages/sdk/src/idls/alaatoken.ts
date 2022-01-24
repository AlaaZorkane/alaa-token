export type AlaatokenIDL =
{
  "version": "0.1.0",
  "name": "alaatoken",
  "instructions": [
    {
      "name": "setup",
      "accounts": [
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "wallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "reset",
      "accounts": [
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initialMint",
      "accounts": [
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "register",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bump",
          "type": "u8"
        },
        {
          "name": "login",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "VaultAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "initialMintAmount",
            "type": "u64"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "wallet",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "isSetup",
            "type": "bool"
          },
          {
            "name": "isMinted",
            "type": "bool"
          },
          {
            "name": "isFreezed",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "UserAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "login",
            "type": "string"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "createdAt",
            "type": "i64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "NoAlaa",
      "msg": "No usage of the word alaa >:("
    },
    {
      "code": 6001,
      "name": "TooLong",
      "msg": "Max 16 characters!"
    },
    {
      "code": 6002,
      "name": "AlreadyInitialized",
      "msg": "Token already initialized!"
    },
    {
      "code": 6003,
      "name": "AlreadyMinted",
      "msg": "Max supply already minted."
    },
    {
      "code": 6004,
      "name": "NotInitialized",
      "msg": "Token not initialized."
    },
    {
      "code": 6005,
      "name": "NotRoot",
      "msg": "Invalid root key!"
    },
    {
      "code": 6006,
      "name": "NotWalletOwner",
      "msg": "Invalid PDA wallet owner!"
    }
  ]
}
;
export const AlaatokenJSON: AlaatokenIDL =
{
  "version": "0.1.0",
  "name": "alaatoken",
  "instructions": [
    {
      "name": "setup",
      "accounts": [
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "wallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "reset",
      "accounts": [
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initialMint",
      "accounts": [
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "register",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bump",
          "type": "u8"
        },
        {
          "name": "login",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "VaultAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "initialMintAmount",
            "type": "u64"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "wallet",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "isSetup",
            "type": "bool"
          },
          {
            "name": "isMinted",
            "type": "bool"
          },
          {
            "name": "isFreezed",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "UserAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "login",
            "type": "string"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "createdAt",
            "type": "i64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "NoAlaa",
      "msg": "No usage of the word alaa >:("
    },
    {
      "code": 6001,
      "name": "TooLong",
      "msg": "Max 16 characters!"
    },
    {
      "code": 6002,
      "name": "AlreadyInitialized",
      "msg": "Token already initialized!"
    },
    {
      "code": 6003,
      "name": "AlreadyMinted",
      "msg": "Max supply already minted."
    },
    {
      "code": 6004,
      "name": "NotInitialized",
      "msg": "Token not initialized."
    },
    {
      "code": 6005,
      "name": "NotRoot",
      "msg": "Invalid root key!"
    },
    {
      "code": 6006,
      "name": "NotWalletOwner",
      "msg": "Invalid PDA wallet owner!"
    }
  ]
}
;
import { generateErrorMap } from '@saberhq/anchor-contrib';
export const AlaatokenErrors = generateErrorMap(AlaatokenJSON);
