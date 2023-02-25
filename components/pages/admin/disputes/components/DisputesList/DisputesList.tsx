import React from 'react';

import { useCustomerOrders } from 'lib/apollo/hooks/state/customerOrders';

import { OrderCheckoutStatusEnum, DisputeStatusEnum } from 'graphql/types';

import OrderDetails from 'components/shared/organisms/OrderDetails';
import InfinityList from 'components/shared/organisms/InfinityList';

type TDisputesList = {
  searchQuery: string | null;
  disputeStatuses: DisputeStatusEnum[];
};

const DisputesList = ({
  searchQuery,
  disputeStatuses = Object.values(DisputeStatusEnum),
}: TDisputesList) => {
  const { customerOrders, loading, loadingMore, pageInfo, fetchMore, refetch } = useCustomerOrders({
    checkoutStatus: OrderCheckoutStatusEnum.Placed,
    disputeStatuses: disputeStatuses.length ? disputeStatuses : Object.values(DisputeStatusEnum),
    searchQuery,
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
      dataLength={customerOrders.length}
      scrollableTarget="admin-template-content"
      $width="58rem"
    >
      {customerOrders.map(order => {
        return (
          <OrderDetails
            key={order.id}
            order={order}
            refetchOrders={refetch}
            variant="admin_disputes"
            isDetailed={false}
          />
        );
      })}
    </InfinityList>
  );
};

export default DisputesList;
