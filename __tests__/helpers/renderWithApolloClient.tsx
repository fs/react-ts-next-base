import React, { ReactElement } from 'react';
import { TPageProps } from 'lib/apollo/types';
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';

const mockAccessTokenManager = {
  accessToken: '',
  expires: 0,
  get: () => ({ accessToken: '', expires: 0 }),
  delete: () => {},
  set: () => {},
};

function renderWithApolloClient(
  children: ReactElement | ((props: TPageProps) => ReactElement),
): ReactElement {
  const mockFetch = jest.fn();
  const mockClient = new ApolloClient({
    link: new HttpLink({ uri: `${process.env.API_URL}/graphql`, fetch: mockFetch }),
    cache: new InMemoryCache(),
  });

  const pageProps: TPageProps = {
    apolloClient: mockClient,
    query: {},
    pathname: '',
    accessTokenManager: mockAccessTokenManager,
  };

  const component = typeof children === 'function' ? children(pageProps) : children;

  return <ApolloProvider client={mockClient}>{component}</ApolloProvider>;
}

export default renderWithApolloClient;
