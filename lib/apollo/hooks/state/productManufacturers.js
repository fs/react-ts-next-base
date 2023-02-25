import { useQuery } from '@apollo/client';

import ProductManufacturers from 'graphql/queries/productManufactures.graphql';

export const useProductManufactures = ({ name } = {}) => {
  const { data, loading, error, refetch } = useQuery(ProductManufacturers, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    variables: { name },
  });

  return {
    productManufacturers:
      data?.productManufacturers?.edges.map(manufacturer => manufacturer.node) || [],
    loading,
    error,
    refetch,
  };
};
