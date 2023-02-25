import React from 'react';

import Counter from 'components/shared/molecules/Counter';
import TooltipDiscount from 'components/shared/atoms/TooltipDiscount';

import { numberFormat } from 'helpers';

import { humanizeUnitKind } from 'helpers/suffix';
import { TOrderSummary } from './types';
import {
  OrderSummaryWrapper,
  SummaryDetails,
  PiecePrice,
  OrderQuantity,
  Summary,
  SummaryCount,
  SummaryPrice,
  WithoutDiscount,
  TotalPrice,
} from './styled';

const OrderSummary = ({
  itemPrice,
  summaryCount,
  onChangeOrderQuantity,
  loadingQuantity,
  variant,
}: TOrderSummary) => {
  const {
    discount,
    price,
    stock,
    soldQuantity,
    minShipmentLot,
    currentPeriodDiscount,
    currentWeeklyDiscount,
    unitKind,
  } = variant;

  return (
    <OrderSummaryWrapper>
      <SummaryDetails>
        <PiecePrice>
          Цена за штуку:
          <strong>
            {numberFormat(itemPrice)} руб.
            {!!discount && (
              <TooltipDiscount
                weeklyDiscount={currentWeeklyDiscount}
                periodDiscount={currentPeriodDiscount}
                discount={discount}
                $ml={8}
              />
            )}
          </strong>
        </PiecePrice>

        <OrderQuantity>
          Количество:
          <SummaryCount>
            {onChangeOrderQuantity ? (
              <Counter
                name="summaryCount"
                min={Number(minShipmentLot)}
                max={Number(stock) - soldQuantity}
                size="extra-small"
                $width="6.5rem"
                onChange={onChangeOrderQuantity}
                disabled={loadingQuantity}
              />
            ) : (
              <>{`${summaryCount} ${humanizeUnitKind(unitKind)}`}</>
            )}
          </SummaryCount>
        </OrderQuantity>
      </SummaryDetails>

      <Summary>
        <SummaryPrice>
          Итого:
          {!!discount && (
            <WithoutDiscount>
              {numberFormat(Number(price) * summaryCount || price)} руб.
            </WithoutDiscount>
          )}
          <TotalPrice>
            {numberFormat(Number(itemPrice) * summaryCount || itemPrice)} руб.
          </TotalPrice>
        </SummaryPrice>
      </Summary>
    </OrderSummaryWrapper>
  );
};

export default OrderSummary;
