/* eslint-disable no-console */
import Router from 'next/router';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import Cookie from 'universal-cookie';
import { ApolloLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

import isSSR from 'config/isSSR';
import { REFRESH_TOKEN_KEY } from 'config/jwt';
import { GRAPHQL_APP_URL, PORT } from 'config/vars';

import { TCreateAuthHeaderLink, TCreateRefreshTokenLink } from './types';

export const createConsoleLink = () =>
  new ApolloLink((operation, forward) => {
    const timestamp = new Date().getTime();
    if (isSSR) console.log(`starting request for ${operation.operationName} at ${timestamp}`);

    return forward(operation).map(data => {
      if (isSSR) {
        console.log(`ending request for ${operation.operationName} at ${timestamp}`);
        console.log(JSON.stringify(data));
      }
      return data;
    });
  });

export const createErrorLink = () =>
  // eslint-disable-next-line consistent-return
  onError(error => {
    const { graphQLErrors = [], forward, operation } = error;
    // eslint-disable-next-line no-restricted-syntax
    for (const err of graphQLErrors) {
      if (err?.extensions?.code === 'unauthorized') {
        if (operation.operationName !== 'signIn') {
          operation.setContext({ isUnauthorizedError: true });
        }
        return forward(operation);
      }
    }
  });

export const createAuthHeaderLink = ({ cookie }: TCreateAuthHeaderLink) =>
  new ApolloLink((operation, forward) => {
    const cookieHeader = cookie ? { Cookie: cookie } : {};

    operation.setContext(({ headers }: { headers: object }) => {
      return {
        headers: {
          ...cookieHeader,
          ...headers,
        },
      };
    });

    return forward(operation);
  });

const getServerUrl = (path: string) => {
  const currentUrl = window.location.href;
  const url = new URL(path, currentUrl);
  return url.href;
};

const getProxyUrl = ({ origin, port, path }: { origin: string; port: string; path: string }) => {
  const proxyUrl = new URL(origin);
  proxyUrl.port = port;
  proxyUrl.pathname = path;
  return proxyUrl;
};

export const createRefreshTokenLink = ({ cookie }: TCreateRefreshTokenLink) => {
  const refreshToken = new Cookie(cookie).get(REFRESH_TOKEN_KEY);

  const body = JSON.stringify({
    operationName: 'updateToken',
    query: `mutation updateToken {
        updateToken {
          accessToken
          refreshToken
        }
      }`,
    variables: {},
  });

  const url = isSSR
    ? getProxyUrl({ origin: 'http://127.0.0.1', port: String(PORT), path: GRAPHQL_APP_URL })
    : getServerUrl(GRAPHQL_APP_URL);

  return new TokenRefreshLink({
    accessTokenField: 'accessToken',
    isTokenValidOrUndefined: operation => {
      if (operation.getContext().isUnauthorizedError) {
        return false;
      }
      return true;
    },
    fetchAccessToken: async () => {
      const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${refreshToken}`,
        },
        body,
      });
      return response.json();
    },
    handleFetch: () => {},
    // @ts-ignore
    handleResponse: () => response => {
      if (response?.errors?.length >= 0) {
        throw new Error(response?.errors[0].message);
      }
      return {
        accessToken: response,
      };
    },
    handleError: (err, operation) => {
      console.error('Your refresh token is invalid. Try to re-login. err: ', err);
      if (isSSR) {
        console.log('isSSR handleError');
        return;
      }

      if (operation.getContext().isUnauthorizedError) {
        const { cache } = operation.getContext();
        console.log('Invalid credentials log out 👋');
        cache.reset();
        Router.reload();
      } else {
        console.log('ERROR DOING NOTHING log out 👋');
      }
    },
  });
};
