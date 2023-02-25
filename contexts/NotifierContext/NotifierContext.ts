import { createContext } from 'react';

import { TNotifierContext } from './types';

const NotifierContext = createContext<TNotifierContext>({
  message: '',
  type: 'default',
  setError: () => {},
  setInfo: () => {},
  setSuccess: () => {},
  clearMessage: () => {},
});

export default NotifierContext;
