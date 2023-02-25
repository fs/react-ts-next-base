import React from 'react';
import { ADMIN_CHARACTERISTICS } from 'config/routes';

import withAuth from 'lib/auth/withAuth';
import withRoutesRules from 'lib/roles/withRoutesRules';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import { useProperties } from 'lib/apollo/hooks/state/properties';

import ErrorPage from 'pages/_error';
import Loader from 'components/shared/atoms/Loader';
import Breadcrumbs from 'components/shared/atoms/Breadcrumbs';
import AdminTemplate from 'components/shared/templates/AdminTemplate';

import PropertyForm from './components/PropertyForm';
import { ContentWrapper } from './styled';

export const AdminCharacteristicPage = ({ query }) => {
  const { propertyId } = query;

  const { properties, loading } = useProperties({ propertiesIds: [propertyId] });

  const [property] = properties;

  if (!loading && !property) return <ErrorPage statusCode={404} />;

  return (
    <AdminTemplate testId="admin-property-page">
      <ContentWrapper>
        <Breadcrumbs
          back
          url={ADMIN_CHARACTERISTICS}
          text="Вернуться ко всем Существующим"
          testId="admin-characteristic-page-loader"
          params={{ tab: 'EXISTED' }}
        />

        {loading ? <Loader /> : <PropertyForm property={property} />}
      </ContentWrapper>
    </AdminTemplate>
  );
};

export default withGetDataFromTree(
  withAuth(withAuthSecurity(withRoutesRules(AdminCharacteristicPage))),
);
