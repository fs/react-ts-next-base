import { useEffect } from 'react';

import isServerSide from 'config/isServerSide';

const useCalculateVh = () => {
  const calculateVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  useEffect(() => {
    if (!isServerSide()) {
      calculateVh();
      window.addEventListener('resize', calculateVh);
      window.addEventListener('orientationchange', calculateVh);
    }
  }, []);
};

export default useCalculateVh;
