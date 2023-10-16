"use client"

import { Box, Spinner } from "@chakra-ui/react";

export default function CoolLoading() {
    return (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="200px" // Adjust the height as needed
        >
          <Spinner
            thickness="4px"
            speed="0.65s" // Adjust the animation speed as needed
            emptyColor="gray.200"
            color="orange" // Adjust the color as needed
            size="xl" // Adjust the size as needed
          />
          <Box fontWeight={"bold"} fontSize={"lg"} mt="4">Loading...</Box>
        </Box>
      );
  }