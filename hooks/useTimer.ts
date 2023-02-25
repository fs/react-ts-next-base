import { useEffect, useState } from 'react';

const useTimer = (seconds: number) => {
  const [currentSeconds, setSeconds] = useState(seconds);
  const [timerStart, setTimerStart] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(current => {
        if (current > 0) {
          return current - 1;
        }

        clearInterval(intervalId);
        return current;
      });
    }, 1000);

    return () => {
      setTimerStart(false);
      clearInterval(intervalId);
    };
  }, [timerStart]);

  const reset = () => {
    setTimerStart(true);
    setSeconds(seconds);
  };

  return [currentSeconds, reset];
};

export default useTimer;
