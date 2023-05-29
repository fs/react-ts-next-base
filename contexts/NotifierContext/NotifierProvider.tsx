import { useMemo, useState } from 'react';
import ErrorDecorator from 'decorators/ErrorDecorator';
import { TypeOptions } from 'react-toastify';

import NotifierContext from './NotifierContext';

import { TNotifierProvider } from './types';

const NotifierProvider = ({ children }: TNotifierProvider) => {
  const [message, setMessage] = useState<string>('');
  const [type, setType] = useState<TypeOptions>('default');

  const setError = (errorMessage: unknown) => {
    const [notifierMessage] = new ErrorDecorator(errorMessage).getMessages();
    setMessage(Array.isArray(notifierMessage) ? notifierMessage.join('\n') : notifierMessage);
    setType('error');
  };

  const setInfo = (infoMessage: string) => {
    setMessage(infoMessage);
    setType('info');
  };

  const setSuccess = (successMessage: string) => {
    setMessage(successMessage);
    setType('success');
  };

  const clearMessage = () => {
    setMessage('');
    setType('default');
  };

  const context = useMemo(
    () => ({
      message,
      type,
      setError,
      setInfo,
      setSuccess,
      clearMessage,
    }),
    [message, type, setError, setInfo, setSuccess, clearMessage],
  );

  return <NotifierContext.Provider value={context}>{children}</NotifierContext.Provider>;
};

export default NotifierProvider;
