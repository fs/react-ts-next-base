import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import useNotifier from 'hooks/useNotifier';

import { ToastWrapper } from './styled';

const Notifier = () => {
  const { message, type, clearMessage } = useNotifier();

  useEffect(() => {
    if (message && type) {
      if (type !== 'default') {
        toast[type](message);
      }
      clearMessage();
    }
  }, [message, type, clearMessage]);

  return (
    <ToastWrapper data-testid="notifier">
      <ToastContainer position="top-center" autoClose={5000} closeOnClick hideProgressBar />
    </ToastWrapper>
  );
};

export default Notifier;
