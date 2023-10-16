"use client"
import theme from '@/assets/theme'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/provider'

export const UIProvider = ({children}:any) =>{

    return(
        <CacheProvider>
        <ChakraProvider theme={theme}>
          {children}
        </ChakraProvider>
      </CacheProvider>
    )
}