import React from 'react';

import { useDisputeProposals } from 'lib/apollo/hooks/state/disputeProposals';

import { DisputeFragment } from 'graphql/fragments/__generated__/disputeInfo.generated';

import Loader from 'components/shared/atoms/Loader';
import Collapsible from 'components/shared/atoms/Collapsible';

import DisputeHistoryList from './DisputeHistoryList';

import { DisputeHistoryWrapper } from './styled';

type TDisputeHistory = {
  dispute: DisputeFragment;
};

const DisputeHistory = ({ dispute }: TDisputeHistory) => {
  const { id: disputeId, comment } = dispute;

  const { disputeProposals, loading, loadingMore, pageInfo, fetchMore } = useDisputeProposals({
    disputeId,
  });

  const { endCursor, hasNextPage } = pageInfo || {};

  const onLoadMore = async () => {
    if (loadingMore) return;
    if (hasNextPage) {
      await fetchMore({ variables: { after: endCursor } });
    }
  };

  const proposals = [
    {
      name: 'proposals-history',
      heading: 'История спора',
      content: (
        <DisputeHistoryList
          disputeProposals={disputeProposals}
          comment={comment}
          loading={loading}
          onLoadMore={onLoadMore}
          hasNextPage={hasNextPage}
        />
      ),
      noContent: 'История отсутствует',
      $ml: 32,
    },
  ];
  return (
    <DisputeHistoryWrapper data-testid="dispute-history">
      {loading ? <Loader /> : <Collapsible variant="secondary" accordion={proposals} />}
    </DisputeHistoryWrapper>
  );
};

export default DisputeHistory;
