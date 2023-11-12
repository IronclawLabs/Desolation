import WalletButton from '@/components/WalletButton'
import { SolWallet } from '@/context/SolWallet'
import { Center, VStack } from '@chakra-ui/react'
import Image from 'next/image'

export default function Home() {
  return (
    <Center>
    <WalletButton></WalletButton>
    </Center>
  )
}
