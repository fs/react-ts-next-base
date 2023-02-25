import React from 'react';

import ProductCard from 'components/shared/organisms/ProductCard';
import InfinityList from 'components/shared/organisms/InfinityList';
import EmptyListMessage from 'components/shared/molecules/EmptyListMessage';

import { ProductsWrapper } from './styled';

const ProductList = ({ view, onLoadMore, products, loading, hasNextPage, isSearch }) => {
  if (isSearch && !loading && products.length === 0)
    return <EmptyListMessage text="Товары отстутствуют" />;

  return (
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
  );
};

export default ProductList;
