import React, { useEffect, useMemo, useState } from 'react';

import HistoryContext from './HistoryContext';
import { THistory, THistoryProvider } from './types';

const HistoryProvider = ({ children, router }: THistoryProvider) => {
  const [history, setHistory] = useState<THistory[]>([]);
  const { pathname, query, asPath } = router;

  useEffect(() => {
    if (history[history.length - 1]?.asPath !== asPath) {
      setHistory(prev => [...prev, { pathname, query, asPath }]);
    }

    if (history.length >= 10) {
      setHistory(prev => prev.slice(1));
    }
  }, [asPath]);

  const context = useMemo(
    () => ({
      setHistory,
      history,
    }),
    [setHistory, history],
  );

  return <HistoryContext.Provider value={context}>{children}</HistoryContext.Provider>;
};

export default HistoryProvider;
