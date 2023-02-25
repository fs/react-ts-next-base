import React from 'react';
import { ParsedUrlQuery } from 'querystring';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withRoutesRules from 'lib/roles/withRoutesRules';

import { useMyCompanies } from 'lib/apollo/hooks/state/myCompanies';

import { DASHBOARD_COMPANY_PRODUCTS } from 'config/routes';
import { ProductDraftStepEnum } from 'graphql/types';
import { TNextPage } from 'lib/apollo/types';

import ErrorPage from 'pages/_error';
import Loader from 'components/shared/atoms/Loader';
import Breadcrumbs from 'components/shared/atoms/Breadcrumbs';
import CompanyTemplate from 'components/shared/templates/CompanyTemplate';

import { productTypes } from '../constants';

import CreateProductPager from '../components/CreateProductPager';
import CreateProductBasic from '../components/CreateProductBasic';

import { Wrapper, Content } from './styled';

const parseQuery = (query: ParsedUrlQuery) => {
  return {
    companyId:
      Array.isArray(query.companyId) || query.companyId === undefined ? '' : query.companyId,
  };
};

export const CreateProductDraftPage: TNextPage = ({ query }) => {
  const { companyId } = parseQuery(query);
  const { myCompanies, loading } = useMyCompanies({ companyIds: [companyId] });
  const [company] = myCompanies;

  if (!loading && !company) return <ErrorPage statusCode={404} />;

  return (
    <CompanyTemplate testId="create-product-page" company={company}>
      <Wrapper>
        <Breadcrumbs
          url={DASHBOARD_COMPANY_PRODUCTS}
          text="Мои товары"
          params={{ companyId, type: productTypes.DRAFT }}
        />
        <Content>
          {loading ? (
            <Loader testId="create-product-page-loader" />
          ) : (
            <>
              <CreateProductPager readOnly={false} draftStep={ProductDraftStepEnum.Basic} />
              <CreateProductBasic isDraft={false} query={query} />
            </>
          )}
        </Content>
      </Wrapper>
    </CompanyTemplate>
  );
};

export default withGetDataFromTree(
  withAuth(withAuthSecurity(withRoutesRules(CreateProductDraftPage))),
);
