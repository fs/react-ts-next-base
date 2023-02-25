import {
  useOrdersQuery,
  OrdersQueryVariables,
} from 'graphql/queries/__generated__/orders.generated';
import { OrderInfoFragment } from 'graphql/fragments/__generated__/orderInfo.generated';
import {
  useOrdersSummaryQuery,
  OrdersSummaryQueryVariables,
} from 'graphql/queries/__generated__/ordersSummary.generated';
import { getLoadingType } from 'helpers';

type OrdersType = Omit<OrdersQueryVariables, 'orderId, dateFrom, dateTo'> & {
  orderId?: string;
};

export const useOrders = ({
  companyId,
  checkoutStatus,
  executionStatuses,
  disputeStatuses,
  sellerIds,
  orderId,
  placedDate,
  productSearchQuery,
  deleted,
  after,
  first,
}: OrdersType) => {
  const { data, error, refetch, fetchMore, networkStatus } = useOrdersQuery({
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    variables: {
      after,
      companyId,
      checkoutStatus,
      executionStatuses,
      disputeStatuses,
      sellerIds,
      ids: orderId && [orderId],
      productSearchQuery,
      first,
      placedDate,
      ...(deleted !== undefined ? { deleted } : {}),
    },
  });

  const { loading, loadingMore } = getLoadingType(networkStatus);

  return {
    orders: (data?.orders.edges?.map(order => order?.node) as OrderInfoFragment[]) || [],
    pageInfo: data?.orders?.pageInfo || { endCursor: null, hasNextPage: false },
    loading,
    fetchMore,
    loadingMore,
    error,
    refetch,
  };
};

export const useOrdersSummary = ({
  companyId,
  checkoutStatus,
  sellerIds,
  deleted,
}: OrdersSummaryQueryVariables) => {
  const { data, loading, error, refetch } = useOrdersSummaryQuery({
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    variables: {
      companyId,
      checkoutStatus,
      sellerIds,
      ...(deleted !== undefined ? { deleted } : {}),
    },
  });

  return {
    totalCount: data?.ordersSummary?.totalCount || 0,
    loading,
    error,
    refetch,
  };
};
