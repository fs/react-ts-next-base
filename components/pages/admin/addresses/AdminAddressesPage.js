import React, { useMemo } from 'react';
import useRouter from 'hooks/useRouter';

import { NOT_VERIFIED, VERIFIED, REJECTED } from 'config/constants/status';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withRoutesRules from 'lib/roles/withRoutesRules';

import { useCustomerCompanyLocations } from 'lib/apollo/hooks/state/companyLocations';

import SearchForm from 'components/shared/molecules/SearchForm';
import AdminTemplate from 'components/shared/templates/AdminTemplate';

import AdminLocationsContent from './components/AdminLocationsContent';

export const TABS_CONFIG = {
  NEW: 'NEW',
  REJECTED: 'REJECTED',
  EXISTING: 'EXISTING',
};

export const AdminAddressesPage = () => {
  const { pushRoute, query } = useRouter();
  const { tab, searchQuery } = query;
  const currentTab = tab || TABS_CONFIG.NEW;

  const statuses = useMemo(() => {
    switch (currentTab) {
      case TABS_CONFIG.NEW:
        return [NOT_VERIFIED];
      case TABS_CONFIG.REJECTED:
        return [REJECTED];
      case TABS_CONFIG.EXISTING:
        return [VERIFIED];
      default:
        return [];
    }
  }, [tab]);

  const { locations, loading, loadingMore, pageInfo, fetchMore } = useCustomerCompanyLocations({
    companyName: searchQuery,
    first: 12,
    statuses,
  });

  const onChangeTab = selectedTab => {
    pushRoute({
      query: {
        ...query,
        tab: selectedTab,
      },
    });
  };

  const TABS = [
    {
      id: TABS_CONFIG.NEW,
      name: 'Новые',
      action: () => onChangeTab(TABS_CONFIG.NEW),
    },
    {
      id: TABS_CONFIG.REJECTED,
      name: 'В редакции',
      action: () => onChangeTab(TABS_CONFIG.REJECTED),
    },
    {
      id: TABS_CONFIG.EXISTING,
      name: 'Существующие',
      action: () => onChangeTab(TABS_CONFIG.EXISTING),
    },
  ];

  return (
    <AdminTemplate
      title="Адреса и лицензии"
      activeId={currentTab}
      tabs={TABS}
      testId="admin-addresses-page"
    >
      <SearchForm $width="43rem" $mr={10} rounded />
      <AdminLocationsContent
        loading={loading}
        pageInfo={pageInfo}
        fetchMore={fetchMore}
        locations={locations}
        loadingMore={loadingMore}
      />
    </AdminTemplate>
  );
};

export default withGetDataFromTree(withAuth(withAuthSecurity(withRoutesRules(AdminAddressesPage))));
