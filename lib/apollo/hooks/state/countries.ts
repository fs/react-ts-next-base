import { useApolloClient } from '@apollo/client';

import Countries from 'graphql/queries/countries.graphql';
import {
  CountriesQueryVariables,
  CountriesQuery,
} from 'graphql/queries/__generated__/countries.generated';

import { filterAvailableNodes } from 'helpers/types';

export const useCountries = () => {
  const apolloClient = useApolloClient();

  const fetch = async ({ after, name }: CountriesQueryVariables) => {
    const { data, loading, error } = await apolloClient.query<CountriesQuery>({
      query: Countries,
      variables: { after, name },
      fetchPolicy: 'no-cache',
    });

    return {
      nodes: filterAvailableNodes(data?.countries.edges?.map(country => country?.node)),
      pageInfo: data?.countries?.pageInfo,
      loading,
      error,
    };
  };

  return fetch;
};
