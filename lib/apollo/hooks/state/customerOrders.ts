import {
  CustomerOrdersQueryVariables,
  useCustomerOrdersQuery,
} from 'graphql/queries/__generated__/customerOrders.generated';
import { OrderInfoFragment } from 'graphql/fragments/__generated__/orderInfo.generated';
import { getLoadingType } from 'helpers';

type TCustomerOrders = CustomerOrdersQueryVariables & {
  skip?: boolean;
};

export const useCustomerOrders = ({
  checkoutStatus,
  executionStatuses,
  reservationStatuses,
  disputeStatuses,
  searchQuery,
  ids,
  first,
  after,
  skip = false,
}: TCustomerOrders) => {
  const { data, error, networkStatus, refetch, fetchMore } = useCustomerOrdersQuery({
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    variables: {
      checkoutStatus,
      executionStatuses,
      disputeStatuses,
      reservationStatuses,
      first,
      after,
      searchQuery,
      ids,
    },
    skip,
  });

  const { loading, loadingMore } = getLoadingType(networkStatus);

  return {
    customerOrders:
      (data?.customerOrders.edges?.map(order => order?.node) as OrderInfoFragment[]) || [],
    loading,
    pageInfo: data?.customerOrders?.pageInfo || {
      endCursor: null,
      hasNextPage: false,
      hasPreviousPage: false,
    },
    loadingMore,
    error,
    refetch,
    fetchMore,
  };
};
