import React from 'react';

import { ADMIN_ADMINISTRATORS } from 'config/routes';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withRoutesRules from 'lib/roles/withRoutesRules';

import Breadcrumbs from 'components/shared/atoms/Breadcrumbs';
import AdminTemplate from 'components/shared/templates/AdminTemplate';

import CreateAdministrator from './components/CreateAdministrator';

import { Title } from './styled';

export const AdminCreateAdministratorPage = () => {
  return (
    <AdminTemplate testId="create-administrators-page">
      <Breadcrumbs
        url={ADMIN_ADMINISTRATORS}
        text="Вернуться ко всем администраторам"
        testId="breadcrumbs-invite-administrator"
      />
      <Title>Пригласить администратора</Title>
      <CreateAdministrator />
    </AdminTemplate>
  );
};

export default withGetDataFromTree(
  withAuth(withAuthSecurity(withRoutesRules(AdminCreateAdministratorPage))),
);
