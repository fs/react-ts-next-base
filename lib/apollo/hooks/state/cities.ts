import { useApolloClient } from '@apollo/client';

import Cities from 'graphql/queries/cities.graphql';
import { CityFragment } from 'graphql/fragments/__generated__/cityInfo.generated';
import { CitiesQuery, CitiesQueryVariables } from 'graphql/queries/__generated__/cities.generated';

import { filterAvailableNodes } from 'helpers/types';

export const useCities = () => {
  const apolloClient = useApolloClient();

  const fetch = async ({ after, name, strict = false }: CitiesQueryVariables) => {
    const { data, loading, error } = await apolloClient.query<CitiesQuery>({
      query: Cities,
      variables: { after, name, strict },
      fetchPolicy: 'no-cache',
    });

    return {
      nodes: filterAvailableNodes<CityFragment>(data?.cities.edges?.map(city => city?.node)),
      pageInfo: data?.cities?.pageInfo,
      loading,
      error,
    };
  };

  return fetch;
};
