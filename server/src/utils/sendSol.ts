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
      "https://autumn-bold-market.solana-mainnet.discover.quiknode.pro/751f1fb6d3293954183cd89f16bfab596f3ecc72",
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