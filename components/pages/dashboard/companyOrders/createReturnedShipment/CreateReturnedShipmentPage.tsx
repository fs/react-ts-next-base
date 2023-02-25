import React from 'react';
import { ParsedUrlQuery } from 'querystring';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withRoutesRules from 'lib/roles/withRoutesRules';

import { DASHBOARD_COMPANY_ORDER } from 'config/routes';

import { useMyCompanies } from 'lib/apollo/hooks/state/myCompanies';
import { useOrders } from 'lib/apollo/hooks/state/orders';

import { TNextPage } from 'lib/apollo/types';
import { CompanyStatusEnum, OrderCheckoutStatusEnum } from 'graphql/types';

import ErrorPage from 'pages/_error';
import Loader from 'components/shared/atoms/Loader';
import Breadcrumbs from 'components/shared/atoms/Breadcrumbs';
import EmptyMessageCheckingCompany from 'components/shared/molecules/EmptyMessageCheckingCompany';
import CompanyTemplate from 'components/shared/templates/CompanyTemplate';

import CreateReturnedShipment from '../components/CreateReturnedShipment';

import { Wrapper, Content } from './styled';

const parseQuery = (query: ParsedUrlQuery) => {
  return {
    companyId:
      Array.isArray(query.companyId) || query.companyId === undefined ? '' : query.companyId,
    orderId: Array.isArray(query.orderId) || query.orderId === undefined ? '' : query.orderId,
  };
};

export const CreateReturnedShipmentPage: TNextPage = ({ query }) => {
  const { companyId, orderId } = parseQuery(query);

  const { myCompanies, loading } = useMyCompanies({ companyIds: [companyId] });
  const { loading: loadingOrders, orders } = useOrders({
    companyId,
    checkoutStatus: OrderCheckoutStatusEnum.Placed,
    orderId,
  });
  const [company] = myCompanies;
  const [order] = orders;

  const isCompanyVerified = company?.status === CompanyStatusEnum.Verified;
  const canCreateReturnedShipment = order?.dispute?.canCreateReturnedShipment.value;
  const canUpdateReturnedShipment = order?.dispute?.returnedShipment?.canUpdate.value;

  if ((!company && !loading) || (!loadingOrders && !order)) return <ErrorPage statusCode={404} />;

  return (
    <CompanyTemplate testId="create-returned-shipment-page" company={company}>
      <Wrapper>
        <Breadcrumbs
          url={DASHBOARD_COMPANY_ORDER}
          params={{ companyId, orderId }}
          text="Вернуться к заказу"
          testId="breadcrumbs-create-returned-shipment"
          back
        />
        <Content>
          {!loading && !loadingOrders ? (
            <>
              {isCompanyVerified ? (
                order?.dispute &&
                (canCreateReturnedShipment || canUpdateReturnedShipment) && (
                  <CreateReturnedShipment
                    dispute={order.dispute}
                    companyId={companyId}
                    orderId={orderId}
                  />
                )
              ) : (
                <EmptyMessageCheckingCompany />
              )}
            </>
          ) : (
            <Loader testId="create-returned-shipment-loader" />
          )}
        </Content>
      </Wrapper>
    </CompanyTemplate>
  );
};

export default withGetDataFromTree(
  withAuth(withAuthSecurity(withRoutesRules(CreateReturnedShipmentPage))),
);
