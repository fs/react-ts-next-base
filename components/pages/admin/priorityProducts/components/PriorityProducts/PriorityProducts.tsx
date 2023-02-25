import React, { FC } from 'react';

import InfinityList from 'components/shared/organisms/InfinityList';
import ProductCardSimple from 'components/shared/organisms/ProductCardSimple';

import { PriorityProductsWrapper, ProductCards } from './styled';
import { TPriorityProducts } from './types';

const PriorityProducts: FC<TPriorityProducts> = ({
  customerProducts,
  loading,
  hasNextPage,
  onLoadMore,
}) => {
  return (
    <PriorityProductsWrapper>
      <InfinityList
        dataLength={customerProducts.length}
        onLoadMore={onLoadMore}
        loading={loading}
        hasNextPage={hasNextPage}
        scrollableTarget="admin-template-content"
        $width="75rem"
      >
        <ProductCards>
          {customerProducts.map(product => (
            <ProductCardSimple product={product} key={product.id} variant="admin_priority" />
          ))}
        </ProductCards>
      </InfinityList>
    </PriorityProductsWrapper>
  );
};

export default PriorityProducts;
