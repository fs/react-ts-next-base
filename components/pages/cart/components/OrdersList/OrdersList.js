import React from 'react';

import { IN_CART } from 'config/constants/checkoutStatus';

import { useOrders, useOrdersSummary } from 'lib/apollo/hooks/state/orders';

import Loader from 'components/shared/atoms/Loader';
import InfinityList from 'components/shared/organisms/InfinityList';

import { useOrderSellers } from 'lib/apollo/hooks/state/orderSellers';
import OrderItem from '../OrderItem';
import DeletedOrderItem from '../DeletedOrderItem';
import { ListWrapper, OrdersListWrapper, DeletedOrdersList } from './styled';

const OrdersList = ({ sellerId, mainCompanyId, companyBuyerName }) => {
  const {
    loading,
    orders,
    pageInfo,
    loadingMore,
    fetchMore,
    refetch: refetchOrders,
  } = useOrders({
    companyId: mainCompanyId,
    checkoutStatus: IN_CART,
    sellerIds: sellerId,
    deleted: false,
    first: 12,
  });
  const { loading: deletedLoading, orders: deletedOrders } = useOrders({
    companyId: mainCompanyId,
    checkoutStatus: IN_CART,
    sellerIds: sellerId,
    deleted: true,
  });

  const onLoadMore = async () => {
    if (loadingMore) return;
    await fetchMore({ variables: { after: pageInfo?.endCursor } });
  };

  const { refetch: refetchOrdersSummary } = useOrdersSummary({
    companyId: mainCompanyId,
    checkoutStatus: IN_CART,
    deleted: false,
  });
  const { refetch: refetchOrderSellers } = useOrderSellers({
    companyId: mainCompanyId,
    checkoutStatus: IN_CART,
  });

  const refetchAfterDestroy = () => {
    refetchOrders();
    refetchOrdersSummary();
    refetchOrderSellers();
  };

  return (
    <>
      <ListWrapper>
        {deletedLoading ? (
          <Loader />
        ) : (
          deletedOrders.length > 0 && (
            <DeletedOrdersList>
              {deletedOrders.map(order => (
                <DeletedOrderItem key={order.id} order={order} />
              ))}
            </DeletedOrdersList>
          )
        )}
      </ListWrapper>

      <ListWrapper>
        <InfinityList
          dataLength={orders.length}
          loading={loading}
          hasNextPage={pageInfo?.hasNextPage}
          onLoadMore={onLoadMore}
          scrollableTarget="layout-template-content"
        >
          <OrdersListWrapper>
            {orders.map(order => (
              <OrderItem
                key={order.id}
                order={order}
                companyBuyerName={companyBuyerName}
                companyId={mainCompanyId}
                refetchAfterDestroy={refetchAfterDestroy}
              />
            ))}
          </OrdersListWrapper>
        </InfinityList>
      </ListWrapper>
    </>
  );
};

export default OrdersList;
