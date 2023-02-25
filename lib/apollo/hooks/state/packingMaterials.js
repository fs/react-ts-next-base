import { useQuery } from '@apollo/client';

import PackingMaterials from 'graphql/queries/packingMaterials.graphql';

export const usePackingMaterials = ({ name } = {}) => {
  const { data, loading, error, refetch } = useQuery(PackingMaterials, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    variables: { name },
  });

  return {
    packingMaterials: data?.packingMaterials?.edges.map(product => product.node) || [],
    loading,
    error,
    refetch,
  };
};
