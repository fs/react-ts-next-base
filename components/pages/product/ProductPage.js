import React from 'react';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withRoutesRules from 'lib/roles/withRoutesRules';

import { useProducts } from 'lib/apollo/hooks/state/products';

import ErrorPage from 'pages/_error';
import LayoutTemplate from 'components/shared/templates/LayoutTemplate';

import { HOME } from 'config/routes';
import ProductContent from './components/ProductContent';

import { PageContainer } from './styled';

const ProductPage = ({ query }) => {
  const { productId } = query;

  const { products, loading } = useProducts({ productIds: productId });
  const [product] = products;

  if (!product && !loading) return <ErrorPage statusCode={404} />;

  return (
    <LayoutTemplate testId="product-page">
      <PageContainer>
        <ProductContent product={product} defaultUrl={HOME} loading={loading} />
      </PageContainer>
    </LayoutTemplate>
  );
};

export default withGetDataFromTree(withAuth(withRoutesRules(ProductPage)));
