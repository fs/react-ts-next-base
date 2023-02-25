import React from 'react';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withRoutesRules from 'lib/roles/withRoutesRules';

import { useMyCompanies } from 'lib/apollo/hooks/state/myCompanies';

import { getStatus } from 'config/constants/status';
import { AccountOperationStatusEnum } from 'graphql/types';
import { DASHBOARD_COMPANY_ANALYTICAL_ACCOUNT } from 'config/routes';

import ErrorPage from 'pages/_error';
import Tooltip from 'components/shared/atoms/Tooltip';
import Icon from 'components/shared/atoms/Icon';
import Loader from 'components/shared/atoms/Loader';
import Breadcrumbs from 'components/shared/atoms/Breadcrumbs';
import SearchForm from 'components/shared/molecules/SearchForm';
import CompanyTemplate from 'components/shared/templates/CompanyTemplate';
import EmptyMessageCheckingCompany from 'components/shared/molecules/EmptyMessageCheckingCompany';

import OperationsList from '../companyAnalyticalAccount/components/OperationsList';

import { Wrapper, Subtitle } from './styled';

const CompanyPendingAccountOperationsPage = ({ query }) => {
  const { companyId } = query;

  const { myCompanies, loading } = useMyCompanies({ companyIds: [companyId] });
  const [company] = myCompanies;

  const isCompanyVerified = getStatus(company?.status);

  if (!company && !loading) return <ErrorPage statusCode={404} />;

  return (
    <CompanyTemplate testId="company-pending-account-operations-page" company={company}>
      <Wrapper>
        <Breadcrumbs
          url={DASHBOARD_COMPANY_ANALYTICAL_ACCOUNT}
          params={{ companyId }}
          text="Вернуться к аналитическому счёту"
          testId="breadcrumbs-company-pending-account-operations"
        />
        <Subtitle>
          Замороженные средства:
          <Tooltip text="Средства, участвующие в сделках и транзакции в процессе пополнения/вывода средств">
            <Icon name="question" $color="greyA4" $size={18} />
          </Tooltip>
        </Subtitle>
        {!loading ? (
          <>
            {isCompanyVerified ? (
              <>
                <SearchForm $width="30rem" $mb={24} $mt={32} placeholder="Поиск по номеру заказа" />
                <OperationsList
                  statuses={[AccountOperationStatusEnum.Pending]}
                  company={company}
                  query={query}
                />
              </>
            ) : (
              <EmptyMessageCheckingCompany />
            )}
          </>
        ) : (
          <Loader testId="company-pending-account-operations-loader" />
        )}
      </Wrapper>
    </CompanyTemplate>
  );
};

export default withGetDataFromTree(
  withAuth(withAuthSecurity(withRoutesRules(CompanyPendingAccountOperationsPage))),
);
