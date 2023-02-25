import React, { useMemo } from 'react';

import { dateFormat, numberFormat } from 'helpers';
import { WEEKDAYS_FORMATTED } from 'config/constants/discount';

import useCurrentUser from 'hooks/useCurrentUser';

import TooltipDiscount from 'components/shared/atoms/TooltipDiscount';
import Counter from 'components/shared/molecules/Counter';

import { VariantUnitKindEnum } from 'graphql/types';
import { humanizeUnitKind, humanizeUnitQuantityKind } from 'helpers/suffix';
import {
  ProductPriceWrapper,
  Row,
  Col,
  Title,
  CountDescription,
  TitlePrice,
  FullPriceWrapper,
  FullPrice,
  PiecePriceWrapper,
  PiecePrice,
  DiscountInfo,
  DiscountDescription,
  PieceQuantity,
} from './styled';

const ProductPrice = ({
  remainingVariants,
  wholesaleLot,
  values,
  onChangeDeliveryMethodsQuery,
}) => {
  const { quantity, address } = values;
  const disabled = remainingVariants?.length > 1;
  const [variant] = remainingVariants;

  const {
    id: variantId,
    price,
    soldQuantity,
    stock,
    discount,
    discountPrice,
    discountWholesalePrice,
    wholesalePrice,
    minShipmentLot,
    currentPeriodDiscount,
    currentWeeklyDiscount,
    unitQuantityKind,
    unitKind,
    unitQuantity,
  } = variant || {};

  const isVariantUnitKindItem = unitKind === VariantUnitKindEnum.Item;

  const { isRegisteredUser } = useCurrentUser();

  const onUpdateQuantity = updatedQuantity => {
    const deliveryField = isRegisteredUser ? 'companyLocationId' : 'cityId';
    onChangeDeliveryMethodsQuery({
      variantId,
      quantity: updatedQuantity,
      [deliveryField]: address?.id,
    });
  };

  const pieceDiscountPrice = useMemo(
    () =>
      quantity
        ? quantity >= wholesaleLot && discountWholesalePrice
          ? discountWholesalePrice
          : discountPrice
        : discountPrice,
    [quantity, variant],
  );

  const piecePrice = useMemo(
    () => (quantity >= wholesaleLot && wholesalePrice ? wholesalePrice : price),
    [quantity, variant],
  );

  const renderFinalPrice = useMemo(
    () => `${numberFormat((quantity || 1) * (discount ? pieceDiscountPrice : piecePrice))} руб.`,
    [quantity, discount, pieceDiscountPrice, piecePrice],
  );

  const renderDiscountPrice = useMemo(
    () => `${numberFormat((quantity || 1) * piecePrice)} руб.`,
    [quantity, piecePrice],
  );

  const humanizedUnitKind = humanizeUnitKind(unitKind);
  return (
    <ProductPriceWrapper disabled={disabled}>
      <Row>
        <Col>
          <Title>
            <span>Количество</span>
          </Title>

          <Counter
            name="quantity"
            min={minShipmentLot}
            max={stock - soldQuantity}
            size="medium"
            shape="extra-rounded"
            $width="10rem"
            onChange={onUpdateQuantity}
            disabled={disabled}
          />

          <CountDescription data-testid="count-lost">
            {`Осталось всего: ${numberFormat(stock - soldQuantity)} ${humanizedUnitKind}`}
          </CountDescription>
          <CountDescription>
            {`Минимальное кол-во к заказу: ${numberFormat(minShipmentLot)} ${humanizedUnitKind}`}
          </CountDescription>
        </Col>
        <Col>
          <TitlePrice>Общая стоимость товара:</TitlePrice>

          <FullPriceWrapper>
            <span data-testid="final-price">{renderFinalPrice}</span>
            {!!discount && (
              <FullPrice>
                <span data-testid="discount-price">{renderDiscountPrice}</span>
                <TooltipDiscount
                  discount={discount}
                  periodDiscount={currentPeriodDiscount}
                  weeklyDiscount={currentWeeklyDiscount}
                />
              </FullPrice>
            )}
          </FullPriceWrapper>

          <PiecePriceWrapper>
            {`${numberFormat(
              discount ? pieceDiscountPrice : piecePrice,
            )} руб./${humanizedUnitKind}`}

            {!!discount && (
              <PiecePrice>{`${numberFormat(piecePrice)} руб./${humanizedUnitKind}`}</PiecePrice>
            )}
          </PiecePriceWrapper>
          {!isVariantUnitKindItem && (
            <PieceQuantity>
              {`В одной упаковке ${unitQuantity} ${humanizeUnitQuantityKind(
                unitQuantityKind,
                unitQuantity,
              )}`}
            </PieceQuantity>
          )}
        </Col>
      </Row>
      <DiscountInfo>
        {wholesaleLot && stock - soldQuantity > wholesaleLot && (
          <DiscountDescription>
            {`Цена ${discountWholesalePrice} руб. за ${humanizedUnitKind} при заказе от ${wholesaleLot} ${humanizedUnitKind}`}
          </DiscountDescription>
        )}
        {currentWeeklyDiscount && (
          <DiscountDescription>
            {`Скидка ${currentWeeklyDiscount.amount}% при заказе по ${
              WEEKDAYS_FORMATTED[currentWeeklyDiscount.weekday]
            }`}
          </DiscountDescription>
        )}
        {currentPeriodDiscount && (
          <DiscountDescription>
            {`Скидка ${currentPeriodDiscount.amount}% при заказе от ${dateFormat(
              currentPeriodDiscount.endDate,
            )}`}
          </DiscountDescription>
        )}
      </DiscountInfo>
    </ProductPriceWrapper>
  );
};

export default ProductPrice;
