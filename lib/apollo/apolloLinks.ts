/* eslint-disable no-console */
import { ApolloLink, fromPromise } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import isServerSide from 'config/isServerSide';
import { TCreateAuthHeaderLink, TCreateUpdateTokenLink } from './types';

export const createConsoleLink = () =>
  new ApolloLink((operation, forward) => {
    const timestamp = new Date().getTime();
    if (isServerSide())
      console.log(`starting request for ${operation.operationName} at ${timestamp}`);

    return forward(operation).map(data => {
      if (isServerSide()) {
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
        if (operation.operationName !== 'updateToken') {
          const delayOperation = new Promise((resolve: (value?: unknown) => void) =>
            setTimeout(() => resolve(), 300),
          );
          return fromPromise(delayOperation).flatMap(() => {
            return forward(operation);
          });
        }
        return forward(operation);
      }
    }
  });

export const createAuthHeaderLink = ({ getAccessToken, cookie }: TCreateAuthHeaderLink) =>
  new ApolloLink((operation, forward) => {
    const accessToken =
      typeof getAccessToken === 'function' ? getAccessToken()?.accessToken : undefined;
    const authHeader = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
    const cookieHeader = cookie ? { Cookie: cookie } : {};

    operation.setContext(({ headers }: { headers: object }) => {
      return {
        headers: {
          ...authHeader,
          ...cookieHeader,
          ...headers,
        },
      };
    });

    return forward(operation);
  });

export const createUpdateTokenLink = ({
  setAccessToken,
  deleteAccessToken,
}: TCreateUpdateTokenLink) =>
  new ApolloLink((operation, forward) => {
    return forward(operation).map(data => {
      const name = operation.operationName;

      switch (name) {
        case 'signIn':
        case 'signUp':
        case 'updatePassword':
        case 'updateToken': {
          if (!data?.data?.[name]) break;

          const { accessToken } = data.data[name];

          if (accessToken) setAccessToken(accessToken);

          break;
        }
        case 'SignOut': {
          deleteAccessToken();
          break;
        }
        default:
          break;
      }

      return data;
    });
  });
