import { useContext } from 'react';
import HistoryContext from 'contexts/HistoryContext';

const useHistory = () => {
  const value = useContext(HistoryContext);

  const { history, setHistory } = value;
  return { history, setHistory };
};

export default useHistory;
