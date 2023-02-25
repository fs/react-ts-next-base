import { useQuery } from '@apollo/client';

import AccountOperations from 'graphql/queries/accountOperations.graphql';
import { getLoadingType } from 'helpers';

export const useAccountOperations = ({
  companyId,
  subjects,
  statuses,
  orderIds,
  first,
  last,
  after,
  acceptedDate,
}) => {
  const { data, error, networkStatus, refetch, fetchMore } = useQuery(AccountOperations, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    variables: {
      companyId,
      subjects,
      statuses,
      orderIds,
      acceptedDate,
      first,
      last,
      after,
    },
  });

  const { loading, loadingMore } = getLoadingType(networkStatus);

  return {
    accountOperations: data?.accountOperations?.edges.map(operation => operation.node) || [],
    loading,
    pageInfo: data?.accountOperations?.pageInfo || {},
    loadingMore,
    error,
    refetch,
    fetchMore,
  };
};
