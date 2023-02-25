import React from 'react';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withRoutesRules from 'lib/roles/withRoutesRules';

import { useMyCompanies } from 'lib/apollo/hooks/state/myCompanies';
import { useAccount } from 'lib/apollo/hooks/state/account';

import { getStatus } from 'config/constants/status';

import ErrorPage from 'pages/_error';
import Loader from 'components/shared/atoms/Loader';
import EmptyMessageCheckingCompany from 'components/shared/molecules/EmptyMessageCheckingCompany';
import CompanyTemplate from 'components/shared/templates/CompanyTemplate';

import AnalyticalAccount from './components/AnalyticalAccount';

export const CompanyAnalyticalAccountPage = ({ query }) => {
  const { companyId } = query;

  const { account } = useAccount({ companyId });

  const { myCompanies, loading } = useMyCompanies({ companyIds: [companyId] });
  const [company] = myCompanies;

  const isCompanyVerified = getStatus(company?.status);

  if (!company && !loading) return <ErrorPage statusCode={404} />;

  return (
    <CompanyTemplate testId="company-analytical-account-page" company={company}>
      {!loading ? (
        <>
          {isCompanyVerified ? (
            <AnalyticalAccount query={query} company={company} account={account} />
          ) : (
            <EmptyMessageCheckingCompany />
          )}
        </>
      ) : (
        <Loader testId="company-analytical-account-loader" />
      )}
    </CompanyTemplate>
  );
};

export default withGetDataFromTree(
  withAuth(withAuthSecurity(withRoutesRules(CompanyAnalyticalAccountPage))),
);
