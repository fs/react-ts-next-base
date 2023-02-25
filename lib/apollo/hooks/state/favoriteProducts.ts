import { ProductInfoFragment } from 'graphql/fragments/__generated__/productInfo.generated';
import {
  useFavoriteProductsQuery,
  FavoriteProductsQueryVariables,
} from 'graphql/queries/__generated__/favoriteProducts.generated';
import { getLoadingType } from 'helpers';

export const useFavoriteProducts = ({
  searchQuery,
  first,
  after,
}: FavoriteProductsQueryVariables) => {
  const { data, networkStatus, error, refetch, fetchMore } = useFavoriteProductsQuery({
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    variables: { searchQuery, first, after },
  });

  const { loading, loadingMore } = getLoadingType(networkStatus);

  return {
    favoriteProducts:
      (data?.favoriteProducts.edges?.map(
        favoriteProduct => favoriteProduct?.node,
      ) as ProductInfoFragment[]) || [],
    pageInfo: data?.favoriteProducts?.pageInfo || { hasNextPage: false, endCursor: null },
    loading,
    loadingMore,
    error,
    refetch,
    fetchMore,
  };
};
