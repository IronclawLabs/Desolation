"use client"
import { postValidateTokenPayment } from "@/services/payment/postValidatePayment";
import { postWithdrawToken } from "@/services/payment/postWithdrawToken";
import { Button, VStack } from "@chakra-ui/react"
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { TOKEN_PROGRAM_ID, createTransferInstruction } from "@solana/spl-token";

import { useCallback, useEffect, useState } from "react";
import { PublicKey, Transaction } from "@solana/web3.js";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { getTokenPaymentRecepit } from "@/services/payment/getTokenPaymentReceipt";
import WalletButton from "@/components/WalletButton";
import { putCreateUser } from "@/services/putCreateUser";

const App = () => {
        const [number, setNumber] = useState(0);
        const [number2, setNumber2] = useState(0);
        const { connection } = useConnection();
        const { publicKey, sendTransaction } = useWallet();
    
        const sendToken = useCallback(async () => {
            if (!publicKey) throw new WalletNotConnectedError();
                const {vault_wallet} =await getTokenPaymentRecepit()
            const transaction = new Transaction().add(
                createTransferInstruction(
                    publicKey,
                    new PublicKey(vault_wallet),//vualt wallet token account
                    publicKey,
                    1,
                    [],
                    TOKEN_PROGRAM_ID
                )
            );
    
            const signature = await sendTransaction(transaction, connection);
    
            const result = await connection.confirmTransaction(signature, "processed");
            return signature;
        }, [publicKey, sendTransaction, connection]);

        useEffect(()=>{
                const temp = async ()=>{
                        if(!publicKey) return;
                        putCreateUser(publicKey?.toBase58());
                }
                temp();

        },[publicKey])
    
        return(

                               <></>)
                                
                                

                                
    }

    export default App
