import React from 'react';

import { useOrders } from 'lib/apollo/hooks/state/orders';

import Loader from 'components/shared/atoms/Loader';

import { PLACED } from 'config/constants/checkoutStatus';

import DeliveryAddress from '../DeliveryAddress';
import DeliveryHistory from '../DeliveryHistory';

const OrderTrackingContent = ({ companyId, orderId }) => {
  const { loading, orders } = useOrders({ companyId, checkoutStatus: PLACED, orderId });
  const [order] = orders;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <DeliveryAddress order={order} />
          <DeliveryHistory />
        </>
      )}
    </>
  );
};

export default OrderTrackingContent;
