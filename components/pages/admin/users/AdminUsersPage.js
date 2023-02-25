import React from 'react';
import useRouter from 'hooks/useRouter';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withRoutesRules from 'lib/roles/withRoutesRules';
import { useUsers } from 'lib/apollo/hooks/state/users';

import SearchForm from 'components/shared/molecules/SearchForm';
import AdminTemplate from 'components/shared/templates/AdminTemplate';
import UsersSorter from './components/UsersSorter';
import { SearchWrapper } from './styled';
import Users from './components/Users';

const USER_STATUS = {
  ACTIVE: 'active',
  BLOCKED: 'blocked',
};

const getBlockedStatus = status => {
  if (status === USER_STATUS.ACTIVE) {
    return false;
  }
  if (status === USER_STATUS.BLOCKED) {
    return true;
  }
  return undefined;
};

const AdminUsersPage = ({ query }) => {
  const { status = USER_STATUS.ACTIVE, searchQuery, sortOrder } = query;
  const { pushRoute } = useRouter();

  const onChangeTab = selectedTab => {
    pushRoute({
      query: {
        status: selectedTab,
      },
    });
  };

  const { users, loading, pageInfo, loadingMore, fetchMore } = useUsers({
    first: 12,
    searchQuery,
    orderBy: sortOrder,
    blocked: getBlockedStatus(status),
  });

  const onLoadMore = async () => {
    if (loadingMore) return;
    await fetchMore({ variables: { after: pageInfo?.endCursor } });
  };

  const TABS = [
    {
      id: USER_STATUS.ACTIVE,
      name: 'Активные',
      action: () => onChangeTab(USER_STATUS.ACTIVE),
    },
    {
      id: USER_STATUS.BLOCKED,
      name: 'Заблокированные',
      action: () => onChangeTab(USER_STATUS.BLOCKED),
    },
  ];

  return (
    <AdminTemplate
      title="Пользователи"
      tabs={TABS}
      activeId={status || USER_STATUS.ACTIVE}
      testId="admin-users-page"
    >
      <SearchWrapper>
        <SearchForm $width="43rem" rounded />
        <UsersSorter />
      </SearchWrapper>

      <Users users={users} loading={loading} pageInfo={pageInfo} onLoadMore={onLoadMore} />
    </AdminTemplate>
  );
};

export default withGetDataFromTree(withAuth(withAuthSecurity(withRoutesRules(AdminUsersPage))));
