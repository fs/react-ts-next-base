import React from 'react';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withRoutesRules from 'lib/roles/withRoutesRules';

import { getStatus } from 'config/constants/status';

import { useMyCompanies } from 'lib/apollo/hooks/state/myCompanies';

import ErrorPage from 'pages/_error';
import CompanyTemplate from 'components/shared/templates/CompanyTemplate';
import EmptyMessageCheckingCompany from 'components/shared/molecules/EmptyMessageCheckingCompany';

import { documentsTypes } from './constants';
import DocumentsContent from './components/DocumentsContent';

export const DocumentsPage = ({ query }) => {
  const { companyId } = query;

  const activeType = query.type || documentsTypes.ALL;
  const preparedQuery = { ...query, type: activeType };

  const { myCompanies, loading } = useMyCompanies({ companyIds: [companyId] });
  const [company] = myCompanies;

  const isCompanyVerified = getStatus(company?.status);

  if (!company && !loading) return <ErrorPage statusCode={404} />;

  return (
    <CompanyTemplate testId="company-documents-page" company={company}>
      {isCompanyVerified ? (
        <DocumentsContent query={preparedQuery} />
      ) : (
        <EmptyMessageCheckingCompany />
      )}
    </CompanyTemplate>
  );
};

export default withGetDataFromTree(withAuth(withAuthSecurity(withRoutesRules(DocumentsPage))));
