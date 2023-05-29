import { NextApiRequest, NextApiResponse, NextComponentType, NextPageContext } from 'next';
import { AppContext, AppProps } from 'next/app';
import { ParsedUrlQuery } from 'querystring';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

export type TToken = string | null;

export type PageInfo = {
  endCursor?: string | null | undefined;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type THistory = {
  pathname: string;
  query: ParsedUrlQuery;
  asPath: string;
};

export type TApolloClient = ApolloClient<NormalizedCacheObject>;

export type TPageProps = {
  query: ParsedUrlQuery;
  apolloClient: TApolloClient;
  pathname: string;
  history?: THistory[];
  canVisit?: boolean;
  apolloState?: NormalizedCacheObject;
};

export type ApolloPageContext<C = NormalizedCacheObject> = NextPageContext & {
  // Custom prop added by withApollo
  apolloClient: ApolloClient<C>;
  apolloState: C;
  canVisit?: boolean;
  res: NextApiResponse;
  req: NextApiRequest;
};

export type TAppProps = {
  apolloClient: TApolloClient;
  apolloState?: NormalizedCacheObject;
};

export type ApolloAppContext<C = NormalizedCacheObject> = AppContext & {
  ctx: ApolloPageContext<C>;
  apolloClient: ApolloClient<C>;
  apolloState: C;
  pageProps: TPageProps;
  res: NextApiResponse;
  req: NextApiRequest;
};

export type TCreateAuthHeaderLink = {
  cookie?: string;
};

export type TCreateRefreshTokenLink = {
  cookie?: string;
};

type ApolloNextPage<P = object, IP = P> = NextComponentType<ApolloPageContext, IP, P>;
type ApolloAppPage<P = object, IP = P> = NextComponentType<ApolloAppContext, IP, P>;

export type TNextPage = ApolloNextPage<TPageProps>;

export type TAppPage = ApolloAppPage<AppProps<TPageProps> & TAppProps, TAppProps>;
