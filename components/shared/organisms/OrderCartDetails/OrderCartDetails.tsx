import React from 'react';
import Link from 'next/link';
import plural from 'plural-ru';
import NiceModal from '@ebay/nice-modal-react';

import { PRODUCT } from 'config/routes';

import Rate from 'components/shared/atoms/Rate';
import Icon from 'components/shared/atoms/Icon';
import ActionLink from 'components/shared/atoms/ActionLink';
import Categories from 'components/shared/atoms/Categories';
import ReviewsModal from 'components/shared/molecules/ReviewsModal';

import { dateFormat } from 'helpers';

import { CompanyDirectionEnum } from 'graphql/types';
import OrderSummary from './components/OrderSummary';

import { TOrderCartDetails } from './types';
import {
  OrderCartDetailsWrapper,
  ProductMainInfo,
  ProductTopBlueContainer,
  ProductBottomBlueContainer,
  ProductMiddleContainer,
  ProductTopLeftCol,
  ProductPropertiesWrapper,
  ProductProperty,
  ProductBottomRightCol,
  RateContainer,
  LikesWrapper,
  Selled,
  Col,
  ProductImg,
  ProductBasicInfo,
  ProductCode,
} from './styled';

const OrderCartDetails = ({
  order,
  summaryCount,
  onChangeOrderQuantity,
  loadingQuantity = false,
}: TOrderCartDetails) => {
  const {
    itemPrice,
    product: {
      id: productId,
      name: productName,
      category,
      country,
      manufacturer,
      favoritesCount,
      company: { direction },
      receivedReviewsCount: productReviewsCount,
      rating,
    },
    variant,
  } = order;
  const { variantProperties, expirationDate, variantPhotos, soldQuantity } = variant;
  const isSeller = direction === CompanyDirectionEnum.Seller;

  const showReviewsModal = () => {
    NiceModal.show(ReviewsModal, {
      productId,
      isSeller,
    });
  };

  return (
    <OrderCartDetailsWrapper data-testid={`order-cart-details-${order.id}`}>
      <ProductMainInfo>
        <ProductTopBlueContainer>
          <ProductTopLeftCol>
            <ActionLink
              label={productName || ''}
              href={{ pathname: PRODUCT, query: { productId } }}
              bold
              size={14}
              $color="black"
            />

            <RateContainer>
              <LikesWrapper>
                <Icon name="heart" $color="orange" $size={14} $mr={6} />
                {favoritesCount}
              </LikesWrapper>

              <Rate rating={rating} />

              <Selled>{soldQuantity ?? 0} Продано</Selled>

              <ActionLink
                onClick={showReviewsModal}
                label={plural(productReviewsCount ?? 0, '%d Отзыв', '%d Отзыва', '%d Отзывов')}
              />
            </RateContainer>
          </ProductTopLeftCol>

          <OrderSummary
            itemPrice={itemPrice}
            summaryCount={summaryCount}
            onChangeOrderQuantity={onChangeOrderQuantity}
            loadingQuantity={loadingQuantity}
            variant={variant}
          />
        </ProductTopBlueContainer>

        <ProductMiddleContainer>
          <ProductImg>
            <Link href={{ pathname: PRODUCT, query: { productId } }} passHref>
              <img src={variantPhotos[0]?.imageUrl} alt={productName || ''} />
            </Link>
          </ProductImg>

          <ProductBasicInfo>
            <div>
              <Col>
                {category && (
                  <>
                    <strong>Категория товара:</strong> <Categories category={category} />
                  </>
                )}
              </Col>
              <Col>
                <strong>Производитель:</strong> {manufacturer}
              </Col>
              <Col>
                <strong>Страна производителя:</strong> {country?.name || ''}
              </Col>
            </div>
            <ProductCode>Код товара: {productId}</ProductCode>
          </ProductBasicInfo>
        </ProductMiddleContainer>
      </ProductMainInfo>

      <ProductBottomBlueContainer>
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

        <ProductBottomRightCol hasExpirationDate={!!expirationDate}>
          <strong>Годен до:&nbsp;</strong>
          {expirationDate === null ? <div>Без срока годности</div> : dateFormat(expirationDate)}
        </ProductBottomRightCol>
      </ProductBottomBlueContainer>
    </OrderCartDetailsWrapper>
  );
};

export default OrderCartDetails;
