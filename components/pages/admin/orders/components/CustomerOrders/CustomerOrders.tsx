import React from 'react';

import InfinityList from 'components/shared/organisms/InfinityList';

import OrderDetails from 'components/shared/organisms/OrderDetails';
import { OrderInfoFragment } from 'graphql/fragments/__generated__/orderInfo.generated';
import { PageInfo } from 'graphql/types';
import { CustomerOrdersWrapper } from './styled';

type TCustomerOrders = {
  orders: OrderInfoFragment[];
  loading: boolean;
  pageInfo: PageInfo;
  onLoadMore: () => void;
};
const CustomerOrders = ({ orders, loading, pageInfo, onLoadMore }: TCustomerOrders) => {
  return (
    <InfinityList
      onLoadMore={onLoadMore}
      loading={loading}
      hasNextPage={pageInfo?.hasNextPage}
      dataLength={orders.length}
      scrollableTarget="admin-template-content"
      $width="58rem"
    >
      <CustomerOrdersWrapper>
        {orders.map(order => {
          return <OrderDetails key={order.id} order={order} variant="admin_operation" />;
        })}
      </CustomerOrdersWrapper>
    </InfinityList>
  );
};

export default CustomerOrders;
