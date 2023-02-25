import React from 'react';

import { useTransfers } from 'lib/apollo/hooks/state/transfers';

import { ACCOUNT_OPERATION_STATUS } from 'config/constants/accountOperations';
import { TRANSFER_TYPE } from 'config/constants/transfers';

import InfinityList from 'components/shared/organisms/InfinityList';

import TransferItem from './TransferItem';

const WithdrawalTab = ({ query }) => {
  const { transfers, loading, loadingMore, pageInfo, fetchMore, refetch } = useTransfers({
    transferTypes: [TRANSFER_TYPE.WITHDRAWAL],
    operationStatuses: [ACCOUNT_OPERATION_STATUS.PENDING],
    searchQuery: query?.searchQuery,
    first: 12,
  });

  const { endCursor, hasNextPage } = pageInfo;
  const onLoadMore = async () => {
    if (loadingMore) return;
    if (hasNextPage) {
      await fetchMore({ variables: { after: endCursor } });
    }
  };
  return (
    <InfinityList
      onLoadMore={onLoadMore}
      loading={loading}
      hasNextPage={hasNextPage}
      dataLength={transfers.length}
      scrollableTarget="admin-template-content"
      $width="58rem"
    >
      {transfers.map(transfer => {
        return (
          <TransferItem isShowLookCheck key={transfer.id} transfer={transfer} refetch={refetch} />
        );
      })}
    </InfinityList>
  );
};

export default WithdrawalTab;
