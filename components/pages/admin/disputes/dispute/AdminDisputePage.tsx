import React from 'react';
import { ParsedUrlQuery } from 'querystring';

import { useCustomerOrders } from 'lib/apollo/hooks/state/customerOrders';

import { TNextPage } from 'lib/apollo/types';
import { ADMIN_DISPUTES } from 'config/routes';
import { OrderCheckoutStatusEnum, DisputeStatusEnum } from 'graphql/types';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withRoutesRules from 'lib/roles/withRoutesRules';

import Loader from 'components/shared/atoms/Loader';
import Breadcrumbs from 'components/shared/atoms/Breadcrumbs';
import UnavailablePage from 'components/shared/molecules/UnavailablePage';
import AdminTemplate from 'components/shared/templates/AdminTemplate';
import ErrorPage from 'pages/_error';

import AdminOrderContent from '../components/AdminOrderContent';

import { Wrapper } from './styled';

const parseQuery = (query: ParsedUrlQuery) => {
  return {
    orderId: Array.isArray(query.orderId) || query.orderId === undefined ? '' : query.orderId,
  };
};

export const AdminDisputePage: TNextPage = ({ query }) => {
  const { orderId } = parseQuery(query);
  if (process.env.FEATURE_ADMIN_DISPUTES_PAGE !== 'true') {
    return (
      <AdminTemplate testId="admin-disputes-unavailable-page">
        <UnavailablePage />
      </AdminTemplate>
    );
  }

  const {
    customerOrders,
    loading,
    refetch: refetchOrders,
  } = useCustomerOrders({
    ids: [orderId],
    checkoutStatus: OrderCheckoutStatusEnum.Placed,
    disputeStatuses: Object.values(DisputeStatusEnum),
  });
  const [order] = customerOrders;

  if (!order && !loading) return <ErrorPage statusCode={404} />;

  return (
    <AdminTemplate testId="admin-dispute-page">
      <Wrapper>
        <Breadcrumbs
          url={ADMIN_DISPUTES}
          text="Вернуться ко всем спорам"
          testId="breadcrumbs-dispute-admin"
          back
        />
        {loading ? (
          <Loader testId="admin-dispute-page-loader" />
        ) : (
          <AdminOrderContent order={order} refetchOrders={refetchOrders} />
        )}
      </Wrapper>
    </AdminTemplate>
  );
};

export default withGetDataFromTree(withAuth(withAuthSecurity(withRoutesRules(AdminDisputePage))));
