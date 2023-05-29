import { ReactElement } from 'react';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';

import { TPageProps } from 'lib/apollo/types';

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
  };

  const component = typeof children === 'function' ? children(pageProps) : children;

  return <ApolloProvider client={mockClient}>{component}</ApolloProvider>;
}

export default renderWithApolloClient;
