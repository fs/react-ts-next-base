import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

const mockApolloClient: ApolloClient<NormalizedCacheObject> =
  jest.genMockFromModule('@apollo/client');
mockApolloClient.mutate = jest.fn();
mockApolloClient.query = jest.fn();

export { mockApolloClient };
