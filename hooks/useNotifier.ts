import { useContext } from 'react';
import NotifierContext from 'contexts/NotifierContext';

const useNotifier = () => {
  const value = useContext(NotifierContext);

  const { message, type, setError, setInfo, setSuccess, clearMessage } = value;
  return { message, type, setError, setInfo, setSuccess, clearMessage };
};

export default useNotifier;
