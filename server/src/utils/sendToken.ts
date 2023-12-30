import { createTransferInstruction, getAssociatedTokenAddress } from "@solana/spl-token";
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

const sendToken = async (
    recipient_ata: PublicKey,
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
  
  
    console.log("paymentVaultKeypair.publicKey",paymentVaultKeypair.publicKey.toBase58());
    console.log("amountInSol",amountInSol);
    
    
    
    
    const transaction = new Transaction().add(
      createTransferInstruction(
        new PublicKey(process.env.TOKEN_VAULT_ATA),
        recipient_ata,
        paymentVaultKeypair.publicKey,
        amountInSol * 10 ** 9,
        []
      )
    );
  
    const signature = await sendAndConfirmTransaction(
      connection,
      transaction,
      [paymentVaultKeypair]
    );
  
    return signature;
  };


  export default sendToken