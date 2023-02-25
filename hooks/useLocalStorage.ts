import { useEffect, useState } from 'react';

export type TCity = { name: string; id: string | null };

const INITIAL_VALUE: TCity = { id: null, name: '' };

const useLocalStorage = (key: string) => {
  const [value, setValue] = useState<TCity>(INITIAL_VALUE);

  useEffect(() => {
    const city = window.localStorage.getItem(key);
    setValue(city ? JSON.parse(city) : city);
  }, []);

  useEffect(() => {
    if (value?.id !== INITIAL_VALUE.id && value) {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }, [value]);

  return [value, setValue] as const;
};

export default useLocalStorage;
