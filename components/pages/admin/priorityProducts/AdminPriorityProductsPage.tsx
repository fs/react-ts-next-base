import React from 'react';
import { ParsedUrlQuery } from 'querystring';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withRoutesRules from 'lib/roles/withRoutesRules';

import { useCustomerProducts } from 'lib/apollo/hooks/state/customerProducts';

import { parseSearchQuery } from 'helpers';
import { StatusEnum } from 'graphql/types';
import { TNextPage } from 'lib/apollo/types';

import SearchForm from 'components/shared/molecules/SearchForm';
import AdminTemplate from 'components/shared/templates/AdminTemplate';
import ErrorPage from 'pages/_error';

import PriorityProducts from './components/PriorityProducts';

const parseQuery = (query: ParsedUrlQuery) => {
  return {
    searchQuery: parseSearchQuery(query.searchQuery),
  };
};

export const AdminPriorityProductsPage: TNextPage = ({ query }) => {
  const { searchQuery } = parseQuery(query);

  const { customerProducts, loading, error, pageInfo, fetchMore, loadingMore } =
    useCustomerProducts({
      searchQuery,
      first: 12,
      statuses: [StatusEnum.Verified, StatusEnum.OutOfStock],
      deleted: false,
      draft: false,
      template: false,
    });

  const onLoadMore = async () => {
    if (loadingMore) return;
    await fetchMore({ variables: { after: pageInfo?.endCursor } });
  };

  if (!loading && error) return <ErrorPage statusCode={404} />;

  return (
    <AdminTemplate testId="admin-priority-products-page" title="Приоритетная выдача">
      <SearchForm $width="43rem" $mb={32} rounded />
      <PriorityProducts
        customerProducts={customerProducts}
        loading={loading}
        hasNextPage={pageInfo.hasNextPage}
        onLoadMore={onLoadMore}
      />
    </AdminTemplate>
  );
};

export default withGetDataFromTree(
  withAuth(withAuthSecurity(withRoutesRules(AdminPriorityProductsPage))),
);
