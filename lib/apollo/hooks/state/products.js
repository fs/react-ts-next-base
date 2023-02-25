import { useQuery } from '@apollo/client';

import Products from 'graphql/queries/products.graphql';
import ProductRandomReview from 'graphql/queries/productRandomReview.graphql';
import { getLoadingType } from 'helpers';

// companyIds and categoryIds are arrays of ID, but next-routes can't parse array in the query
// it needs to join IDs with comma and store in the query (example: { categoryIds: '1,2,3' })
// in this hook need to split string to array

export const useProducts = (query = {}) => {
  const {
    productIds,
    categoryIds,
    companyIds,
    manufacturer,
    searchQuery,
    minPrice,
    maxPrice,
    dictionaryProperties,
    integerProperties,
    condition,
    discounted,
    first = 12,
    after,
    orderBy,
    rating,
    companyRating,
    newest,
    freeDeliveryCompanyId,
    vatPresence,
  } = query;

  const variables = {
    productIds: productIds?.split(','),
    categoryIds: categoryIds?.split(','),
    companyIds: companyIds?.split(','),
    manufacturer,
    searchQuery,
    minPrice,
    maxPrice,
    dictionaryProperties,
    integerProperties,
    condition,
    discounted,
    first,
    after,
    orderBy,
    rating: rating ? Number(rating) : undefined,
    companyRating: rating ? Number(companyRating) : undefined,
    newest: newest === 'true',
    freeDeliveryCompanyId,
    vatPresence: vatPresence === undefined ? undefined : vatPresence === 'true',
  };

  const { data, error, networkStatus, refetch, fetchMore } = useQuery(Products, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    variables,
  });

  const { loading, loadingMore } = getLoadingType(networkStatus);

  return {
    products: data?.products?.edges.map(product => product.node) || [],
    pageInfo: data?.products?.pageInfo || {},
    totalCount: data?.productsSummary.totalCount,
    loading,
    loadingMore,
    error,
    refetch,
    fetchMore,
  };
};

export const useProductRandomReview = (query = {}) => {
  const { data, error, loading } = useQuery(ProductRandomReview, {
    fetchPolicy: 'cache-and-network',
    variables: query,
  });

  return {
    products: data?.products?.edges.map(product => product.node) || [],
    loading,
    error,
  };
};
