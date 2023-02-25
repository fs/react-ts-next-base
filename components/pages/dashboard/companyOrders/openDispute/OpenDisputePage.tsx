import React from 'react';
import { parseQueryParam } from 'helpers';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withRoutesRules from 'lib/roles/withRoutesRules';

import { DASHBOARD_COMPANY_ORDERS } from 'config/routes';

import { useMyCompanies } from 'lib/apollo/hooks/state/myCompanies';
import { useOrders } from 'lib/apollo/hooks/state/orders';

import { getStatus } from 'config/constants/status';

import Loader from 'components/shared/atoms/Loader';
import Breadcrumbs from 'components/shared/atoms/Breadcrumbs';
import EmptyMessageCheckingCompany from 'components/shared/molecules/EmptyMessageCheckingCompany';
import CompanyTemplate from 'components/shared/templates/CompanyTemplate';
import ErrorPage from 'pages/_error';

import { TNextPage } from 'lib/apollo/types';
import { ParsedUrlQuery } from 'querystring';
import { OrderCheckoutStatusEnum } from 'graphql/types';
import OpenDispute from '../components/OpenDispute';

import { Content, Wrapper } from './styled';

const parseQuery = (query: ParsedUrlQuery) => {
  return {
    companyId: parseQueryParam(query.companyId),
    orderId: parseQueryParam(query.orderId),
  };
};

export const OpenDisputePage: TNextPage = ({ query }) => {
  const { companyId, orderId } = parseQuery(query);

  const { myCompanies, loading } = useMyCompanies({ companyIds: [companyId] });
  const { loading: loadingOrders, orders } = useOrders({
    companyId,
    checkoutStatus: OrderCheckoutStatusEnum.Placed,
    orderId,
  });
  const [company] = myCompanies;
  const [order] = orders;

  const isCompanyVerified = getStatus(company?.status);

  if ((!company && !loading) || (!order && !loadingOrders)) return <ErrorPage statusCode={404} />;

  return (
    <CompanyTemplate testId="company-open-dispute-page" company={company}>
      <Wrapper>
        <Breadcrumbs
          url={DASHBOARD_COMPANY_ORDERS}
          params={{ companyId }}
          text="Вернуться ко всем заказам"
          testId="breadcrumbs-open-dispute"
        />
        <Content>
          {!loading && !loadingOrders ? (
            <>
              {isCompanyVerified ? (
                <OpenDispute companyId={companyId} order={order} />
              ) : (
                <EmptyMessageCheckingCompany />
              )}
            </>
          ) : (
            <Loader testId="company-open-dispute-loader" />
          )}
        </Content>
      </Wrapper>
    </CompanyTemplate>
  );
};

export default withGetDataFromTree(withAuth(withAuthSecurity(withRoutesRules(OpenDisputePage))));
