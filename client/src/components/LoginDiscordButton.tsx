"use client";
import links from "../data/links";
import Image from "next/image"
import { Button } from "@chakra-ui/react";
// Use require instead of import since order matters


const LoginDiscordButton = () => {

        
        return (
      
        <>
        <Button
        colorScheme="teal"
        bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
        variant="solid"
        type="submit"
        onClick={() => {
          window.location.assign(links.discord_login);
        }}
        >
          
       Login With Discord
      </Button>
        </>
    
                
    );
};

export default LoginDiscordButton;