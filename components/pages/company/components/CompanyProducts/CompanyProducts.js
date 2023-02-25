import React, { useState } from 'react';

import { useProducts } from 'lib/apollo/hooks/state/products';

import { EView } from 'public/styles/config/view';

import ProductCard from 'components/shared/organisms/ProductCard';
import InfinityList from 'components/shared/organisms/InfinityList';
import ProductListBar from 'components/shared/organisms/ProductListBar';
import EmptyListMessage from 'components/shared/molecules/EmptyListMessage';

import { Wrapper, ProductsWrapper, ActionsWrapper, Count } from './styled';

const CompanyProducts = ({ company, query = {} }) => {
  const { searchQuery } = query;
  const { id: companyId } = company;
  const [view, setView] = useState(EView.tile);

  const { products, totalCount, loading, loadingMore, pageInfo, fetchMore } = useProducts({
    companyIds: companyId,
    searchQuery,
  });
  const { endCursor, hasNextPage } = pageInfo;

  const onLoadMore = async () => {
    if (loadingMore) return;
    if (hasNextPage) {
      await fetchMore({ variables: { after: endCursor } });
    }
  };

  return (
    <Wrapper data-testid="company-products-tab">
      <Count data-testid="sellable-products-count">Количество товаров: {totalCount}</Count>

      {!loading && totalCount === 0 && !searchQuery ? (
        <EmptyListMessage text="У этой компании еще нет товаров" />
      ) : (
        <>
          <ActionsWrapper>
            <ProductListBar view={view} setView={setView} />
          </ActionsWrapper>

          <InfinityList
            onLoadMore={onLoadMore}
            loading={loading}
            hasNextPage={hasNextPage}
            dataLength={products.length}
            scrollableTarget="layout-template-content"
            titleEmptyMessage="По вашему запросу ничего не найдено"
            descriptionEmptyMessage="Попробуйте изменить формулировку или воспользуйтесь нашими фильтрами слева"
          >
            <ProductsWrapper view={view}>
              {products.map(product => {
                return <ProductCard product={product} view={view} key={product.id} />;
              })}
            </ProductsWrapper>
          </InfinityList>
        </>
      )}
    </Wrapper>
  );
};

export default CompanyProducts;
