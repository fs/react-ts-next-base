import { useEffect } from 'react';
import isSSR from 'config/isSSR';

const useCalculateVh = () => {
  const calculateVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  useEffect(() => {
    if (!isSSR) {
      calculateVh();
      window.addEventListener('resize', calculateVh);
      window.addEventListener('orientationchange', calculateVh);
    }
  }, []);
};

export default useCalculateVh;
