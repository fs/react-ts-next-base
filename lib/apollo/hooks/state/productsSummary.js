import { useQuery } from '@apollo/client';

import ProductSummary from 'graphql/queries/productSummary.graphql';

export const useProductSummary = ({
  categoryIds,
  manufacturer,
  searchQuery,
  minPrice,
  maxPrice,
  dictionaryProperties = [],
  integerProperties = [],
  rating,
  companyRating,
  freeDeliveryCompanyId,
  newest,
  condition,
  vatPresence,
}) => {
  const { data, loading, error, refetch } = useQuery(ProductSummary, {
    fetchPolicy: 'cache-and-network',
    variables: {
      categoryIds,
      manufacturer,
      searchQuery,
      minPrice,
      maxPrice,
      dictionaryProperties,
      integerProperties,
      rating,
      companyRating,
      freeDeliveryCompanyId,
      newest,
      condition,
      vatPresence: vatPresence === undefined ? undefined : vatPresence === 'true',
    },
  });

  return {
    totalCount: data?.productsSummary?.totalCount || 0,
    loading,
    error,
    refetch,
  };
};
