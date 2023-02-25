import React from 'react';
import useRouter from 'hooks/useRouter';
import { ParsedUrlQuery } from 'querystring';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withRoutesRules from 'lib/roles/withRoutesRules';

import useCurrentUser from 'hooks/useCurrentUser';

import userHasAccess from 'rbac/userHasAccess';
import { createCompanyRule } from 'rbac/rules';
import getRole from 'helpers/getRole';

import { useMyCompanies } from 'lib/apollo/hooks/state/myCompanies';

import { findAvailableValue } from 'helpers/types';
import { CompanyDirectionEnum } from 'graphql/types';

import Loader from 'components/shared/atoms/Loader';
import Tabs from 'components/shared/molecules/Tabs';
import DashboardTemplate from 'components/shared/templates/DashboardTemplate';

import { TNextPage } from 'lib/apollo/types';
import NoCompaniesMessage from '../components/NoCompaniesMessage';
import CompaniesList from '../components/CompaniesList';
import EmployeeControl from '../components/EmployeeControl';

const names = {
  SELLER: 'Личный кабинет продавца',
  BUYER: 'Личный кабинет покупателя',
};

const parseQuery = (query: ParsedUrlQuery) => {
  const direction =
    findAvailableValue(query.direction, Object.values(CompanyDirectionEnum)) ||
    CompanyDirectionEnum.Seller;
  return {
    direction,
  };
};

export const DashboardPage: TNextPage = ({ query }) => {
  const { direction } = parseQuery(query);
  const { pushRoute } = useRouter();
  const { user } = useCurrentUser();
  const isShowCreateCompanyButton = userHasAccess(getRole(user?.role?.id), createCompanyRule);

  const {
    noCompanies,
    loading: loadingCheck,
    refetch: refetchCompaniesCheck,
  } = useMyCompanies({ first: 2 });

  const {
    myCompanies,
    loading: companyLoading,
    pageInfo,
    fetchMore,
    loadingMore,
  } = useMyCompanies({
    directions: [direction],
    first: isShowCreateCompanyButton ? 11 : 12,
  });

  const reservedGuestOrders =
    user?.guestUserOrders?.filter(({ order }) => {
      return order.checkoutStatus === 'RESERVED';
    }) || [];

  const hasReservedGuestOrders = reservedGuestOrders?.length > 0;
  const [guestOrder] = reservedGuestOrders;

  const preparedQuery = { ...query, direction };

  const onLoadMore = async () => {
    if (loadingMore) return;
    await fetchMore({ variables: { after: pageInfo?.endCursor, first: 12 } });
  };

  const TABS = [
    {
      id: CompanyDirectionEnum.Seller,
      name: names.SELLER,
      action: () => pushRoute({ query: { direction: CompanyDirectionEnum.Seller } }),
    },
    {
      id: CompanyDirectionEnum.Buyer,
      name: names.BUYER,
      action: () => pushRoute({ query: { direction: CompanyDirectionEnum.Buyer } }),
    },
  ];

  return (
    <DashboardTemplate
      testId="dashboard-page"
      sidebarContent={<EmployeeControl />}
      query={preparedQuery}
    >
      {loadingCheck ? (
        <Loader testId="dashboard-page-loader" />
      ) : !noCompanies ? (
        <>
          <Tabs tabs={TABS} activeId={direction} />
          <CompaniesList
            activeDirection={direction}
            myCompanies={myCompanies}
            loading={companyLoading}
            onLoadMore={onLoadMore}
            pageInfo={pageInfo}
            refetchCompaniesCheck={refetchCompaniesCheck}
            fetchMoreCompanies={fetchMore}
          />
        </>
      ) : (
        <NoCompaniesMessage
          hasReservedGuestOrders={hasReservedGuestOrders}
          expiredAt={guestOrder?.order.expiredAt}
        />
      )}
    </DashboardTemplate>
  );
};

export default withGetDataFromTree(withAuth(withAuthSecurity(withRoutesRules(DashboardPage))));
