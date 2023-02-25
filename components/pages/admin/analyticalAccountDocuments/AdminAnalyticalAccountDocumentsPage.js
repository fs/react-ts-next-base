import React from 'react';
import { ADMIN_ANALYTICAL_ACCOUNT } from 'config/routes';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withRoutesRules from 'lib/roles/withRoutesRules';

import { useCustomerOrders } from 'lib/apollo/hooks/state/customerOrders';
import { useTransfers } from 'lib/apollo/hooks/state/transfers';

import Loader from 'components/shared/atoms/Loader';
import Breadcrumbs from 'components/shared/atoms/Breadcrumbs';
import { OrderDocuments, TransferDocuments } from 'components/shared/molecules/OperationDocuments';
import OrderDetails from 'components/shared/organisms/OrderDetails';
import AdminTemplate from 'components/shared/templates/AdminTemplate';
import ErrorPage from 'pages/_error';

import { ANALYTICAL_OPERATION } from 'config/constants/analyticalAccount';
import { BreadcrumbsWrapper, Wrapper, ContentWrapper } from './styled';
import TransferItem from '../analyticalAccount/components/WithdrawalTab/TransferItem';

const getOperations = ({ type, id }) => {
  switch (type) {
    case ANALYTICAL_OPERATION.ORDER: {
      const { customerOrders, loading, error } = useCustomerOrders({
        ids: [id],
      });

      return { operations: customerOrders, loading, error };
    }
    case ANALYTICAL_OPERATION.TRANSFER: {
      const { transfers, loading, error } = useTransfers({
        ids: [id],
      });

      return { operations: transfers, loading, error };
    }
    default:
      console.error(`unknown operation type: ${type}`);
      return { loading: false, error: true };
  }
};
export const AdminAnalyticalAccountDocumentsPage = ({ query, ...context }) => {
  const { id, type } = query;

  const { operations, loading, error } = getOperations({ type, id });
  const [operation] = operations;

  if (!loading && (error || !operation)) return <ErrorPage statusCode={404} />;

  const renderOperation = () => {
    switch (type) {
      case ANALYTICAL_OPERATION.ORDER: {
        return (
          <>
            <OrderDetails order={operation} variant="admin_operation" isDetailed />
            <OrderDocuments order={operation} context={context} />
          </>
        );
      }
      case ANALYTICAL_OPERATION.TRANSFER: {
        return (
          <>
            <TransferItem transfer={operation} />
            <TransferDocuments operation={operation} context={context} />
          </>
        );
      }
      default: {
        return <></>;
      }
    }
  };
  return (
    <AdminTemplate testId="admin-order-documents-page">
      <Wrapper>
        <BreadcrumbsWrapper>
          <Breadcrumbs
            url={ADMIN_ANALYTICAL_ACCOUNT}
            text="Вернуться ко всем операциям"
            testId="breadcrumbs-analytical-account"
          />
        </BreadcrumbsWrapper>

        <ContentWrapper>
          {loading ? <Loader testId="admin-order-documents-loader" /> : renderOperation()}
        </ContentWrapper>
      </Wrapper>
    </AdminTemplate>
  );
};

export default withGetDataFromTree(
  withAuth(withAuthSecurity(withRoutesRules(AdminAnalyticalAccountDocumentsPage))),
);
