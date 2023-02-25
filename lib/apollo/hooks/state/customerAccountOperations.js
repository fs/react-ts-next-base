import { useQuery } from '@apollo/client';

import CustomerAccountOperations from 'graphql/queries/customerAccountOperations.graphql';
import { getLoadingType } from 'helpers';

export const useCustomerAccountOperations = ({ statuses, searchQuery, first, after }) => {
  const { data, error, networkStatus, refetch, fetchMore } = useQuery(CustomerAccountOperations, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    variables: {
      statuses,
      first,
      after,
      searchQuery,
    },
  });

  const { loading, loadingMore } = getLoadingType(networkStatus);

  return {
    customerAccountOperations:
      data?.customerAccountOperations?.edges.map(operation => operation.node) || [],
    loading,
    pageInfo: data?.customerAccountOperations?.pageInfo || {},
    loadingMore,
    error,
    refetch,
    fetchMore,
  };
};
