import React, { useMemo } from 'react';
import { ADMIN_USERS } from 'config/routes';

import { useUsers } from 'lib/apollo/hooks/state/users';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withRoutesRules from 'lib/roles/withRoutesRules';

import ErrorPage from 'pages/_error';
import AdminTemplate from 'components/shared/templates/AdminTemplate';
import Loader from 'components/shared/atoms/Loader';
import Breadcrumbs from 'components/shared/atoms/Breadcrumbs';

import User from './components/User';
import { BreadcrumbsWrapper, Wrapper, ContentWrapper } from './styled';

const AdminUserPage = ({ query }) => {
  const { userId } = query;

  const { users, loading, error } = useUsers({
    ids: [userId],
  });

  const [user] = users;

  if (!loading && (error || !user)) return <ErrorPage statusCode={404} />;

  const breadcrumbsStatus = useMemo(() => {
    const { blockedAt } = user || {};
    return blockedAt ? 'blocked' : 'active';
  }, [user]);

  return (
    <AdminTemplate testId="admin-users-page">
      <Wrapper>
        <BreadcrumbsWrapper>
          <Breadcrumbs
            url={ADMIN_USERS}
            params={{ status: breadcrumbsStatus }}
            text="Вернуться в список пользователей"
            testId="breadcrumbs-request-users"
          />
        </BreadcrumbsWrapper>

        <ContentWrapper>{loading ? <Loader /> : <User user={user} />}</ContentWrapper>
      </Wrapper>
    </AdminTemplate>
  );
};

export default withGetDataFromTree(withAuth(withAuthSecurity(withRoutesRules(AdminUserPage))));
