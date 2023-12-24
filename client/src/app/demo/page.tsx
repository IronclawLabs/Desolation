"use client"
import { postValidateTokenPayment } from "@/services/payment/postValidatePayment";
import { postWithdrawToken } from "@/services/payment/postWithdrawToken";
import { Button, Center, Heading, VStack } from "@chakra-ui/react"
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { TOKEN_PROGRAM_ID, createTransferInstruction } from "@solana/spl-token";

import { useCallback, useState } from "react";
import { PublicKey, Transaction } from "@solana/web3.js";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { getTokenPaymentRecepit } from "@/services/payment/getTokenPaymentReceipt";
import WalletButton from "@/components/WalletButton";
import { WalletConnectButton } from "@solana/wallet-adapter-react-ui";

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
    
        return(

                                <VStack gap={2}>
                                        <WalletButton></WalletButton>
                                        <input
                                                type="number"
                                                value={number}
                                                onChange={(e) => setNumber(parseFloat(e.target.value))}
                                                className=" text-black"
                                        />
                                        <Button color={"white"} onClick={async () =>{
                                                if(!publicKey) return;
                                                const txSig = (await sendToken());
                                                postValidateTokenPayment(txSig,publicKey?.toBase58())
                                                }}>deposit token</Button>

                                <input
                                        type="number"
                                        value={number2}
                                        onChange={(e) => setNumber2(parseFloat(e.target.value))}
                                        className=" text-black"
                                        />
                                <Button color={"white"}  onClick={() =>{
                                        if(!publicKey) return;
                                        postWithdrawToken(publicKey?.toBase58(),number2)
                                } }>withdraw token</Button>
                        </VStack>)
                                
                                

                                
    }

    export default App
