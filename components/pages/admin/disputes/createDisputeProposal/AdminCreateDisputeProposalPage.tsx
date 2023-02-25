import React from 'react';

import { useCustomerOrders } from 'lib/apollo/hooks/state/customerOrders';

import { ADMIN_DISPUTE } from 'config/routes';
import { DisputeStatusEnum } from 'graphql/types';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withRoutesRules from 'lib/roles/withRoutesRules';

import Loader from 'components/shared/atoms/Loader';
import Breadcrumbs from 'components/shared/atoms/Breadcrumbs';
import UnavailablePage from 'components/shared/molecules/UnavailablePage';
import AdminTemplate from 'components/shared/templates/AdminTemplate';
import ErrorPage from 'pages/_error';

import { TNextPage } from 'lib/apollo/types';
import { ParsedUrlQuery } from 'querystring';
import { Wrapper } from './styled';
import CreateAdminDisputeProposal from './components/CreateAdminDisputeProposal';

export const parseQuery = (query: ParsedUrlQuery) => {
  return {
    orderId: Array.isArray(query.orderId) || query.orderId === undefined ? '' : query.orderId,
  };
};

export const AdminCreateDisputeProposalPage: TNextPage = ({ query }) => {
  const { orderId } = parseQuery(query);
  if (process.env.FEATURE_ADMIN_DISPUTES_PAGE !== 'true') {
    return (
      <AdminTemplate testId="admin-create-proposal-unavailable-page">
        <UnavailablePage />
      </AdminTemplate>
    );
  }

  const { customerOrders, loading } = useCustomerOrders({
    ids: [orderId],
    disputeStatuses: [DisputeStatusEnum.MedagregatorIntervened],
  });
  const [order] = customerOrders;

  if (!order && !loading) return <ErrorPage statusCode={404} />;

  return (
    <AdminTemplate testId="admin-admin-create-dispute-page">
      <Wrapper>
        <Breadcrumbs
          url={ADMIN_DISPUTE}
          text="Вернуться к заказу"
          testId="breadcrumbs-admin-create-proposal"
          params={{ orderId }}
          back
        />
        {loading ? (
          <Loader testId="admin-create-proposal-page-loader" />
        ) : (
          <>
            {order.dispute && <CreateAdminDisputeProposal dispute={order.dispute} order={order} />}
          </>
        )}
      </Wrapper>
    </AdminTemplate>
  );
};

export default withGetDataFromTree(
  withAuth(withAuthSecurity(withRoutesRules(AdminCreateDisputeProposalPage))),
);
