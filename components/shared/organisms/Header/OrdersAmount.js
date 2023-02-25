import React from 'react';

import { useOrdersSummary } from 'lib/apollo/hooks/state/orders';
import { IN_CART } from 'config/constants/checkoutStatus';

import { OrdersAmountWrapper } from './styled';

const OrdersAmount = ({ mainCompanyId }) => {
  const { totalCount, loading } = useOrdersSummary({
    companyId: mainCompanyId,
    checkoutStatus: IN_CART,
    deleted: false,
  });

  return (
    <OrdersAmountWrapper data-testid="orders-amount">{!loading && totalCount}</OrdersAmountWrapper>
  );
};

export default OrdersAmount;
