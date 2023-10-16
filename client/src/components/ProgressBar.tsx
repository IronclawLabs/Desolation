import "./progress.css"
import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

interface Props{

    progressPer:number
}
const ProgressBar = ({progressPer}:Props) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setProgress(progressPer); // Set the progress to 75%
    }, 100);
  }, [progressPer]);

  return (
    <Box w={{base:150,md:350, lg:600}}  className="progress">
      <div
        style={{width:`${progress}%`}}
        className="bar"
      ></div>
    </Box>
  );
};

export default ProgressBar;
