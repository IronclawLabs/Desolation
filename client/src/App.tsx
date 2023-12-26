//@ts-nocheck
//TODO: fix typescript errors
"use client"
import {VStack} from '@chakra-ui/react'

import {createContext, ReactNode, useEffect, useRef, useState} from "react"
import {useWallet} from "@solana/wallet-adapter-react"
import {globalHelper} from "@components/room.tsx"
import GlobalMap from "@/layouts/Map.tsx"
import Login from "@/layouts/Login.tsx"
import {staticGlobal} from "@/init.ts"


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
    <GlobalStateContext.Provider value={{globalState, setGlobal}}>
      {children}
    </GlobalStateContext.Provider>
  )
}

export default function App() {
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


  return <GlobalStateProvider>
    {globalHelper.shouldLoadMap ?
      <VStack>
        <GlobalMap/>

      </VStack> : <Login/>}
  </GlobalStateProvider>
}
