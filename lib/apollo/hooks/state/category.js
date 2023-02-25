import { useQuery } from '@apollo/client';

import Category from 'graphql/queries/category.graphql';

export const useCategory = ({ id }) => {
  const { data, loading, error, refetch } = useQuery(Category, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    variables: { id },
  });

  return {
    category: data?.category || {},
    loading,
    error,
    refetch,
  };
};
