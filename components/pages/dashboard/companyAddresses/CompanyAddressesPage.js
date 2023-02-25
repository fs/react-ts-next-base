import React from 'react';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withRoutesRules from 'lib/roles/withRoutesRules';

import { useMyCompanies } from 'lib/apollo/hooks/state/myCompanies';

import ErrorPage from 'pages/_error';
import CompanyTemplate from 'components/shared/templates/CompanyTemplate';
import Loader from 'components/shared/atoms/Loader';

import Addresses from './components/Addresses';

export const CompanyAddressesPage = ({ query }) => {
  const { companyId } = query;
  const { myCompanies, loading } = useMyCompanies({ companyIds: [companyId] });
  const [company] = myCompanies;

  if (!company && !loading) return <ErrorPage statusCode={404} />;

  return (
    <CompanyTemplate testId="company-addresses-page" company={company}>
      {loading ? (
        <Loader testId="company-addresses-loader" />
      ) : (
        <Addresses companyId={companyId} company={company} query={query} />
      )}
    </CompanyTemplate>
  );
};

export default withGetDataFromTree(
  withAuth(withAuthSecurity(withRoutesRules(CompanyAddressesPage))),
);
