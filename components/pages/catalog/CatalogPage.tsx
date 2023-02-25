import React, { useState, useEffect } from 'react';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withRoutesRules from 'lib/roles/withRoutesRules';

import { useProducts } from 'lib/apollo/hooks/state/products';

import ErrorPage from 'pages/_error';
import LayoutTemplate from 'components/shared/templates/LayoutTemplate';

import { TNextPage } from 'lib/apollo/types';
import CatalogList from './components/CatalogList';
import CatalogTabs from './components/CatalogTabs';

import { catalogCategories } from './constants';
import { getQueryParamsByCategory, prepareProperties } from './utils';

import { PageContainer, TabsWrapper } from './styled';

const CatalogPage: TNextPage = ({ query = {} }) => {
  const activeCategory = query.category || catalogCategories.ALL;
  const [preparedQuery, setPreparedQuery] = useState<typeof query>({
    ...query,
    category: activeCategory,
  });
  const [specialFiltersQuery, setSpecialFiltersQuery] = useState({});
  const { category } = preparedQuery;

  const { products, loading, loadingMore, error, pageInfo, fetchMore } = useProducts({
    ...getQueryParamsByCategory(category),
    ...prepareProperties(preparedQuery),
    ...specialFiltersQuery,
  });
  const { endCursor, hasNextPage } = pageInfo;

  const onLoadMore = async () => {
    if (loadingMore) return;
    if (hasNextPage) {
      await fetchMore({ variables: { after: endCursor } });
    }
  };

  useEffect(() => {
    setPreparedQuery({
      ...query,
      searchQuery: query?.searchQuery || undefined,
      orderBy: query?.sortOrder,
      category: activeCategory,
      categoryIds:
        query?.subsection || query?.section || query?.subcategory || query?.currentCategory,
    });
  }, [query]);

  if (!loading && error) return <ErrorPage statusCode={404} />;

  return (
    <LayoutTemplate testId="catalog-page">
      <TabsWrapper>
        <CatalogTabs query={query} />
      </TabsWrapper>
      <PageContainer>
        <CatalogList
          onLoadMore={onLoadMore}
          products={products}
          preparedQuery={preparedQuery}
          setSpecialFiltersQuery={setSpecialFiltersQuery}
          loading={loading}
          hasNextPage={hasNextPage}
          isSearch={!!query?.searchQuery}
        />
      </PageContainer>
    </LayoutTemplate>
  );
};

export default withGetDataFromTree(withAuth(withRoutesRules(CatalogPage)));
