import React from 'react';
import { ADMIN_ADDRESSES } from 'config/routes';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withRoutesRules from 'lib/roles/withRoutesRules';

import { useCustomerCompanyLocations } from 'lib/apollo/hooks/state/companyLocations';

import Loader from 'components/shared/atoms/Loader';
import Breadcrumbs from 'components/shared/atoms/Breadcrumbs';
import AdminTemplate from 'components/shared/templates/AdminTemplate';

import ErrorPage from 'pages/_error';
import AddressCard from './components/AddressCard';

export const AdminAddressPage = ({ query }) => {
  const { addressId } = query;

  const { locations, loading, error } = useCustomerCompanyLocations({ ids: [addressId] });
  const [location] = locations;

  if (!loading && (error || !location)) return <ErrorPage statusCode={404} />;

  return (
    <AdminTemplate testId="admin-address-page">
      <Breadcrumbs
        url={ADMIN_ADDRESSES}
        text="Вернуться ко всем Адресам"
        testId="breadcrumbs-address-admin"
      />
      {loading ? (
        <Loader testId="admin-address-page-loader" />
      ) : (
        <AddressCard location={location} />
      )}
    </AdminTemplate>
  );
};

export default withGetDataFromTree(withAuth(withAuthSecurity(withRoutesRules(AdminAddressPage))));
