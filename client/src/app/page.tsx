"use client"
import WalletButton from '@/components/WalletButton'
import { SolWallet } from '@/context/SolWallet'
import { Button, Center, Heading, VStack } from '@chakra-ui/react'
import Image from 'next/image'

export default function Home() {
  return (
    <Center>
      <VStack>
      <Heading>sdfsd</Heading>
    <WalletButton></WalletButton>
      <Button onClick={async ()=>{
        //  const a = await putCreateUser("dsas");
        //  Cookies.set('user_jwt', token, { expires: 1 });
        // console.log(a);
        
      }}></Button>
      </VStack>
    </Center>
  )
}
