"use client"
import { ReactNode, useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  List,
  Text,
  Heading
} from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js'
import { HamburgerIcon, CloseIcon, AddIcon,StarIcon, UnlockIcon } from '@chakra-ui/icons';
import { DbUser, DiscordUser } from '../../../../types/myTypes';
import { useRouter } from 'next/navigation';
import { FaCoins, FaDiscord, FaTwitter, FaUser } from 'react-icons/fa';
import Searchbar from './Searchbar';
import "./navbar.css"
import Image from 'next/image';
import logoImg from "@/public/logoimg.svg"
import links from '@/data/links';
import { logout } from '@/services/logout';
import {BiLogoDiscord, BiLogoDiscordAlt, BiSolidChess}  from "react-icons/bi"
import { GiCultist } from 'react-icons/gi';


const Links = [{title:'Discord',link:links.discord,icon:<BiLogoDiscordAlt size={"1.3rem"}/>}, {title:'Twitter',link:links.twitter,icon:<FaTwitter size={"1.3rem"}/>}, {title:'Profile',link:links.profile,icon:<FaUser size={"1.1rem"}/>}];

const NavLink = ({ children }:any) => (
  <Link
  fontSize={{base:"md",lg:"lg"}}
  fontWeight={"semibold"}
  py={1}
  px={2}
  rounded={'md'}
  _hover={{
    textDecoration: 'none',
    bg: "secondLight",
  }}
  href={children.link}>
    <HStack spacing={1}>
      {children.icon}
      <Text>

    {children.title}
      </Text>
  </HStack>
  </Link>
);


export default function NavbarMain() {
  const { isOpen, onOpen, onClose } = useDisclosure();


  return (
    <>
      <Box className="topbar">
      <Text  fontWeight={"semibold"}>
        Join our  <Link as={"span"} href={links.discord} textDecoration={"underline"} _hover={{ color: "themeBlue" }}>
        Discord
</Link>
!
      </Text>
    </Box>
      <Box style={{borderBottomWidth:"2px"}} borderBottomColor={"secondLight"} bg={"main"} maxW={"100%"}  px={4} py={1}>
        <Flex h={16} padding={{base:0, lg:10}} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            bg={ "transparent"}
            _hover={{
              bg: "mainDark",
            }}
            color={"white"}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={{base:5,lg:5}} alignItems={'center'}>
            <Link
            textDecor={"none"}
            href={"/"}
            style={{textDecoration:"none"}}
            >
  
          <Box display={{base:"none",md:"flex"}}  >
            <HStack>
            {/* <Image width={40} className="logoWhite" src={logoImg} alt='fs'></Image> */}
            <Heading size={{base:"md",lg:"lg"}} className=''>XXX</Heading>
            </HStack>
            </Box>
  
            </Link>
            <HStack
              as={'nav'}
              spacing={2}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link.title}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Link href={links.buy_su}>

            <Button
              variant={'solid'}
              colorScheme={'orange'}
              size={'sm'}
              mr={4}
              fontSize={"sm"}
              h={"2rem"}
              borderRadius={"5px"}

              leftIcon={< StarIcon/>}>
              Apply!
            </Button>
            </Link>

            {false? (<>
              
             
              <Menu  >

<MenuList color={"black"} >

<Link href={links.profile}><MenuItem >Profile  </MenuItem></Link>
<Link href={links.gameboard}> <MenuItem >Gameboard   </MenuItem></Link>
<Link href={links.cults}>  <MenuItem >Cults</MenuItem></Link>  
<Link href={links.buy_su} color={"themeBlue"} > <MenuItem >Buy SU  </MenuItem></Link>
  <MenuDivider />
  <Link href={"/"}onClick={ async ()=>{
      await logout()
      
  }}  color={"red"}><MenuItem> Logout </MenuItem></Link>
</MenuList>
</Menu>
</>
):(

<>
<Link href={"/coming-soon"} textDecoration={"none"}>

<Button
              variant={'solid'}
              colorScheme={'teal'}
              size={'sm'}
              mr={4}
              leftIcon={< UnlockIcon/>}>
              Login
            </Button>
</Link>
</>
            )}
           
          </Flex>
        </Flex>

        {isOpen ? (
          <Box bgColor={"main"} pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.title}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}