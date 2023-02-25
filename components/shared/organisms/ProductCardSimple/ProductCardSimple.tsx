import React, { FC } from 'react';

import Icon from 'components/shared/atoms/Icon';

import ProductCardSimpleStatus from './components/ProductCardSimpleStatus';
import ProductCardSimpleContent from './components/ProductCardSimpleContent';
import ProductCardSimpleActions from './components/ProductCardSimpleActions';

import { ProductWrapper, ProductCardContent, PriorityCorner } from './styled';
import { TProductCardSimple } from './types';

const ProductCardSimple: FC<TProductCardSimple> = ({ product, variant = 'default' }) => {
  const {
    id: productId,
    verificationDeadlineAt,
    rejectsCount,
    status,
    deleted,
    canAddToPriorityList,
    canRemoveFromPriorityList,
    prioritized,
  } = product;
  const isPriority = prioritized && variant === 'admin_priority';

  return (
    <ProductWrapper>
      <ProductCardContent isPriority={isPriority}>
        {isPriority && (
          <PriorityCorner>
            <Icon name="crown" $color="white" $size={17} $ml={25} $mt={6} />
          </PriorityCorner>
        )}

        <ProductCardSimpleStatus
          status={status}
          verificationDeadlineAt={verificationDeadlineAt}
          rejectsCount={rejectsCount}
          deleted={deleted}
        />

        <ProductCardSimpleContent product={product} />

        <ProductCardSimpleActions
          productId={productId}
          status={status}
          deleted={deleted}
          variant={variant}
          canAddToPriorityList={canAddToPriorityList}
          canRemoveFromPriorityList={canRemoveFromPriorityList}
        />
      </ProductCardContent>
    </ProductWrapper>
  );
};
export default ProductCardSimple;
