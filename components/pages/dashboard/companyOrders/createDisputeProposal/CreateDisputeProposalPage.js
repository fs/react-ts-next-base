import React from 'react';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withRoutesRules from 'lib/roles/withRoutesRules';

import { DASHBOARD_COMPANY_ORDERS } from 'config/routes';

import { useMyCompanies } from 'lib/apollo/hooks/state/myCompanies';
import { useOrders } from 'lib/apollo/hooks/state/orders';

import { getStatus } from 'config/constants/status';
import { PLACED } from 'config/constants/checkoutStatus';
import { EXECUTION_STATUS } from 'config/constants/executionStatus';
import { SELLER } from 'config/constants/directions';

import ErrorPage from 'pages/_error';
import Loader from 'components/shared/atoms/Loader';
import Breadcrumbs from 'components/shared/atoms/Breadcrumbs';
import EmptyMessageCheckingCompany from 'components/shared/molecules/EmptyMessageCheckingCompany';
import CompanyTemplate from 'components/shared/templates/CompanyTemplate';

import CreateDisputeProposal from '../components/CreateDisputeProposal';

import { Wrapper, Content } from './styled';

const { DISPUTE_OPENED, MEDAGREGATOR_INTERVENED } = EXECUTION_STATUS;

const CreateDisputeProposalPage = ({ query }) => {
  const { companyId, orderId } = query;

  const { myCompanies, loading } = useMyCompanies({ companyIds: [companyId] });
  const { loading: loadingOrders, orders } = useOrders({
    companyId,
    checkoutStatus: PLACED,
    orderId,
  });
  const [company] = myCompanies;
  const [order] = orders;

  const isSeller = company?.direction === SELLER;
  const isCompanyVerified = getStatus(company?.status);
  const breadcrumbsParams = {
    companyId,
    disputes:
      [DISPUTE_OPENED || MEDAGREGATOR_INTERVENED].includes(order?.executionStatus) || undefined,
  };

  if ((!company && !loading) || (!order && !loadingOrders)) return <ErrorPage statusCode={404} />;

  return (
    <CompanyTemplate testId="company-create-dispute-page" company={company}>
      <Wrapper>
        <Breadcrumbs
          url={DASHBOARD_COMPANY_ORDERS}
          params={breadcrumbsParams}
          text="Вернуться ко всем спорам"
          testId="breadcrumbs-create-dispute-proposal"
        />
        <Content>
          {!loading && !loadingOrders ? (
            <>
              {isCompanyVerified ? (
                <CreateDisputeProposal query={query} order={order} isSeller={isSeller} />
              ) : (
                <EmptyMessageCheckingCompany />
              )}
            </>
          ) : (
            <Loader testId="company-create-dispute-loader" />
          )}
        </Content>
      </Wrapper>
    </CompanyTemplate>
  );
};

export default withGetDataFromTree(
  withAuth(withAuthSecurity(withRoutesRules(CreateDisputeProposalPage))),
);
