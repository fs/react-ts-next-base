import { createContext } from 'react';
import { THistoryContext } from './types';

const HistoryContext = createContext<THistoryContext>({
  history: [],
  setHistory: () => {},
});

export default HistoryContext;
