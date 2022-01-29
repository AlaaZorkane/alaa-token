export type RegistrarIDL =
{
  "version": "0.1.0",
  "name": "registrar",
  "instructions": [
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
      "name": "AlreadyRegistered",
      "msg": "This account is already registered"
    }
  ]
}
;
export const RegistrarJSON: RegistrarIDL =
{
  "version": "0.1.0",
  "name": "registrar",
  "instructions": [
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
      "name": "AlreadyRegistered",
      "msg": "This account is already registered"
    }
  ]
}
;
import { generateErrorMap } from '@saberhq/anchor-contrib';
export const RegistrarErrors = generateErrorMap(RegistrarJSON);
