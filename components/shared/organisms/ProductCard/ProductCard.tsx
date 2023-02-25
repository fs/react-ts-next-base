import React, { useMemo } from 'react';
import minBy from 'lodash/minBy';
import maxBy from 'lodash/maxBy';

import { numberFormat } from 'helpers';

import useCurrentUser from 'hooks/useCurrentUser';

import Icon from 'components/shared/atoms/Icon';

import ProductViewRow from './components/ProductViewRow';
import ProductViewTile from './components/ProductViewTile';
import ProductCheckStatus from './components/ProductCheckStatus';

import { ProductContainer, ProductCardContent, PriorityCorner } from './styled';
import { TProductCard } from './types';

export const ProductCard = ({
  product,
  view = 'tile',
  variant = 'catalog',
  refetchProducts = () => {},
  isFavoriteModalShown = false,
  $width = '100%',
}: TProductCard) => {
  const { variants, template, deleted, status, draft, prioritized } = product;
  const isPriority = prioritized && variant === 'catalog';

  const { isUserBuyer } = useCurrentUser();

  const price = useMemo(() => {
    if (variants.length) {
      const minPrice = numberFormat(minBy(variants, 'price')?.price ?? 0);
      const maxPrice = numberFormat(maxBy(variants, 'price')?.price ?? 0);
      return minPrice === maxPrice ? minPrice : `${minPrice}-${maxPrice}`;
    }
    return '0';
  }, [variants]);

  return (
    <ProductContainer view={view} $width={$width} data-testid="product-card-container">
      <ProductCardContent isPriority={isPriority} view={view}>
        {isPriority && (
          <PriorityCorner>
            <Icon name="crown" $color="white" $size={17} $ml={25} $mt={6} />
          </PriorityCorner>
        )}
        {variant === 'company' && !template && !deleted && (
          <ProductCheckStatus status={status} draft={draft} />
        )}

        {view === 'tile' ? (
          <ProductViewTile
            product={product}
            isUserBuyer={isUserBuyer}
            price={price}
            variant={variant}
            view={view}
            refetchProducts={refetchProducts}
            isFavoriteModalShown={isFavoriteModalShown}
          />
        ) : (
          <ProductViewRow
            product={product}
            isUserBuyer={isUserBuyer}
            price={price}
            variant={variant}
            view={view}
            refetchProducts={refetchProducts}
            isFavoriteModalShown={isFavoriteModalShown}
          />
        )}
      </ProductCardContent>
    </ProductContainer>
  );
};

export default ProductCard;
