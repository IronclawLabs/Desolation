import sdkInstance from 'api';
import web3, { Connection, GetVersionedTransactionConfig, TransactionResponse } from "@solana/web3.js"

export const fetchTxSignature = async (txHash: string): Promise<TransactionResponse|undefined> => {
    try {
        const connection = new Connection(
            `https://rpc.hellomoon.io/${process.env.HELLO_MOON_API_KEY}`, // REPLACE process.env.HELLOMOON_API_KEY with your 
            "confirmed"
          );
          const config: GetVersionedTransactionConfig = {
            commitment: "confirmed",
            maxSupportedTransactionVersion: 100
        };
        
        const res =  await connection.getTransaction(txHash, config);
        console.log(res);
        return res
        
    } catch (err) {
        console.log(err);
        return undefined
       
    }
};
