import { ReactNode } from 'react';
import { TypeOptions } from 'react-toastify';

export type TNotifierContext = {
  message: string;
  type: TypeOptions;
  setError: (error: unknown) => void;
  setInfo: (message: string) => void;
  setSuccess: (message: string) => void;
  clearMessage: () => void;
};

export type TNotifierProvider = {
  children: ReactNode;
};
