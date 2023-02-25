import { ProductInfoFragment } from 'graphql/fragments/__generated__/productInfo.generated';
import {
  CustomerProductsQueryVariables,
  useCustomerProductsQuery,
} from 'graphql/queries/__generated__/customerProducts.generated';
import { getLoadingType } from 'helpers';

export const useCustomerProducts = ({
  productIds = [],
  searchQuery,
  deleted = false,
  draft,
  template,
  statuses = [],
  first = 16,
  after,
}: CustomerProductsQueryVariables) => {
  const { data, networkStatus, error, fetchMore } = useCustomerProductsQuery({
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    variables: {
      productIds,
      searchQuery,
      deleted,
      draft,
      template,
      statuses,
      first,
      after,
    },
  });

  const { loading, loadingMore } = getLoadingType(networkStatus);

  return {
    customerProducts:
      (data?.customerProducts.edges?.map(company => company?.node) as ProductInfoFragment[]) || [],
    pageInfo: data?.customerProducts?.pageInfo || { endCursor: null, hasNextPage: false },
    loading,
    loadingMore,
    error,
    fetchMore,
  };
};
