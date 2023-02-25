import React from 'react';

import DeliveryContent from './components/DeliveryContent';
import TotalContent from './components/TotalContent';
import OrderContent from './components/OrderContent';
import ActionContent from './components/ActionContent';

import { Wrapper } from './styled';
import { EVariant, TOrderDetails } from './types';

const OrderDetails: React.FunctionComponent<TOrderDetails> = ({
  order,
  isDetailed = false,
  variant = 'default',
  refetchOrders = () => {},
}) => {
  const {
    id: orderId,
    deliveryMethod,
    deliveryPrice,
    placedAt,
    deliveryService,
    deliveryAddress,
    product,
    quantity,
    itemPrice,
    seller,
    buyer,
    executionStatus,
    dispute,
  } = order;

  const isUserBuyer = !!buyer?.myRole;
  const isAdmin = variant === EVariant.ADMIN_OPERATION || variant === EVariant.ADMIN_DISPUTES;
  const orderCoast = itemPrice ? itemPrice * quantity : 0;
  const totalCoast = itemPrice ? itemPrice * quantity + deliveryPrice : 0;
  const companyId = isUserBuyer ? buyer?.id : seller.id;

  return (
    <Wrapper data-testid="order-details" status={executionStatus}>
      <OrderContent
        buyer={buyer}
        seller={seller}
        orderId={orderId}
        placedAt={placedAt}
        executionStatus={executionStatus}
        orderCoast={orderCoast}
        isAdmin={isAdmin}
        dispute={dispute}
        isUserBuyer={isUserBuyer}
      />
      <DeliveryContent
        deliveryPrice={deliveryPrice}
        deliveryMethod={deliveryMethod}
        deliveryService={deliveryService}
        deliveryAddress={deliveryAddress}
        product={product}
      />
      <TotalContent quantity={quantity} totalCoast={totalCoast} />
      <ActionContent
        companyId={companyId}
        isDetailed={isDetailed}
        refetchOrders={refetchOrders}
        variant={variant}
        isUserBuyer={isUserBuyer}
        order={order}
      />
    </Wrapper>
  );
};

export default OrderDetails;
