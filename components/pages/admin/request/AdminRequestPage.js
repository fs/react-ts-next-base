import React from 'react';

import { useCustomerCompanies } from 'lib/apollo/hooks/state/customerCompanies';

import { ADMIN_REQUESTS } from 'config/routes';
import { NOT_VERIFIED } from 'config/constants/status';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withRoutesRules from 'lib/roles/withRoutesRules';

import Loader from 'components/shared/atoms/Loader';
import Breadcrumbs from 'components/shared/atoms/Breadcrumbs';
import AdminCompanyInfo from 'components/shared/molecules/AdminCompanyInfo';
import AdminTemplate from 'components/shared/templates/AdminTemplate';
import ErrorPage from 'pages/_error';

import ConfirmCompany from './components/ConfirmCompany';

import { Wrapper, ContentWrapper } from './styled';

export const AdminRequestPage = ({ query }) => {
  const { companyId } = query;

  const { customerCompanies, loading, error } = useCustomerCompanies({
    companyId,
    statuses: [],
    deleted: false,
  });
  const [company] = customerCompanies;

  if (!loading && (error || !company)) return <ErrorPage statusCode={404} />;

  const showTime = company?.status === NOT_VERIFIED;

  return (
    <AdminTemplate testId="admin-request-page">
      <Wrapper>
        <Breadcrumbs
          url={ADMIN_REQUESTS}
          text="Вернуться к заявкам"
          testId="breadcrumbs-request-company"
        />

        <ContentWrapper>
          {loading ? (
            <Loader testId="admin-request-page-loader" />
          ) : (
            <>
              <AdminCompanyInfo company={company} showTime={showTime} />
              <ConfirmCompany company={company} />
            </>
          )}
        </ContentWrapper>
      </Wrapper>
    </AdminTemplate>
  );
};

export default withGetDataFromTree(withAuth(withAuthSecurity(withRoutesRules(AdminRequestPage))));
