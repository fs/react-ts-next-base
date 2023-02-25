import { useQuery } from '@apollo/client';

import DictionaryPropertyOptions from 'graphql/queries/dictionaryPropertyOptions.graphql';

export const useDictionaryPropertyOptions = ({ propertyId }) => {
  const { data, loading, error, refetch } = useQuery(DictionaryPropertyOptions, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    variables: { propertyId },
  });

  return {
    dictionaryPropertyOptions: data?.dictionaryPropertyOptions || [],
    loading,
    error,
    refetch,
  };
};
