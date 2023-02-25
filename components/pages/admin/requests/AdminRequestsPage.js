import React, { useMemo } from 'react';
import useRouter from 'hooks/useRouter';

import { useCustomerCompanies } from 'lib/apollo/hooks/state/customerCompanies';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withRoutesRules from 'lib/roles/withRoutesRules';

import SearchForm from 'components/shared/molecules/SearchForm';
import AdminTemplate from 'components/shared/templates/AdminTemplate';
import ErrorPage from 'pages/_error';

import { NOT_VERIFIED, REJECTED } from 'config/constants/status';
import { URGENT } from './constants';

import RequestsFilter from './components/RequestsFilter';
import RequestCompanies from './components/RequestCompanies';

import { SearchWrapper } from './styled';

const config = {
  new: 'new',
  rejected: 'rejected',
  all: 'all',
};

export const AdminRequestsPage = ({ query }) => {
  const { searchQuery, filterBy = '', status } = query;
  const { pushRoute } = useRouter();

  const companyStatus = useMemo(() => {
    switch (status) {
      case config.new:
        return NOT_VERIFIED;
      case config.rejected:
        return REJECTED;
      case config.all:
        return null;
      default:
        return NOT_VERIFIED;
    }
  }, [status]);

  const customerCompaniesQuery = {
    deleted: false,
    statuses: [companyStatus],
    officialName: searchQuery,
    directions: filterBy ? filterBy.split(',').filter(item => item !== URGENT) : [],
    urgent: filterBy.split(',').includes(URGENT),
  };

  const { customerCompanies, loading, loadingMore, error, pageInfo, fetchMore } =
    useCustomerCompanies(customerCompaniesQuery);

  const onChangeTab = selectedTab => {
    pushRoute({
      query: {
        ...query,
        status: selectedTab,
      },
    });
  };

  const TABS = [
    {
      id: config.new,
      name: 'Новые заявки',
      action: () => onChangeTab(config.new),
    },
    {
      id: config.rejected,
      name: 'В редакции',
      action: () => onChangeTab(config.rejected),
    },
    {
      id: config.all,
      name: 'Все',
      action: () => onChangeTab(config.all),
    },
  ];

  const onLoadMore = async () => {
    if (loadingMore) return;
    await fetchMore({ variables: { after: pageInfo?.endCursor } });
  };

  if (!loading && error) return <ErrorPage statusCode={404} />;

  return (
    <AdminTemplate
      title="Заявки"
      tabs={TABS}
      activeId={status || config.new}
      testId="admin-requests-page"
    >
      <SearchWrapper>
        <SearchForm $width="43rem" rounded />
        <RequestsFilter query={query} />
      </SearchWrapper>

      <RequestCompanies
        customerCompanies={customerCompanies}
        loading={loading}
        pageInfo={pageInfo}
        onLoadMore={onLoadMore}
      />
    </AdminTemplate>
  );
};

export default withGetDataFromTree(withAuth(withAuthSecurity(withRoutesRules(AdminRequestsPage))));
