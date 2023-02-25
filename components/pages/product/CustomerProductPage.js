import React from 'react';
import { ADMIN_PRODUCTS } from 'config/routes';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withRoutesRules from 'lib/roles/withRoutesRules';

import { useCustomerProducts } from 'lib/apollo/hooks/state/customerProducts';

import ErrorPage from 'pages/_error';
import AdminTemplate from 'components/shared/templates/AdminTemplate';

import ProductContent from './components/ProductContent';

const CustomerProductPage = ({ query }) => {
  const { productId } = query;

  const { customerProducts, loading } = useCustomerProducts({ productIds: [productId] });
  const [product] = customerProducts;

  if (!product && !loading) return <ErrorPage statusCode={404} />;

  return (
    <AdminTemplate showSidebar={false}>
      <ProductContent defaultUrl={ADMIN_PRODUCTS} product={product} loading={loading} />
    </AdminTemplate>
  );
};

export default withGetDataFromTree(withAuth(withRoutesRules(CustomerProductPage)));
