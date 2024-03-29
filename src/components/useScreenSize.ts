import { useEffect, useState } from 'react';

export const useScreenSize = ()=>{
  // Get the size of window 
  const screenSize = [window.innerWidth, window.innerHeight];
  const [ windowSize, setWidowSize ] = useState(screenSize);

  useEffect(()=>{
    const changeScreenSize = ()=>{
      setWidowSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", changeScreenSize);
      return ()=> window.removeEventListener('resize', changeScreenSize);
  }, []);
  //return the window size
  return windowSize;
}