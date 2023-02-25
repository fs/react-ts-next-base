import { useQuery } from '@apollo/client';

import DellinFreightTypes from 'graphql/queries/dellinFreightTypes.graphql';

export const useDellinFreightTypes = ({ name, active }) => {
  const { data, loading, error, refetch } = useQuery(DellinFreightTypes, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    variables: { name, active },
  });

  return {
    dellinFreightTypes: data?.dellinFreightTypes.edges.map(types => types.node) || [],
    loading,
    error,
    refetch,
  };
};
