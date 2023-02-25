import React from 'react';
import useRouter from 'hooks/useRouter';
import { ParsedUrlQuery } from 'querystring';

import withAuth from 'lib/auth/withAuth';
import withRoutesRules from 'lib/roles/withRoutesRules';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import { useCustomerOrders } from 'lib/apollo/hooks/state/customerOrders';

import SearchForm from 'components/shared/molecules/SearchForm';
import AdminTemplate from 'components/shared/templates/AdminTemplate';
import ErrorPage from 'pages/_error';

import { TNextPage } from 'lib/apollo/types';
import { parseSearchQuery } from 'helpers';
import { findAvailableValue, findAvailableValues } from 'helpers/types';
import { OrderExecutionStatusEnum, OrderReservationStatusEnum } from 'graphql/types';
import { TConfig } from './types';

import CustomerOrders from './components/CustomerOrders';
import OrdersFilter from './components/OrdersFilter';

import {
  orderCheckoutStatus,
  orderExecutionStatuses,
  orderReservationStatuses,
  tabsConfig,
} from './constants';

import { SearchWrapper, Wrapper } from './styled';

const parseQuery = (
  query: ParsedUrlQuery,
): {
  searchQuery: string | null;
  tab: TConfig;
  filterBy: OrderExecutionStatusEnum[];
  reservationStatus: OrderReservationStatusEnum[];
} => {
  const tab = findAvailableValue(query.tab, Object.values(tabsConfig)) || tabsConfig.unformed;

  return {
    searchQuery: parseSearchQuery(query.searchQuery),
    tab,
    filterBy: findAvailableValues(query.filterBy, orderExecutionStatuses[tab]) || [],
    reservationStatus: findAvailableValues(query.filterBy, orderReservationStatuses[tab]) || [],
  };
};

export const AdminOrdersPage: TNextPage = ({ query }) => {
  const { searchQuery, tab, filterBy, reservationStatus } = parseQuery(query);
  const { pushRoute } = useRouter();

  const { customerOrders, loading, loadingMore, error, pageInfo, fetchMore } = useCustomerOrders({
    executionStatuses: filterBy.length <= 0 ? orderExecutionStatuses[tab] : filterBy,
    checkoutStatus: orderCheckoutStatus[tab],
    reservationStatuses: reservationStatus,
    first: 10,
    searchQuery,
  });

  const onChangeTab = (selectedTab: keyof typeof tabsConfig) => {
    pushRoute({
      query: {
        ...query,
        tab: selectedTab,
        filterBy: [],
      },
    });
  };

  const TABS = [
    {
      id: tabsConfig.unformed,
      name: 'Неоформленные',
      action: () => onChangeTab(tabsConfig.unformed),
    },
    {
      id: tabsConfig.processing,
      name: 'Заказы в процессе',
      action: () => onChangeTab(tabsConfig.processing),
    },
    {
      id: tabsConfig.finished,
      name: 'Завершенные',
      action: () => onChangeTab(tabsConfig.finished),
    },
  ];

  const onLoadMore = async () => {
    if (loadingMore) return;
    await fetchMore({ variables: { after: pageInfo?.endCursor } });
  };

  if (!loading && error) return <ErrorPage statusCode={404} />;

  const onChangeFilter = (params?: string) => {
    pushRoute({
      query: {
        ...query,
        filterBy: params,
      },
    });
  };

  return (
    <AdminTemplate title="Заказы" tabs={TABS} activeId={tab} testId="admin-orders-page">
      <Wrapper>
        <SearchWrapper>
          <SearchForm $width="43rem" rounded />
          <OrdersFilter
            onChange={onChangeFilter}
            activeTab={tab}
            filterBy={tab === 'unformed' ? reservationStatus : filterBy}
          />
        </SearchWrapper>

        <CustomerOrders
          orders={customerOrders}
          loading={loading}
          pageInfo={pageInfo}
          onLoadMore={onLoadMore}
        />
      </Wrapper>
    </AdminTemplate>
  );
};

export default withGetDataFromTree(withAuth(withAuthSecurity(withRoutesRules(AdminOrdersPage))));
