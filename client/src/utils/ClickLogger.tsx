import { postClickerClick } from '@/services/postClickerClick';
import React, { useEffect } from 'react';

interface Props{
  rewardId:string,
  targetClickCount:number,
  currentClickCount:number
}
function ClickLogger({ rewardId,targetClickCount,currentClickCount }:Props) {
  useEffect(() => {
    const clickHandler = () => {
      // Use the rewardId parameter as needed
      const temp = async ()=>{
        if( currentClickCount>= targetClickCount) return
        await postClickerClick(rewardId)
      }
      temp()
      // Perform your logic with rewardId here
    };

    document.addEventListener('click', clickHandler);

    return () => {
      document.removeEventListener('click', clickHandler);
    };
  }, [rewardId]);
  return <></>;
}

export default ClickLogger;
