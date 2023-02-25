import React, { useMemo } from 'react';

import { useCustomerCompanies } from 'lib/apollo/hooks/state/customerCompanies';

import { ADMIN_COMPANIES } from 'config/routes';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withRoutesRules from 'lib/roles/withRoutesRules';

import Loader from 'components/shared/atoms/Loader';
import Breadcrumbs from 'components/shared/atoms/Breadcrumbs';
import AdminTemplate from 'components/shared/templates/AdminTemplate';
import ErrorPage from 'pages/_error';

import { BLACKLISTED, DELETED } from 'config/constants/status';
import CompanyInfo from './components/CompanyInfo';

import { Wrapper, ContentWrapper, BreadcrumbsWrapper } from './styled';

export const AdminCompanyPage = ({ query }) => {
  const { companyId } = query;

  const { customerCompanies, loading, error } = useCustomerCompanies({ companyId });
  const [company] = customerCompanies;

  const breadcrumbsTab = useMemo(() => {
    const { status, deletionReason, direction } = company || {};
    if (status === BLACKLISTED) return BLACKLISTED;
    if (deletionReason) return DELETED;
    return direction;
  }, [company]);

  if (!loading && (error || !company)) return <ErrorPage statusCode={404} />;

  return (
    <AdminTemplate testId="admin-company-page">
      <Wrapper>
        <BreadcrumbsWrapper>
          <Breadcrumbs
            url={ADMIN_COMPANIES}
            params={{ tab: breadcrumbsTab }}
            text="Вернуться к предыдущей странице"
            testId="breadcrumbs-company"
            back
          />
        </BreadcrumbsWrapper>
        <ContentWrapper>
          {loading ? (
            <Loader testId="admin-company-page-loader" />
          ) : (
            <>
              <CompanyInfo company={company} />
            </>
          )}
        </ContentWrapper>
      </Wrapper>
    </AdminTemplate>
  );
};

export default withGetDataFromTree(withAuth(withAuthSecurity(withRoutesRules(AdminCompanyPage))));
