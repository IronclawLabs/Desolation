'use client'

import WalletButton from '@/components/WalletButton'
import {putCreateUser} from '@/services/putCreateUser'
import {CacheProvider} from '@chakra-ui/next-js'
import {Center, ChakraProvider, Heading, VStack} from '@chakra-ui/react'
import {useAnchorWallet, useConnection, useWallet} from '@solana/wallet-adapter-react'
import Cookies from "js-cookie"
import {useEffect, useState} from 'react'
import Login from "@/layouts/Login"

export function UserProvider({
                               children
                             }: {
  children: React.ReactNode
}) {
  const {publicKey, connected, signIn} = useWallet()
  //do we need to sign in externally ?
  const [signedIn, setSignedIn] = useState(false)
  useEffect(() => {

    const temp = async () => {
      console.log(connected)
      if (!signIn || signedIn || !connected) return
      console.log("connected")
      try {
        // const signInDetails = await signIn()
        // const a = await putCreateUser(signInDetails.account.address)
        //Cookies.set('user_jwt', token, { expires: 1 });
        setSignedIn(true)
      } catch (error) {
        console.log(error)

      }


    }
    temp()


  }), [signedIn]

  return (
    (!connected) ? (
      <Login/>
    ) : (
      <>
        {children}
      </>
    )

  )
}