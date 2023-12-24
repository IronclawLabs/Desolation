import {
    Connection,
    Keypair,
    SystemProgram,
    LAMPORTS_PER_SOL,
    Transaction,
    sendAndConfirmTransaction,
    PublicKey,
  } from "@solana/web3.js";
  import * as bs58 from "bs58";

const sendSol = async (
    recipient: string,
    amountInSol: number,
  ) => {
    const priceInSelectedChain = amountInSol
    const connection = new Connection(
      `https://rpc.hellomoon.io/${process.env.HELLO_MOON_API_KEY}`, // REPLACE process.env.HELLOMOON_API_KEY with your API key
      "confirmed"
    );
  
    const paymentVaultKeypair = Keypair.fromSecretKey(
      bs58.decode(process.env.PAYMENT_VAULT)
    );
  
    const receiver = new PublicKey(recipient);
  
  
    const transferTransaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: paymentVaultKeypair.publicKey,
        toPubkey: receiver,
        lamports: Math.round(priceInSelectedChain * LAMPORTS_PER_SOL),
      })
    );
  
    const signature = await sendAndConfirmTransaction(
      connection,
      transferTransaction,
      [paymentVaultKeypair]
    );
  
    return signature;
  };


  export default sendSol