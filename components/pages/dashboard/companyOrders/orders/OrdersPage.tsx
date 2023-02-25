import React from 'react';
import { ParsedUrlQuery } from 'querystring';
import useRouter from 'hooks/useRouter';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withRoutesRules from 'lib/roles/withRoutesRules';

import { useMyCompanies } from 'lib/apollo/hooks/state/myCompanies';
import { useOrders } from 'lib/apollo/hooks/state/orders';

import { TNextPage } from 'lib/apollo/types';
import { getStatus } from 'config/constants/status';
import { CompanyDirectionEnum, OrderCheckoutStatusEnum } from 'graphql/types';

import ErrorPage from 'pages/_error';
import Loader from 'components/shared/atoms/Loader';
import Tabs from 'components/shared/molecules/Tabs';
import EmptyMessageCheckingCompany from 'components/shared/molecules/EmptyMessageCheckingCompany';
import CompanyTemplate from 'components/shared/templates/CompanyTemplate';

import CompanyDisputes from '../components/CompanyDisputes';
import ReservedOrders from '../components/ReservedOrders';
import CompanyOrders from '../components/CompanyOrders';

const config = {
  orders: 'orders',
  disputes: 'disputes',
};

const parseQuery = (query: ParsedUrlQuery) => {
  return {
    companyId:
      Array.isArray(query.companyId) || query.companyId === undefined ? '' : query.companyId,
    disputes: !!query?.disputes || false,
  };
};

export const OrdersPage: TNextPage = ({ query }) => {
  const { companyId, disputes } = parseQuery(query);
  const { pushRoute } = useRouter();

  const {
    orders: reservedOrders,
    loading: loadingOrders,
    refetch: refetchReservedOrders,
  } = useOrders({
    companyId,
    checkoutStatus: OrderCheckoutStatusEnum.Reserved,
    deleted: false,
  });
  const { myCompanies, loading } = useMyCompanies({ companyIds: [companyId] });
  const [company] = myCompanies;

  const isUserBuyer = company?.direction === CompanyDirectionEnum.Buyer;
  const isCompanyVerified = getStatus(company?.status);

  const TABS = [
    {
      id: config.orders,
      name: isUserBuyer ? 'Мои заказы' : 'Заказы',
      action: () =>
        pushRoute({
          query: {
            companyId,
            [config.orders]: true,
          },
        }),
      content: <CompanyOrders companyId={companyId} query={query} isUserBuyer={isUserBuyer} />,
    },
    {
      id: config.disputes,
      name: 'Споры',
      content: <CompanyDisputes companyId={companyId} query={query} />,
      action: () =>
        pushRoute({
          query: {
            companyId,
            [config.disputes]: true,
          },
        }),
    },
  ];

  const activeType = disputes ? config.disputes : config.orders;

  if (!company && !loading) return <ErrorPage statusCode={404} />;

  return (
    <CompanyTemplate testId="company-orders-page" company={company}>
      {!loading && !loadingOrders ? (
        <>
          {reservedOrders.length > 0 && isUserBuyer ? (
            <ReservedOrders
              isCompanyVerified={isCompanyVerified}
              orders={reservedOrders}
              refetchReservedOrders={refetchReservedOrders}
            />
          ) : isCompanyVerified ? (
            <Tabs tabs={TABS} activeId={activeType} />
          ) : (
            <EmptyMessageCheckingCompany />
          )}
        </>
      ) : (
        <Loader testId="company-orders-loader" />
      )}
    </CompanyTemplate>
  );
};

export default withGetDataFromTree(withAuth(withAuthSecurity(withRoutesRules(OrdersPage))));
