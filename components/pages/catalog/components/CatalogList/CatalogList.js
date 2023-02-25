import React, { useState } from 'react';

import { EView } from 'public/styles/config/view';

import ProductListBar from 'components/shared/organisms/ProductListBar';
import Note from 'components/pages/catalog/components/CatalogList/components/Note';

import Filters from '../Filters';
import ProductList from '../ProductsList/ProductList';
import CategoryBreadcrumbs from './components/CategoryBreadcrumbs/CategoryBreadcrumbs';

import { Content, ProductsContentWrapper, ProductsListWrapper } from './styled';

const CatalogList = ({
  onLoadMore,
  products,
  preparedQuery,
  setSpecialFiltersQuery,
  loading,
  hasNextPage,
  isSearch,
}) => {
  const [view, setView] = useState(EView.tile);

  return (
    <Content>
      <ProductsContentWrapper>
        <Filters query={preparedQuery} setSpecialFiltersQuery={setSpecialFiltersQuery} />
        <div>
          <Note />
          <ProductListBar view={view} setView={setView} />
          <CategoryBreadcrumbs />

          <ProductsListWrapper>
            <ProductList
              view={view}
              onLoadMore={onLoadMore}
              products={products}
              loading={loading}
              hasNextPage={hasNextPage}
              isSearch={isSearch}
            />
          </ProductsListWrapper>
        </div>
      </ProductsContentWrapper>
    </Content>
  );
};

export default CatalogList;
