import { useQuery } from '@apollo/client';
import Admins from 'graphql/queries/admins.graphql';

export const useAdmins = ({ ids }) => {
  const { data, loading, error } = useQuery(Admins, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    variables: { ids },
  });

  return {
    admins: data?.admins?.edges.map(admin => admin.node) || [],
    pageInfo: data?.companies?.pageInfo,
    loading,
    error,
  };
};
