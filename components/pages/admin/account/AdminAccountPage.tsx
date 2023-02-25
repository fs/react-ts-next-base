import React from 'react';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withRoutesRules from 'lib/roles/withRoutesRules';

import useCurrentUser from 'hooks/useCurrentUser';

import Loader from 'components/shared/atoms/Loader';
import AdminTemplate from 'components/shared/templates/AdminTemplate';

import { TNextPage } from 'lib/apollo/types';
import EditAdminAvatar from './components/EditAdminAvatar';
import EditAdminName from './components/EditAdminName';
import EditAdminInfo from './components/EditAdminInfo';
import EditAdminPassword from './components/EditAdminPassword';

import { Row } from './styled';

const AdminAccountPage: TNextPage = () => {
  const { user, loading } = useCurrentUser();

  return (
    <AdminTemplate title="Личный кабинет">
      {loading ? (
        <Loader />
      ) : (
        <Row>
          <EditAdminAvatar user={user} />
          <div>
            <EditAdminName user={user} />
            <EditAdminInfo user={user} />
            <EditAdminPassword />
          </div>
        </Row>
      )}
    </AdminTemplate>
  );
};

export default withGetDataFromTree(withAuth(withAuthSecurity(withRoutesRules(AdminAccountPage))));
