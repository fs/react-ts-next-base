import React from 'react';

import { deliveryMethods, deliveryServices } from 'config/constants/delivery';
import { EXECUTION_STATUS } from 'config/constants/executionStatus';

import Collapsible from 'components/shared/atoms/Collapsible';
import Notification from 'components/shared/atoms/Notification';
import OrderTrackingInfo from 'components/shared/molecules/OrderTrackingInfo';
import OrderDetails from 'components/shared/organisms/OrderDetails';
import DisputeDetails from 'components/shared/organisms/DisputeDetails';
import OrderProductDetails from 'components/shared/organisms/OrderProductDetails';

import { OrderDetailsWrapper } from './styled';

const notificationMessage = (
  <div>
    Счета по оформленной сделке будут отправлены на вашу почту.
    <br />
    Их необходимо будет оплатить в течение 24 часов.
  </div>
);

const OrderContent = ({ order, companyId, refetch }) => {
  const {
    deliveryMethod,
    deliveryService,
    executionStatus,
    dispute,
    product: { name: productName },
  } = order || {};

  const isUserBuyer = order?.buyer.id === companyId;
  const isPickup = deliveryMethod === deliveryMethods.PICKUP;
  const isSellerDelivery = deliveryService === deliveryServices.SELLER;

  const productDetailsAccordion = [
    {
      name: 'product-details-info',
      heading: `Товар “${productName}”`,
      content: <OrderProductDetails order={order} />,
      noContent: 'Описание отсутствует',
      $ml: 32,
      $mb: 8,
    },
  ];

  return (
    <>
      <Notification
        text={notificationMessage}
        isShow={executionStatus === EXECUTION_STATUS.PAYMENT_PENDING && isUserBuyer}
        $mt={16}
      />

      <OrderDetails order={order} isDetailed refetchOrders={refetch} />

      {!isPickup && !isSellerDelivery && <OrderTrackingInfo order={order} />}

      <OrderDetailsWrapper>
        <Collapsible accordion={productDetailsAccordion} />
      </OrderDetailsWrapper>

      {process.env.FEATURE_DISPUTES === 'true' && dispute && (
        <DisputeDetails dispute={dispute} order={order} refetchOrders={refetch} />
      )}
    </>
  );
};

export default OrderContent;
