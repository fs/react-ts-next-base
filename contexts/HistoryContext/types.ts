import React, { Dispatch, SetStateAction } from 'react';
import { Router } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

export type THistory = {
  pathname: string;
  query: ParsedUrlQuery;
  asPath: string;
};

export type THistoryProvider = {
  children: React.ReactNode;
  router: Router;
};

export type THistoryContext = {
  setHistory: Dispatch<SetStateAction<THistory[]>>;
  history: THistory[];
};
