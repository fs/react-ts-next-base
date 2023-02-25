import { useQuery } from '@apollo/client';

import StartPageCategories from 'graphql/queries/startPageCategories.graphql';

export const useStartPageCategories = () => {
  const { data, loading, error } = useQuery(StartPageCategories, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });

  return {
    categories: data?.startPageCategories || [],
    loading,
    error,
  };
};
