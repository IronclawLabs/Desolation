"use client"
import { WalletModalProvider, WalletMultiButton, WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';
import React from 'react';

interface Props {
    name: string;
}

const WalletButton = () => {
    return (
        <>
            <WalletMultiButton />
            <WalletDisconnectButton />
        </>
    );
};

export default WalletButton;

