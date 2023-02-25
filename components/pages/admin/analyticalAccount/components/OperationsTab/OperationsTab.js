import React from 'react';

import { useCustomerOrders } from 'lib/apollo/hooks/state/customerOrders';

import { PLACED } from 'config/constants/checkoutStatus';
import { EXECUTION_STATUS } from 'config/constants/executionStatus';

import OrderDetails from 'components/shared/organisms/OrderDetails';
import InfinityList from 'components/shared/organisms/InfinityList';

const OperationsTab = ({ query }) => {
  const { customerOrders, loading, loadingMore, pageInfo, fetchMore, refetch } = useCustomerOrders({
    checkoutStatus: PLACED,
    executionStatuses: [EXECUTION_STATUS.PAYMENT_PENDING],
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
      dataLength={customerOrders.length}
      scrollableTarget="admin-template-content"
      $width="58rem"
    >
      {customerOrders.map(order => {
        return (
          <OrderDetails
            key={order.id}
            order={order}
            variant="admin_operation"
            refetchOrders={refetch}
          />
        );
      })}
    </InfinityList>
  );
};

export default OperationsTab;
