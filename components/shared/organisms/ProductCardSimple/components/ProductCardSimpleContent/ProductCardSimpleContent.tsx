import React, { FC, useMemo } from 'react';

import { numberFormat } from 'helpers';
import { humanizeUnitKind } from 'helpers/suffix';
import { ADMIN_COMPANY } from 'config/routes';

import ActionLink from 'components/shared/atoms/ActionLink';
import Categories from 'components/shared/atoms/Categories';

import {
  ImageContainer,
  Name,
  Category,
  Code,
  Company,
  RateContainer,
  SellerContainer,
  Seller,
  Sold,
  PriceTitle,
  PriceWrapper,
  Price,
  CardWrapper,
} from './styled';
import { TProductCardSimpleContent } from './types';

const ProductCardSimpleContent: FC<TProductCardSimpleContent> = ({ product }) => {
  const {
    id: productId,
    name,
    variants,
    category,
    manufacturer,
    company: { unofficialName: companyName = '', id },
  } = product;

  const productName = name || 'название не выбрано';
  const productPrices = variants?.map(variant => variant?.price ?? 0);
  const price = useMemo(() => {
    if (productPrices?.length) {
      const minPrice = numberFormat(Math.min(...productPrices) ?? 0);
      const maxPrice = numberFormat(Math.max(...productPrices) ?? 0);
      return minPrice === maxPrice ? minPrice : `${minPrice}-${maxPrice}`;
    }
    return 0;
  }, [variants]);

  const [firstVariant] = variants;
  const { variantPhotos = [], soldQuantity, unitKind } = firstVariant || {};

  return (
    <CardWrapper>
      <ImageContainer imgUrl={variantPhotos[0]?.imageUrl} />

      <Name title={productName}>{productName}</Name>

      <Category>
        <strong>Категория товара:</strong>
        <br />
        {category ? <Categories category={category} /> : 'не выбрана'}
      </Category>

      <Code>
        <span>Код товара: {productId}</span>
      </Code>
      <Code>
        <Company>Производитель: {manufacturer || 'не выбран'}</Company>
      </Code>

      <RateContainer>
        <Sold>{soldQuantity ?? 0} Продано</Sold>
      </RateContainer>

      <SellerContainer>
        <Seller>Продавец: </Seller>
      </SellerContainer>

      <SellerContainer>
        <ActionLink
          label={companyName}
          $color="black"
          bold
          size={14}
          href={{ pathname: ADMIN_COMPANY, query: { companyId: id } }}
        />
      </SellerContainer>

      <PriceTitle>Стоимость товара:</PriceTitle>

      <PriceWrapper>
        <Price>{price}</Price>
        {`руб./${humanizeUnitKind(unitKind)}`}
      </PriceWrapper>
    </CardWrapper>
  );
};

export default ProductCardSimpleContent;
