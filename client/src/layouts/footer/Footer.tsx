"use client"
import {
    Box,
    chakra,
    Container,
    Heading,
    Stack,
    Text,
    useColorModeValue,
    VisuallyHidden,
  } from '@chakra-ui/react';
  import { Link } from '@chakra-ui/next-js';
  import { FaDiscord, FaInstagram, FaTwitter } from 'react-icons/fa';
  import { ReactNode } from 'react';
import links from '@/data/links';
  
  const SocialButton = ({
    children,
    label,
    href,
  }: {
    children: ReactNode;
    label: string;
    href: string;
  }) => {
    return (
      <chakra.button
        bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
        rounded={'full'}
        w={8}
        h={8}
        cursor={'pointer'}
        as={'a'}
        href={href}
        display={'inline-flex'}
        alignItems={'center'}
        justifyContent={'center'}
        transition={'background 0.3s ease'}
        _hover={{
          bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
        }}>
        <VisuallyHidden>{label}</VisuallyHidden>
        {children}
      </chakra.button>
    );
  };
  
  export default function Footer() {
    return (
      <Box
        borderTopWidth={"2px"}
        borderColor={"secondLight"}
        bg={"main"}
        maxW={"100%"}
        color={"white"}>
          
        <Box
          borderTopWidth={3}
          borderStyle={'solid'}
          borderColor={"secondLight"}>
          <Container
            as={Stack}
            minW={'90vw'}
            py={4}
            direction={{ base: 'column', md: 'row' }}
            spacing={4}
            justify={{ base: 'center', md: 'space-between' }}
            align={{ base: 'center', md: 'center' }}>
            <Text textAlign={"center"} minW={"20rem"} >© 2023 xxx . All rights reserved</Text>
            <Text fontSize={"lg"} >Made with ❤️
            by <Link fontWeight={"semibold"} href={"https://twitter.com/alperr_sol"} textColor={"magenta"}>alper.sol</Link></Text>
            <Stack justifyContent={"center"} minW={"20rem"} direction={'row'} spacing={6}>
              <SocialButton label={'Twitter'} href={links.twitter}>
                <FaTwitter />
              </SocialButton>
              <SocialButton label={'Discord'} href={links.discord}>
                <FaDiscord />
              </SocialButton>
              <SocialButton label={'Instagram'} href={'#'}>
                <FaInstagram />
              </SocialButton>
            </Stack>
          </Container>
        </Box>
      </Box>
    );
  }