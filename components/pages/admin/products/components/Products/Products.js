import React from 'react';

import InfinityList from 'components/shared/organisms/InfinityList';
import ProductCardSimple from 'components/shared/organisms/ProductCardSimple';

import { RequestCompaniesWrapper, ProductCards } from './styled';

const Products = ({ customerProducts, loading, pageInfo, onLoadMore }) => {
  return (
    <RequestCompaniesWrapper>
      <InfinityList
        dataLength={customerProducts.length}
        onLoadMore={onLoadMore}
        loading={loading}
        hasNextPage={pageInfo?.hasNextPage}
        scrollableTarget="admin-template-content"
        $width="75rem"
      >
        <ProductCards>
          {customerProducts.map(product => (
            <ProductCardSimple key={product?.id} product={product} />
          ))}
        </ProductCards>
      </InfinityList>
    </RequestCompaniesWrapper>
  );
};

export default Products;
