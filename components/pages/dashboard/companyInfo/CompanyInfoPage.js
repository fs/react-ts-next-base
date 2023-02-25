import React, { useMemo } from 'react';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withRoutesRules from 'lib/roles/withRoutesRules';

import { useMyCompanies } from 'lib/apollo/hooks/state/myCompanies';

import ErrorPage from 'pages/_error';
import CompanyTemplate from 'components/shared/templates/CompanyTemplate';
import Loader from 'components/shared/atoms/Loader';

import { REJECTED } from 'config/constants/status';
import UpdateCompany from './components/UpdateCompany';
import UpdateRejectedCompany from './components/UpdateRejectedCompany';

export const CompanyInfoPage = ({ query }) => {
  const { companyId } = query;
  const { myCompanies, loading } = useMyCompanies({ companyIds: [companyId] });
  const [company] = myCompanies;

  if (!company && !loading) return <ErrorPage statusCode={404} />;

  const updateCompanyForm = useMemo(() => {
    if (company?.status === REJECTED) {
      return <UpdateRejectedCompany company={company} />;
    }
    return <UpdateCompany company={company} />;
  }, [company]);

  return (
    <CompanyTemplate testId="company-info-page" company={company}>
      {loading ? <Loader testId="company-info-page-loader" /> : updateCompanyForm}
    </CompanyTemplate>
  );
};

export default withGetDataFromTree(withAuth(withAuthSecurity(withRoutesRules(CompanyInfoPage))));
