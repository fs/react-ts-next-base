import {
  useDisputeProposalsQuery,
  DisputeProposalsQueryVariables,
} from 'graphql/queries/__generated__/disputeProposals.generated';
import { DisputeProposalFragment } from 'graphql/fragments/__generated__/disputeProposalInfo.generated';
import { getLoadingType } from 'helpers';

export const useDisputeProposals = ({
  disputeId,
  first,
  after,
}: DisputeProposalsQueryVariables) => {
  const { data, networkStatus, error, fetchMore } = useDisputeProposalsQuery({
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    variables: {
      disputeId,
      first,
      after,
    },
  });

  const { loading, loadingMore } = getLoadingType(networkStatus);

  return {
    disputeProposals:
      (data?.disputeProposals.edges?.map(
        proposal => proposal?.node,
      ) as DisputeProposalFragment[]) || [],
    pageInfo: data?.disputeProposals?.pageInfo || { endCursor: null, hasNextPage: false },
    loading,
    loadingMore,
    error,
    fetchMore,
  };
};
