"use client"
import { VStack, Heading, Center, Text, Box, Button } from "@chakra-ui/react"
import Cookies from "js-cookie"
import { formatAddress } from '@mysten/sui.js/utils';
import { DynamicWidget } from "@dynamic-labs/sdk-react";

const MainMenu = () => {

  // Cookie expires in 7 days


  return (

    <>

      <VStack mt={"4rem"} h={"100%"} spacing={0}>
        <VStack>
          <DynamicWidget></DynamicWidget>
         

        </VStack>
      </VStack>
    </>
  )

}

export default MainMenu