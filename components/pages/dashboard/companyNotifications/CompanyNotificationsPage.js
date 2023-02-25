import React from 'react';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withRoutesRules from 'lib/roles/withRoutesRules';

import { useMyCompanies } from 'lib/apollo/hooks/state/myCompanies';
import { getStatus } from 'config/constants/status';

import ErrorPage from 'pages/_error';
import CompanyTemplate from 'components/shared/templates/CompanyTemplate';
import EmptyMessageCheckingCompany from 'components/shared/molecules/EmptyMessageCheckingCompany';
import UnavailablePage from 'components/shared/molecules/UnavailablePage';

const CompanyNotificationsPage = ({ query }) => {
  const { companyId } = query;
  const { myCompanies, loading } = useMyCompanies({ companyIds: [companyId] });
  const [company] = myCompanies;
  const isCompanyVerified = getStatus(company?.status);

  if (!company && !loading) return <ErrorPage statusCode={404} />;

  return (
    <CompanyTemplate testId="company-notifications-page" company={company}>
      {isCompanyVerified ? <UnavailablePage /> : <EmptyMessageCheckingCompany />}
    </CompanyTemplate>
  );
};

export default withGetDataFromTree(
  withAuth(withAuthSecurity(withRoutesRules(CompanyNotificationsPage))),
);
