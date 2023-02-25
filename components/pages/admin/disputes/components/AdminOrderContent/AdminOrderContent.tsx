import React from 'react';

import { OrderInfoFragment } from 'graphql/fragments/__generated__/orderInfo.generated';
import { CustomerOrdersQueryResult } from 'graphql/queries/__generated__/customerOrders.generated';
import { DeliveryMethodEnum, DeliveryServiceEnum } from 'graphql/types';

import Collapsible from 'components/shared/atoms/Collapsible';
import OrderTrackingInfo from 'components/shared/molecules/OrderTrackingInfo';
import OrderDetails from 'components/shared/organisms/OrderDetails';
import DisputeDetails from 'components/shared/organisms/DisputeDetails';
import OrderProductDetails from 'components/shared/organisms/OrderProductDetails';

import { OrderDetailsWrapper } from './styled';

type TAdminOrderContent = {
  order: OrderInfoFragment;
  refetchOrders: CustomerOrdersQueryResult['refetch'];
};

const AdminOrderContent = ({ order, refetchOrders }: TAdminOrderContent) => {
  const {
    deliveryMethod,
    deliveryService,
    dispute,
    product: { name: productName },
  } = order;

  const isPickup = deliveryMethod === DeliveryMethodEnum.Pickup;
  const isSellerDelivery = deliveryService === DeliveryServiceEnum.Seller;

  const productDetailsAccordion = [
    {
      name: 'product-details-info',
      heading: `Товар “${productName}”`,
      content: <OrderProductDetails order={order} isAdmin />,
      noContent: 'Описание отсутствует',
      $ml: 32,
      $mb: 8,
    },
  ];

  return (
    <>
      <OrderDetails variant="admin_disputes" order={order} isDetailed />

      {!isPickup && !isSellerDelivery && <OrderTrackingInfo order={order} />}

      <OrderDetailsWrapper>
        <Collapsible accordion={productDetailsAccordion} />
      </OrderDetailsWrapper>

      {dispute && (
        <DisputeDetails dispute={dispute} order={order} isAdmin refetchOrders={refetchOrders} />
      )}
    </>
  );
};

export default AdminOrderContent;
