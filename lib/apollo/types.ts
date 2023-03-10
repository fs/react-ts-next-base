import { AppContext, AppProps } from 'next/app';
import { ParsedUrlQuery } from 'querystring';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { NextApiRequest, NextApiResponse, NextComponentType, NextPageContext } from 'next';
import { AccessTokenManager } from 'lib/auth/withAccessTokenManager';

export type TToken = string | null;
export type TExpires = number | null;

export type PageInfo = {
  endCursor?: string | null | undefined;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type TApolloClient = ApolloClient<NormalizedCacheObject>;

export type TPageProps = {
  query: ParsedUrlQuery;
  apolloClient: TApolloClient;
  pathname: string;
  canVisit?: boolean;
  apolloState?: NormalizedCacheObject;
  accessTokenManager: AccessTokenManager;
};

export type ApolloPageContext<C = NormalizedCacheObject> = NextPageContext & {
  // Custom prop added by withApollo
  apolloClient: ApolloClient<C>;
  apolloState: C;
  accessTokenManager: AccessTokenManager;
  canVisit?: boolean;
  res: NextApiResponse;
  req: NextApiRequest;
};

export type TAppProps = {
  apolloClient: TApolloClient;
  accessTokenManager: AccessTokenManager;
  apolloState?: NormalizedCacheObject;
};

export type ApolloAppContext<C = NormalizedCacheObject> = AppContext & {
  ctx: ApolloPageContext<C>;
  apolloClient: ApolloClient<C>;
  apolloState: C;
  accessTokenManager: AccessTokenManager;
  pageProps: TPageProps;
  res: NextApiResponse;
  req: NextApiRequest;
};

export type TCreateAuthHeaderLink = {
  getAccessToken: () => { accessToken: TToken; expires: TExpires } | undefined;
  cookie?: string;
};

export type TCreateUpdateTokenLink = {
  setAccessToken: (token: string) => void;
  deleteAccessToken: () => void;
};

type ApolloNextPage<P = object, IP = P> = NextComponentType<ApolloPageContext, IP, P>;
type ApolloAppPage<P = object, IP = P> = NextComponentType<ApolloAppContext, IP, P>;

export type TNextPage = ApolloNextPage<TPageProps>;

export type TAppPage = ApolloAppPage<AppProps<TPageProps> & TAppProps, TAppProps>;
