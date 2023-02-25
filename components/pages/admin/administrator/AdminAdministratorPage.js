import React from 'react';

import { ADMIN_ADMINISTRATORS } from 'config/routes';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withRoutesRules from 'lib/roles/withRoutesRules';

import { useAdmins } from 'lib/apollo/hooks/state/admins';

import Loader from 'components/shared/atoms/Loader';
import Breadcrumbs from 'components/shared/atoms/Breadcrumbs';
import AdminTemplate from 'components/shared/templates/AdminTemplate';
import ErrorPage from 'pages/_error';

import AdministratorDetails from './components/AdministratorDetails';

import { Title, Content } from './styled';

export const AdminAdministratorPage = ({ query }) => {
  const { adminId } = query;

  const { admins, loading, error } = useAdmins({ ids: [adminId] });
  const [admin] = admins;

  if (!loading && error) return <ErrorPage statusCode={404} />;

  return (
    <AdminTemplate testId="administrator-page">
      <Breadcrumbs
        url={ADMIN_ADMINISTRATORS}
        text="Вернуться ко всем администраторам"
        testId="breadcrumbs-administrator"
      />
      <Title>Просмотр профиля администратора</Title>
      <Content>
        {loading ? (
          <Loader testId="administrator-page-loader" />
        ) : (
          <AdministratorDetails admin={admin} />
        )}
      </Content>
    </AdminTemplate>
  );
};

export default withGetDataFromTree(
  withAuth(withAuthSecurity(withRoutesRules(AdminAdministratorPage))),
);
