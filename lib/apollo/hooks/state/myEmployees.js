import { useQuery } from '@apollo/client';

import MyEmployees from 'graphql/queries/myEmployees.graphql';

export const useMyEmployees = () => {
  const { data, loading, error, refetch } = useQuery(MyEmployees, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });

  return {
    myEmployees: data?.myEmployees?.edges.map(employee => employee.node) || [],
    loading,
    error,
    refetch,
  };
};
