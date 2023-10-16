import { SearchIcon } from "@chakra-ui/icons";
import { Button, HStack, Input, Spinner,Stack,Text } from "@chakra-ui/react";
import { useState } from "react";
import Link from "next/link";
import { FaCrown } from "react-icons/fa";

const Searchbar = () => {
  const [discordID, setDiscordID] = useState("");


  return (
    <Stack flexDir={{base:"column-reverse",md:"row"}} alignItems={"center"}  w={"full"} justifyContent={"space-between"}>
      <Link href={"/know-us"}>
<Button leftIcon={<FaCrown></FaCrown>}  mx={"2rem"}  mt={"2"}  colorScheme='teal' bgGradient="linear(to-r, green.500, purple.500)"
_hover={{bgGradient:"linear(to-l, green.500, purple.500)"}}
 className="outer-panel" maxWidth={"10rem"} id="neonShadow"><Text >xxx</Text></Button>
 </Link>
    <HStack justifyContent="flex-end" mr="2rem" mt="8px" mb="1rem">
      <Input
        variant="outline"
        w="15rem"
        value={discordID}
        onChange={(e) => setDiscordID(e.target.value)}
        placeholder="Enter a Discord ID..."
      />
      {discordID ? (
        <Link href={`/user/${discordID}`}>
          <Button variant="solid" colorScheme="orange" size="md" disabled={!discordID}>
            <SearchIcon />
          </Button>
        </Link>
      ) : (
        <Button variant="solid" colorScheme="orange" size="md" disabled>
          <SearchIcon />
        </Button>
      )}
    </HStack>
    </Stack>

  );
};

export default Searchbar;
