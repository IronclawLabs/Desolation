"use client"
import React, { useEffect, useState } from 'react';
import LoginDiscordButton from '../../components/LoginDiscordButton';
import { Box, Center, Heading, Text, VStack } from '@chakra-ui/react';
import { FaDiscord } from 'react-icons/fa';

export default function Info() {

  return (
    <>
      <Box display="flex"  mt={"5rem"} alignItems="center"
        justifyContent="center" // Center vertically
        textAlign="center" flexDir="column" paddingBottom={"10%"} >
        <VStack  maxW={"90%"} className='outer-panel' p={10} bg={"main"}>
        <FaDiscord size={"4rem"} />
        <Heading as="h2" size="xl" mb={4}>
          You Are Not Logged In!
        </Heading>


        <LoginDiscordButton></LoginDiscordButton>
        </VStack>
      </Box>


    </>
  );
}