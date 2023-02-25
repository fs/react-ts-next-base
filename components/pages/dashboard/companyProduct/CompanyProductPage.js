import React from 'react';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withRoutesRules from 'lib/roles/withRoutesRules';

import { useMyProducts } from 'lib/apollo/hooks/state/myProducts';

import ErrorPage from 'pages/_error';
import LayoutTemplate from 'components/shared/templates/LayoutTemplate';

import { DASHBOARD_COMPANY_PRODUCTS } from 'config/routes';
import ProductContent from '../../product/components/ProductContent';

import { PageContainer } from './styled';

const CompanyProductPage = ({ query }) => {
  const { productId } = query;

  const { products, loading } = useMyProducts({ productIds: productId });
  const [product] = products;

  if (!loading && (!product || product?.draft)) return <ErrorPage statusCode={404} />;

  return (
    <LayoutTemplate testId="product-page">
      <PageContainer>
        <ProductContent
          product={product}
          loading={loading}
          defaultUrl={DASHBOARD_COMPANY_PRODUCTS}
        />
      </PageContainer>
    </LayoutTemplate>
  );
};

export default withGetDataFromTree(withAuth(withAuthSecurity(withRoutesRules(CompanyProductPage))));
