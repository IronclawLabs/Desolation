import { Box,HStack,Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

interface TimerProps {
  endsAt: string; // Date and time string in ISO format (e.g., "2026-06-22T21:38:00.000Z")
}

const Timer: React.FC<TimerProps> = ({ endsAt }) => {
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  useEffect(() => {
    // Parse the 'endsAt' string to a Date object
    const endDate = new Date(endsAt);

    // Update the timer every second
    const intervalId = setInterval(() => {
      const now = new Date();
      const timeDiff = endDate.getTime() - now.getTime();

      // Check if the timer has expired
      if (timeDiff <= 0) {
        clearInterval(intervalId);
        setTimeRemaining('Timer expired');
      } else {
        // Calculate days, hours, minutes, and seconds remaining
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        // Format the remaining time
        setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [endsAt]);

  return (
    <HStack  fontSize={"2xl"}fontWeight={"bold"} mt={"4rem"}  w={"100%"}>
      <Text w={"50%"} textAlign={"right"}>Remaning Time: </Text>
      <Text w={"50%"} textAlign={"left"}>
       {timeRemaining}
      </Text>
    </HStack>
  );
};

export default Timer;
