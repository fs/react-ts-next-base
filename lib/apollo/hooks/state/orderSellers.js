import { useQuery } from '@apollo/client';

import OrderSellers from 'graphql/queries/orderSellers.graphql';

export const useOrderSellers = ({ companyId, checkoutStatus }) => {
  const { data, loading, error, refetch } = useQuery(OrderSellers, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    variables: { companyId, checkoutStatus },
  });

  return {
    orderSellers: data?.orderSellers?.edges.map(order => order.node) || [],
    loading,
    error,
    refetch,
  };
};
