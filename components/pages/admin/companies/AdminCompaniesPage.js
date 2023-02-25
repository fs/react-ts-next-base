import React from 'react';
import useRouter from 'hooks/useRouter';

import withAuth from 'lib/auth/withAuth';
import withRoutesRules from 'lib/roles/withRoutesRules';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withAuthSecurity from 'lib/auth/withAuthSecurity';

import { useCustomerCompanies } from 'lib/apollo/hooks/state/customerCompanies';

import SearchForm from 'components/shared/molecules/SearchForm';
import AdminTemplate from 'components/shared/templates/AdminTemplate';
import ErrorPage from 'pages/_error';

import { BUYER, SELLER } from 'config/constants/directions';
import { BLACKLISTED, VERIFIED, DELETED } from 'config/constants/status';

import Companies from './components/Companies';

const AdminCompaniesPage = () => {
  const { pushRoute, query } = useRouter();
  const { searchQuery, tab = SELLER } = query;

  const onChangeTab = selectedTab => {
    pushRoute({
      query: {
        tab: selectedTab,
      },
    });
  };

  const customerCompaniesQuery = {
    deleted: tab === DELETED,
    statuses: tab === BLACKLISTED ? [BLACKLISTED] : [VERIFIED],
    officialName: searchQuery,
    directions: tab === SELLER || tab === BUYER ? [tab] : [],
  };

  const { customerCompanies, loading, error, pageInfo, fetchMore, loadingMore } =
    useCustomerCompanies(customerCompaniesQuery);

  const onLoadMore = async () => {
    if (loadingMore) return;
    await fetchMore({ variables: { after: pageInfo?.endCursor } });
  };

  if (!loading && error) return <ErrorPage statusCode={404} />;

  const TABS = [
    {
      id: SELLER,
      name: 'Продавцы',
      action: () => onChangeTab(SELLER),
    },
    {
      id: BUYER,
      name: 'Покупатели',
      action: () => onChangeTab(BUYER),
    },
    {
      id: BLACKLISTED,
      name: 'Черный список',
      action: () => onChangeTab(BLACKLISTED),
    },
    {
      id: DELETED,
      name: 'Удаленные',
      action: () => onChangeTab(DELETED),
    },
  ];

  return (
    <AdminTemplate tabs={TABS} activeId={tab || SELLER} title="Компании">
      <SearchForm $width="43rem" $mb={32} rounded />
      <Companies
        customerCompanies={customerCompanies}
        loading={loading}
        pageInfo={pageInfo}
        onLoadMore={onLoadMore}
      />
    </AdminTemplate>
  );
};

export default withGetDataFromTree(withAuth(withAuthSecurity(withRoutesRules(AdminCompaniesPage))));
