import React from 'react';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withRoutesRules from 'lib/roles/withRoutesRules';

import { useMyCompanies } from 'lib/apollo/hooks/state/myCompanies';
import { useMyProducts } from 'lib/apollo/hooks/state/myProducts';

import { DASHBOARD_COMPANY_PRODUCTS } from 'config/routes';

import ErrorPage from 'pages/_error';
import Loader from 'components/shared/atoms/Loader';
import Breadcrumbs from 'components/shared/atoms/Breadcrumbs';
import CompanyTemplate from 'components/shared/templates/CompanyTemplate';

import { productTypes } from '../constants';

import CreateProductContent from '../components/CreateProductContent';

import { Wrapper, Content } from './styled';

export const CreateProductPage = ({ query }) => {
  const { companyId, productId } = query;
  const { myCompanies, loading } = useMyCompanies({ companyIds: [companyId] });
  const [company] = myCompanies;
  const { products, loading: productsLoading } = useMyProducts({
    companyIds: [companyId],
    productIds: [productId],
  });
  const [product] = products;
  const isEditableProduct = product?.draft || product?.template;

  if ((!company || !product) && !loading && !productsLoading) return <ErrorPage statusCode={404} />;

  return (
    <CompanyTemplate testId="create-product-page" company={company}>
      <Wrapper>
        <Breadcrumbs
          url={DASHBOARD_COMPANY_PRODUCTS}
          text="Мои товары"
          params={{
            companyId,
            type: product?.template ? productTypes.TEMPLATE : productTypes.DRAFT,
          }}
        />
        <Content>
          {productsLoading ? (
            <Loader testId="create-product-page-loader" />
          ) : (
            !!isEditableProduct && (
              <CreateProductContent product={product} companyId={companyId} query={query} />
            )
          )}
        </Content>
      </Wrapper>
    </CompanyTemplate>
  );
};

export default withGetDataFromTree(withAuth(withAuthSecurity(withRoutesRules(CreateProductPage))));
