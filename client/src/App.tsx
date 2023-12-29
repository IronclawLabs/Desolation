//@ts-nocheck
//TODO: fix typescript errors
import {Button, Heading, VStack} from '@chakra-ui/react'

import {createContext, ReactNode, useEffect, useRef, useState} from "react"
import {useWallet} from "@solana/wallet-adapter-react"
import {globalHelper} from "@components/room.tsx"
import GlobalMap from "@/layouts/Map.tsx"
import Login from "@/layouts/Login.tsx"
import {staticGlobal} from "@/init.ts"
import {CookiesProvider} from "react-cookie"
import WalletButton from './components/WalletButton'
import { postWithdrawToken } from './services/payment/postWithdrawToken'
import { postValidateTokenPayment } from './services/payment/postValidatePayment'
import { putCreateUser } from './services/putCreateUser'
import { getDbUser } from './services/getDbUser'


// const helperObj : {currentZone: any, previousZone: any} = {
//   currentZone : null,
//   previousZone: null
// }

export const GlobalStateContext = createContext()


export const requireAsset = async (source) => {
  return await import(source)
}

const GlobalStateProvider = ({children}: { children: ReactNode }) => {

  const [globalState, setGlobalState] = useState({
    currentModal: ""
  })
  const globalStateRef = useRef(globalState)
  globalStateRef.current = globalState

  const setGlobal = function (change: { [key: string]: never }) {
    setGlobalState(prev => {
      return {...prev, ...change}
    })
  }

  return (
    <CookiesProvider defaultSetOptions={{path: '/'}}>
      <GlobalStateContext.Provider value={{globalState, setGlobal}}>
        {children}
      </GlobalStateContext.Provider>
    </CookiesProvider>
  )
}

export default function App() {

  //Test Proposes
  const [number, setNumber] = useState(0);
  const [number2, setNumber2] = useState(0);
  staticGlobal.assets = import.meta.glob('/src/assets/**/*.*', {eager: true})
  const {publicKey, connected, signIn} = useWallet()
  useEffect(() => {
    globalHelper.connected = connected
  }, [connected])

  const [ticker, setTicker] = useState(0)

  useEffect(() => {
    setInterval(() => {
      if (!globalHelper.shouldLoadMap) setTicker(prev => prev + 1)
    }, 100)
  }, [ticker])

  useEffect(()=>{
    const temp = async ()=>{
            console.log("geldim aga");

            if(!publicKey) return;
            putCreateUser(publicKey?.toBase58());
    }
    temp();

},[publicKey])

  return <>
  <Heading>asdads</Heading>
   <VStack gap={2}>
       <WalletButton></WalletButton>
       <Button onClick={async ()=>{


        const a = await getDbUser();
        console.log(a);


       }}>sdfsdf</Button>
       <input
               type="number"
               value={number}
               onChange={(e) => setNumber(parseFloat(e.target.value))}
               className=" text-black"
       />
       <Button color={"white"} onClick={async () =>{
               if(!publicKey) return;
               const txSig = "asd"//(await sendToken());
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
</VStack>
  </>



  /*<GlobalStateProvider>
    {globalHelper.shouldLoadMap ?
      <VStack>
        <GlobalMap/>

      </VStack> :

      // <Login/>
    }
  </GlobalStateProvider>*/
}
