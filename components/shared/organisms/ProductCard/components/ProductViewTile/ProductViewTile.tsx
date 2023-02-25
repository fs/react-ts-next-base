import React, { useMemo } from 'react';
import plural from 'plural-ru';
import sumBy from 'lodash/sumBy';
import NiceModal from '@ebay/nice-modal-react';
import head from 'lodash/head';

import {
  PRODUCT,
  DASHBOARD_COMPANY_PRODUCT,
  COMPANY,
  DASHBOARD_COMPANY_CREATE_PRODUCT,
} from 'config/routes';
import { CompanyDirectionEnum } from 'graphql/types';

import Icon from 'components/shared/atoms/Icon';
import Rate from 'components/shared/atoms/Rate';
import Categories from 'components/shared/atoms/Categories';
import ActionLink from 'components/shared/atoms/ActionLink';
import ReviewsModal from 'components/shared/molecules/ReviewsModal';

import { humanizeUnitKind } from 'helpers/suffix';
import ProductImage from '../ProductImage';
import ActionButtons from '../ActionButtons';

import { TProductCard } from './types';
import {
  Name,
  Category,
  Code,
  Company,
  RateContainer,
  SellerContainer,
  Seller,
  Selled,
  PriceTitle,
  PriceWrapper,
  Price,
  LikesWrapper,
} from './styled';

const ProductViewTile = ({
  product,
  isUserBuyer,
  price,
  variant,
  view,
  isFavoriteModalShown,
  refetchProducts,
}: TProductCard) => {
  const {
    id: productId,
    draft,
    name,
    rating: productRating,
    favoritesCount,
    variants,
    category,
    template,
    manufacturer,
    company: {
      id: companyId,
      unofficialName: companyName = '',
      rating: companyRating,
      receivedReviewsCount: companyReceivedReviewsCount,
      direction,
    },
    receivedReviewsCount: productReviewsCount,
  } = product;

  const isSeller = direction === CompanyDirectionEnum.Seller;
  const productName = name || 'название не выбрано';

  const showReviewsModal = () => {
    NiceModal.show(ReviewsModal, {
      productId,
      isSeller,
    });
  };

  const productHref = useMemo(() => {
    switch (variant) {
      case 'company':
        return template
          ? {
              pathname: DASHBOARD_COMPANY_CREATE_PRODUCT,
              query: { companyId, productId, readOnly: 'true' },
            }
          : {
              pathname: DASHBOARD_COMPANY_PRODUCT,
              query: { companyId, productId },
            };
      case 'catalog':
        return {
          pathname: PRODUCT,
          query: { productId },
        };
      default:
        console.error('Invalid variant');
        return undefined;
    }
  }, [variant, template]);

  return (
    <>
      <ProductImage product={product} href={productHref} />

      <Name data-testid="product-name" title={productName}>
        {draft && !template ? (
          <>{productName}</>
        ) : (
          <ActionLink label={productName} href={productHref} bold $color="black" size={14} />
        )}
      </Name>

      <Category>
        <strong>Категория товара:</strong>
        <br />
        {category ? <Categories category={category} /> : 'не выбрана'}
      </Category>

      <Code>
        <span>Код товара: {productId}</span>
        {isUserBuyer && (
          <LikesWrapper>
            <Icon name="heart" $color="orange" $mr={6} $size={14} />
            {favoritesCount}
          </LikesWrapper>
        )}
      </Code>
      <Code>
        <Company>Производитель: {manufacturer || 'не выбран'}</Company>
        <Rate rating={productRating} />
      </Code>

      <RateContainer>
        <Selled>{sumBy(variants, 'soldQuantity') ?? 0} Продано</Selled>
        <ActionLink
          onClick={showReviewsModal}
          label={plural(productReviewsCount ?? 0, '%d Отзыв', '%d Отзыва', '%d Отзывов')}
        />
      </RateContainer>

      <SellerContainer>
        <Seller>Продавец: </Seller>
        <Rate rating={companyRating} />
      </SellerContainer>

      <SellerContainer bottom>
        <ActionLink
          label={companyName}
          href={{ pathname: COMPANY, query: { companyId } }}
          bold
          $color="black"
          size={14}
        />
        <ActionLink
          label={plural(companyReceivedReviewsCount, '%d Отзыв', '%d Отзыва', '%d Отзывов')}
          href={{ pathname: COMPANY, query: { companyId } }}
        />
      </SellerContainer>

      <PriceTitle>Стоимость товара:</PriceTitle>

      <PriceWrapper>
        <Price>{price}</Price>
        {`руб./${humanizeUnitKind(head(variants)?.unitKind)}`}
      </PriceWrapper>

      <ActionButtons
        product={product}
        variant={variant}
        view={view}
        isFavoriteModalShown={isFavoriteModalShown}
        isUserBuyer={isUserBuyer}
        refetchProducts={refetchProducts}
      />
    </>
  );
};

export default ProductViewTile;
