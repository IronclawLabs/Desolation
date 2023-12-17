import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import './loading.scss'
import './navs.scss'
import './menus.scss'
import {WalletProvider} from '@solana/wallet-adapter-react'
import {SolWallet} from '../context/SolWallet'
import {UIProvider} from '@/context/UIProvider'
import {UserProvider} from '@/context/UserProvider'
import Loading from "@components/loading"


const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {


  return (
    <html lang="en">
    <body className={inter.className}>
    <SolWallet>
      <UIProvider>
        {children}
      </UIProvider>
    </SolWallet>
    </body>

    </html>
  )
}
