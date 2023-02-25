import { useQuery } from '@apollo/client';

import DeliveryPoints from 'graphql/queries/deliveryPoints.graphql';

export const useDeliveryPoints = ({ service, cityId, direction = 'ALL' }) => {
  const { data, loading, error, refetch } = useQuery(DeliveryPoints, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    variables: { service, cityId, direction },
  });

  return {
    deliveryPoints: data?.deliveryPoints || [],
    loading,
    error,
    refetch,
  };
};
