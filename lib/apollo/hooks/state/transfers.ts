import {
  useTransfersQuery,
  TransfersQueryVariables,
} from 'graphql/queries/__generated__/transfers.generated';
import { TransferInfoFragment } from 'graphql/fragments/__generated__/transferInfo.generated';
import { getLoadingType } from 'helpers';

type TTransfers = TransfersQueryVariables & {
  skip?: boolean;
};

export const useTransfers = ({
  transferTypes,
  operationStatuses,
  searchQuery,
  ids,
  first,
  after,
  skip = false,
}: TTransfers) => {
  const { data, error, networkStatus, refetch, fetchMore } = useTransfersQuery({
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    variables: {
      transferTypes,
      operationStatuses,
      searchQuery,
      ids,
      first,
      after,
    },
    skip,
  });

  const { loading, loadingMore } = getLoadingType(networkStatus);

  return {
    transfers:
      (data?.transfers.edges?.map(transfer => transfer?.node) as TransferInfoFragment[]) || [],
    loading,
    pageInfo: data?.transfers?.pageInfo || { endCursor: null, hasNextPage: false },
    loadingMore,
    error,
    refetch,
    fetchMore,
  };
};
