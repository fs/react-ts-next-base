import React from 'react';

import withAuth from 'lib/auth/withAuth';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withRoutesRules from 'lib/roles/withRoutesRules';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';

import { useMyCompanies } from 'lib/apollo/hooks/state/myCompanies';

import CompanyTemplate from 'components/shared/templates/CompanyTemplate';
import Loader from 'components/shared/atoms/Loader';
import ErrorPage from 'pages/_error';
import OrderContent from './components/OrderContent';

export const OrderDocumentsPage = ({ query, ...context }) => {
  const { companyId, orderId } = query;

  const { myCompanies, loading } = useMyCompanies({ companyIds: [companyId] });
  const [company] = myCompanies;

  if (!company && !loading) return <ErrorPage statusCode={404} />;

  return (
    <CompanyTemplate testId="company-order-documents-page" company={company}>
      {loading ? (
        <Loader testId="company-order-documents-loader" />
      ) : (
        <OrderContent context={context} orderId={orderId} companyId={companyId} />
      )}
    </CompanyTemplate>
  );
};

export default withGetDataFromTree(withAuth(withAuthSecurity(withRoutesRules(OrderDocumentsPage))));
