import React from 'react';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withRoutesRules from 'lib/roles/withRoutesRules';

import { useOrders } from 'lib/apollo/hooks/state/orders';
import { useMyCompanies } from 'lib/apollo/hooks/state/myCompanies';

import { DASHBOARD_COMPANY_ORDERS } from 'config/routes';
import { PLACED } from 'config/constants/checkoutStatus';
import { EXECUTION_STATUS } from 'config/constants/executionStatus';

import Loader from 'components/shared/atoms/Loader';
import Breadcrumbs from 'components/shared/atoms/Breadcrumbs';
import CompanyTemplate from 'components/shared/templates/CompanyTemplate';
import ErrorPage from 'pages/_error';

import OrderContent from '../components/OrderContent';

import { Wrapper, Content } from './styled';

const { DISPUTE_OPENED, MEDAGREGATOR_INTERVENED } = EXECUTION_STATUS;

export const OrderPage = ({ query }) => {
  const { companyId, orderId } = query;

  const { myCompanies, loading } = useMyCompanies({ companyIds: [companyId] });
  const {
    orders,
    loading: loadingOrders,
    refetch,
  } = useOrders({
    companyId,
    checkoutStatus: PLACED,
    orderId,
  });

  const [order] = orders;
  const [company] = myCompanies;

  const breadcrumbsParams = {
    companyId,
    disputes:
      [DISPUTE_OPENED || MEDAGREGATOR_INTERVENED].includes(order?.executionStatus) || undefined,
  };

  if ((!company && !loading) || (!loadingOrders && !order)) return <ErrorPage statusCode={404} />;

  return (
    <CompanyTemplate testId="company-order-page" company={company}>
      <Wrapper>
        <Breadcrumbs
          url={DASHBOARD_COMPANY_ORDERS}
          params={breadcrumbsParams}
          text="Вернуться ко всем заказам"
          testId="breadcrumbs-company-order"
          back
        />
        <Content>
          {loading || loadingOrders ? (
            <Loader testId="company-order-loader" />
          ) : (
            <OrderContent order={order} companyId={companyId} refetch={refetch} />
          )}
        </Content>
      </Wrapper>
    </CompanyTemplate>
  );
};

export default withGetDataFromTree(withAuth(withAuthSecurity(withRoutesRules(OrderPage))));
