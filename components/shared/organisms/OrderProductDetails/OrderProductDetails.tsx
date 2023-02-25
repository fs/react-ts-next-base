import React from 'react';
import plural from 'plural-ru';
import isNumber from 'lodash/isNumber';
import NiceModal from '@ebay/nice-modal-react';

import { dateFormat, numberFormat } from 'helpers';

import { OrderInfoFragment } from 'graphql/fragments/__generated__/orderInfo.generated';

import Icon from 'components/shared/atoms/Icon';
import Rate from 'components/shared/atoms/Rate';
import ActionLink from 'components/shared/atoms/ActionLink';
import Categories from 'components/shared/atoms/Categories';
import TooltipDiscount from 'components/shared/atoms/TooltipDiscount';
import ReviewsModal from 'components/shared/molecules/ReviewsModal';

import { humanizeUnitKind } from 'helpers/suffix';
import {
  ProductDetailsWrapper,
  MainProductInfo,
  Row,
  RightCol,
  RateRow,
  RateContainer,
  Likes,
  Selled,
  ProductCode,
  AdditionalProductInfo,
  ProductInfoCol,
  ProductPhoto,
  ExpirationDate,
  ProductPropertiesWrapper,
  ProductProperty,
  PricingWrapper,
  ProductPhotoContainer,
} from './styled';

type TOrderProductDetails = {
  order: OrderInfoFragment;
  isAdmin?: boolean;
};

const OrderProductDetails = ({ order, isAdmin = false }: TOrderProductDetails) => {
  const {
    quantity,
    itemPrice,
    product: {
      id: productId,
      name,
      favoritesCount,
      category,
      country,
      manufacturer,
      rating: productRate,
      receivedReviewsCount: productReviewsCount,
    },
    variant,
    seller,
    discount,
    periodDiscount,
    weeklyDiscount,
  } = order;
  const isSeller = seller?.myRole;

  const { variantProperties, expirationDate, variantPhotos, soldQuantity, unitKind } = variant;

  const showReviewsModal = () => {
    NiceModal.show(ReviewsModal, {
      productId,
      isSeller,
      isAdmin,
    });
  };

  return (
    <ProductDetailsWrapper>
      <MainProductInfo>
        <Row>
          <strong>{name}</strong>
          <Row>
            <RightCol>
              <span>Количество:</span>
              <strong>{`${numberFormat(quantity)} ${humanizeUnitKind(unitKind)}`}</strong>
            </RightCol>
            <RightCol>
              <span>{`Цена за ${humanizeUnitKind(unitKind)}:`}</span>
              <strong>{numberFormat(itemPrice)} руб.</strong>
            </RightCol>
            <RightCol>
              <span>Итого:</span>
              <PricingWrapper>
                {!!discount && (
                  <TooltipDiscount
                    periodDiscount={periodDiscount}
                    weeklyDiscount={weeklyDiscount}
                    discount={discount}
                  />
                )}
                <strong>{isNumber(itemPrice) && numberFormat(itemPrice * quantity)} руб.</strong>
              </PricingWrapper>
            </RightCol>
          </Row>
        </Row>
        <RateRow>
          <RateContainer>
            <Likes>
              <Icon name="heart" $size={14} $color="orange" $mr={6} />
              {favoritesCount}
            </Likes>

            <Rate rating={productRate} />

            <Selled>{soldQuantity ?? 0} Продано</Selled>
            <ActionLink
              onClick={showReviewsModal}
              label={plural(productReviewsCount ?? 0, '%d Отзыв', '%d Отзыва', '%d Отзывов')}
            />
          </RateContainer>
          <ProductCode>Код товара: {productId}</ProductCode>
        </RateRow>
      </MainProductInfo>

      <AdditionalProductInfo>
        <ProductPhotoContainer>
          <ProductPhoto src={variantPhotos[0]?.imageUrl} alt={name || ''} />
        </ProductPhotoContainer>
        <ProductInfoCol>
          {category && (
            <div>
              <strong>Категория товара:</strong> <Categories category={category} />
            </div>
          )}
          <div>
            <strong>Производитель:</strong> {manufacturer}
          </div>
          <Row>
            <div>
              <strong>Страна производителя:</strong> {country?.name}
            </div>
            <ExpirationDate>
              <strong>Годен до:&nbsp;</strong>
              {expirationDate === null ? <div>Без срока годности</div> : dateFormat(expirationDate)}
            </ExpirationDate>
          </Row>
        </ProductInfoCol>
      </AdditionalProductInfo>

      <ProductPropertiesWrapper>
        {variantProperties.map((variantProperty, propertyIndex) => {
          const { __typename: type } = variantProperty;
          let propertyValue;
          if (type === 'DictionaryVariantProperty') {
            propertyValue = variantProperty.dictionaryPropertyOption.name;
          }
          if (type === 'StringVariantProperty') {
            propertyValue = variantProperty.stringValue;
          }
          if (type === 'IntegerVariantProperty') {
            propertyValue = variantProperty.integerValue;
          }
          return (
            <ProductProperty key={propertyIndex}>
              <strong>{variantProperty.property.displayName}:</strong>
              {propertyValue}
            </ProductProperty>
          );
        })}
      </ProductPropertiesWrapper>
    </ProductDetailsWrapper>
  );
};

export default OrderProductDetails;
