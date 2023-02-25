import React from 'react';

import { useOrders } from 'lib/apollo/hooks/state/orders';
import { PLACED } from 'config/constants/checkoutStatus';

import { DASHBOARD_COMPANY_DOCUMENTS } from 'config/routes';

import Loader from 'components/shared/atoms/Loader';
import Breadcrumbs from 'components/shared/atoms/Breadcrumbs';
import OrderDetails from 'components/shared/organisms/OrderDetails';
import { OrderDocuments } from 'components/shared/molecules/OperationDocuments';

import { Wrapper, OrderWrapper, OrderDocumentsWrapper } from './styled';

const OrderContent = ({ companyId, orderId, context }) => {
  const { loading, orders } = useOrders({ companyId, checkoutStatus: PLACED, orderId });
  const [order] = orders;

  if (loading) return <Loader testId="company-documents-order-loader" />;

  return (
    <Wrapper>
      <OrderWrapper>
        <Breadcrumbs
          back
          text="Вернуться ко всем заказам"
          testId="breadcrumbs-company-order-documents"
          url={DASHBOARD_COMPANY_DOCUMENTS}
          params={{ companyId }}
        />
        <OrderDetails order={order} isDetailed variant="documents" />
      </OrderWrapper>

      <OrderDocumentsWrapper>
        <OrderDocuments order={order} context={context} />
      </OrderDocumentsWrapper>
    </Wrapper>
  );
};

export default OrderContent;
