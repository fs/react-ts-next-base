import React from 'react';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withRoutesRules from 'lib/roles/withRoutesRules';

import { DASHBOARD_COMPANY_ORDER } from 'config/routes';

import { useMyCompanies } from 'lib/apollo/hooks/state/myCompanies';

import ErrorPage from 'pages/_error';
import CompanyTemplate from 'components/shared/templates/CompanyTemplate';
import Breadcrumbs from 'components/shared/atoms/Breadcrumbs';
import Loader from 'components/shared/atoms/Loader';

import OrderTrackingContent from './components/OrderTrackingContent';

import { Wrapper, Content } from './styled';

export const OrderTrackingPage = ({ query }) => {
  const { companyId, orderId } = query;

  const { myCompanies, loading } = useMyCompanies({ companyIds: [companyId] });
  const [company] = myCompanies;

  if (!company && !loading) return <ErrorPage statusCode={404} />;

  return (
    <CompanyTemplate testId="order-tracking-page" company={company}>
      <Wrapper>
        <Breadcrumbs
          url={DASHBOARD_COMPANY_ORDER}
          params={{ companyId, orderId }}
          text={`Вернуться к заказу № ${orderId}`}
          testId="breadcrumbs-order-tracking"
        />
        <Content>
          {loading ? (
            <Loader testId="order-tracking-loader" />
          ) : (
            <OrderTrackingContent companyId={companyId} orderId={orderId} />
          )}
        </Content>
      </Wrapper>
    </CompanyTemplate>
  );
};

export default withGetDataFromTree(withAuth(withAuthSecurity(withRoutesRules(OrderTrackingPage))));
