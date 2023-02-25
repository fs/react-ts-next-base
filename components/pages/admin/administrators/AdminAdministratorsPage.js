import React from 'react';

import { ADMIN_CREATE_ADMINISTRATOR } from 'config/routes';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withRoutesRules from 'lib/roles/withRoutesRules';

import { useAdmins } from 'lib/apollo/hooks/state/admins';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';
import Loader from 'components/shared/atoms/Loader';
import AdminTemplate from 'components/shared/templates/AdminTemplate';
import ErrorPage from 'pages/_error';

import AdministratorsList from './components/AdministratorsList';

import { Content } from './styled';

export const AdminAdministratorsPage = () => {
  const { admins, loading, error } = useAdmins({});

  if (!loading && error) return <ErrorPage statusCode={404} />;

  return (
    <AdminTemplate title="Администраторы" testId="administrators-page">
      <Content>
        {loading ? (
          <Loader testId="administrators-page-loader" />
        ) : (
          <>
            <Button
              label="Пригласить нового администратора"
              shape="extra-rounded"
              size="large"
              iconType="leading"
              icon={<Icon name="plus" $color="white" />}
              href={ADMIN_CREATE_ADMINISTRATOR}
              passHref
            />
            <AdministratorsList admins={admins} />
          </>
        )}
      </Content>
    </AdminTemplate>
  );
};

export default withGetDataFromTree(
  withAuth(withAuthSecurity(withRoutesRules(AdminAdministratorsPage))),
);
