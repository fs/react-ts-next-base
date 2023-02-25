import { useQuery } from '@apollo/client';

import MyProducts from 'graphql/queries/myProducts.graphql';

export const useMyProducts = ({
  companyIds,
  searchQuery,
  productIds,
  template,
  deleted,
  draft,
  statuses,
  orderBy,
  first = 12,
  after,
}) => {
  const { data, loading, error, refetch, fetchMore } = useQuery(MyProducts, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    variables: {
      companyIds,
      searchQuery,
      productIds,
      template,
      deleted,
      draft,
      statuses,
      orderBy,
      first,
      after,
    },
  });

  return {
    products: data?.myProducts?.edges.map(product => product.node) || [],
    pageInfo: data?.myProducts?.pageInfo,
    loading,
    error,
    refetch,
    fetchMore,
  };
};
