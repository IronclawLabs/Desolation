import {setVisible, useWalletModal} from '@solana/wallet-adapter-react-ui';
import {useConnection, useWallet} from '@solana/wallet-adapter-react';

import styles from '/styles/login-lightbox.module.scss'
import {WalletDisconnectButton, WalletMultiButton} from "@solana/wallet-adapter-react-ui";
import TypeEffect from "@/components/type-effect";
import {useEffect} from "react";

export default function LoginLightbox() {

    const {setVisible} = useWalletModal();
    const {connection} = useConnection();
    const {publicKey, sendTransaction} = useWallet();

    console.log(connection);

    const connect = () => {
        setVisible(true)
    }

    return (
        <section className={styles.loginLightbox}>
            <div className={styles.modalContent}>


                <pre className={styles.typer}>
                    <TypeEffect/>
                </pre>

                <div className={styles.head}>
                    Please Connect Your Wallet
                </div>

                {/*
                 <WalletMultiButton/>
                 <WalletDisconnectButton/>
                 */}
                <button type="button" onClick={connect} className={styles.connectButton}>Connect Wallet</button>

            </div>
        </section>
    )
}