import { ConfirmedTransactionMeta, TokenBalance, TransactionResponse } from "@solana/web3.js";

const getGivenTokenBalance =  (transaction: TransactionResponse):Number => {
    let preBalance = 0;
    let postBalance = 0;
  transaction.meta.preTokenBalances.forEach((el:TokenBalance)=>{
    if(el.accountIndex == 1 && el.mint == process.env.TOKEN_MINT && el.owner == process.env.TOKEN_VAULT){
        preBalance = el.uiTokenAmount.uiAmount
    }
  })
  
  transaction.meta.postTokenBalances.forEach((el:TokenBalance)=>{
    if(el.accountIndex == 1 && el.mint == process.env.TOKEN_MINT && el.owner == process.env.TOKEN_VAULT){
        postBalance = el.uiTokenAmount.uiAmount
    }
    })
    if(postBalance < preBalance) throw new Error("Something went wrong")
return postBalance - preBalance
}
            
/*
{ 
  "blockTime": 1698352305,
  "meta": {
    "computeUnitsConsumed": 29272,
    "err": null,
    "fee": 6600,
    "innerInstructions": [
      {
        "index": 3,
        "instructions": [
          {
            "accounts": [
              4
            ],
            "data": "84eT",
            "programIdIndex": 10,
            "stackHeight": 2
          },
          {
            "accounts": [
              0,
              1
            ],
            "data": "11119os1e9qSs2u7TsThXqkBSRVFxhmYaFKFZ1waB2X7armDmvK3p5GmLdUxYdg3h7QSrL",
            "programIdIndex": 3,
            "stackHeight": 2
          },
          {
            "accounts": [
              1
            ],
            "data": "P",
            "programIdIndex": 10,
            "stackHeight": 2
          },
          {
            "accounts": [
              1,
              4
            ],
            "data": "6WRFinNSiZSw8upE29rb5zFyVp1qKc7LbHbP76y1iPeaP",
            "programIdIndex": 10,
            "stackHeight": 2
          }
        ]
      }
    ],
    "loadedAddresses": {
      "readonly": [],
      "writable": []
    },
    "logMessages": [
      "Program ComputeBudget111111111111111111111111111111 invoke [1]",
      "Program ComputeBudget111111111111111111111111111111 success",
      "Program ComputeBudget111111111111111111111111111111 invoke [1]",
      "Program ComputeBudget111111111111111111111111111111 success",
      "Program DeJBGdMFa1uynnnKiwrVioatTuHmNLpyFKnmB5kaFdzQ invoke [1]",
      "Program DeJBGdMFa1uynnnKiwrVioatTuHmNLpyFKnmB5kaFdzQ consumed 578 of 199700 compute units",
      "Program DeJBGdMFa1uynnnKiwrVioatTuHmNLpyFKnmB5kaFdzQ success",
      "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL invoke [1]",
      "Program log: Create",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
      "Program log: Instruction: GetAccountDataSize",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 1622 of 192030 compute units",
      "Program return: TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA pQAAAAAAAAA=",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Initialize the associated token account",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
      "Program log: Instruction: InitializeImmutableOwner",
      "Program log: Please upgrade to SPL Token 2022 for immutable owner support",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 1405 of 185390 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
      "Program log: Instruction: InitializeAccount3",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4241 of 181506 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL consumed 22195 of 199122 compute units",
      "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL success",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [1]",
      "Program log: Instruction: TransferChecked",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 6199 of 176927 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success"
    ],
    "postBalances": [
      973266360,
      2039280,
      2039280,
      1,
      1461600,
      0,
      731913600,
      1,
      1141440,
      1009200,
      934087680
    ],
    "postTokenBalances": [
      {
        "accountIndex": 1,
        "mint": "7NNxY736adC5k25zj7KRyCdFQQ1RS4o6YaV9yWw5eemx",
        "owner": "AHZ3rAuvGbfJeL8W4hPkWHY7K8FWCN4tagDFcPKu6W9R",
        "programId": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        "uiTokenAmount": {
          "amount": "2000000000",
          "decimals": 9,
          "uiAmount": 2,
          "uiAmountString": "2"
        }
      },
      {
        "accountIndex": 2,
        "mint": "7NNxY736adC5k25zj7KRyCdFQQ1RS4o6YaV9yWw5eemx",
        "owner": "AQ25wmRfPCso8b8FmUNbTxJKmkhmngwN8yP1Kg7kX84B",
        "programId": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        "uiTokenAmount": {
          "amount": "24998000000000",
          "decimals": 9,
          "uiAmount": 24998,
          "uiAmountString": "24998"
        }
      }
    ],
    "preBalances": [
      975312240,
      0,
      2039280,
      1,
      1461600,
      0,
      731913600,
      1,
      1141440,
      1009200,
      934087680
    ],
    "preTokenBalances": [
      {
        "accountIndex": 2,
        "mint": "7NNxY736adC5k25zj7KRyCdFQQ1RS4o6YaV9yWw5eemx",
        "owner": "AQ25wmRfPCso8b8FmUNbTxJKmkhmngwN8yP1Kg7kX84B",
        "programId": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        "uiTokenAmount": {
          "amount": "25000000000000",
          "decimals": 9,
          "uiAmount": 25000,
          "uiAmountString": "25000"
        }
      }
    ],
    "rewards": [],
    "status": {
      "Ok": null
    }
  },
  "slot": 253891059,
  "transaction": {
    "message": {
      "header": {
        "numReadonlySignedAccounts": 0,
        "numReadonlyUnsignedAccounts": 8,
        "numRequiredSignatures": 1
      },
      "accountKeys": [
        "AQ25wmRfPCso8b8FmUNbTxJKmkhmngwN8yP1Kg7kX84B",
        "68DXniPuj16c8ruwKFaPtQZFgWw6wJfZgoi4NtCf9iiJ",
        "TT7YHUxu6aKqRYsMukdvRHoLovK7B8Cfd6SB7YkEr3h",
        "11111111111111111111111111111111",
        "7NNxY736adC5k25zj7KRyCdFQQ1RS4o6YaV9yWw5eemx",
        "AHZ3rAuvGbfJeL8W4hPkWHY7K8FWCN4tagDFcPKu6W9R",
        "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
        "ComputeBudget111111111111111111111111111111",
        "DeJBGdMFa1uynnnKiwrVioatTuHmNLpyFKnmB5kaFdzQ",
        "SysvarRent111111111111111111111111111111111",
        "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
      ],
      "recentBlockhash": "2w9tp4i7w74VvVLLt9xNW6nyeJstvMSzfVq2GTfeJCst",
      "instructions": [
        {
          "accounts": [],
          "data": "3QBcnUb9zKM9",
          "programIdIndex": 7,
          "stackHeight": null
        },
        {
          "accounts": [],
          "data": "Fj2Eoy",
          "programIdIndex": 7,
          "stackHeight": null
        },
        {
          "accounts": [
            5
          ],
          "data": "11111111111111111111111111111111",
          "programIdIndex": 8,
          "stackHeight": null
        },
        {
          "accounts": [
            0,
            1,
            5,
            4,
            3,
            10,
            9
          ],
          "data": "",
          "programIdIndex": 6,
          "stackHeight": null
        },
        {
          "accounts": [
            2,
            4,
            1,
            0
          ],
          "data": "g7NkLW3SMdjWG",
          "programIdIndex": 10,
          "stackHeight": null
        }
      ],
      "indexToProgramIds": {}
    },
    "signatures": [
      "5yGqv7zNjxi3npATXHkrgyENS2e9T2sgz4og5bHg2xtGWd7nzfnVxXBedX4fkJgM3e9EAuyTGnLwN7v2y5Riddtu"
    ]
  },
  "version": "legacy"
}*/


export default getGivenTokenBalance