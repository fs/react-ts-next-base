import { useQuery } from '@apollo/client';

import Properties from 'graphql/queries/properties.graphql';
import { getLoadingType } from 'helpers';

export const useProperties = ({ categoryIds, name, first, propertiesIds }) => {
  const { data, networkStatus, error, refetch, fetchMore } = useQuery(Properties, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    variables: { categoryIds, name, first, ids: propertiesIds },
  });

  const { loading, loadingMore } = getLoadingType(networkStatus);

  return {
    properties: data?.properties?.edges.map(property => property.node) || [],
    pageInfo: data?.properties?.pageInfo || {},
    loading,
    loadingMore,
    error,
    refetch,
    fetchMore,
  };
};
