import React from 'react';

import { numberFormat, dateFormat } from 'helpers';

import Icon from 'components/shared/atoms/Icon';

import { Row, FreeDelivery, EstimatedDelivery } from './styled';

const DeliveryServiceInfo = ({ service, product, address }) => {
  const { startDate, endDate, price } = service;
  const { productFreeDeliveries } = product;

  const freeDeliveryMount = productFreeDeliveries.find(
    ({ city: { id: cityId } }) => cityId === address?.city?.id,
  )?.minCost;

  return (
    <>
      <Row>
        <strong>{numberFormat(price)} руб.</strong>
        {freeDeliveryMount && (
          <>
            <Icon name="question" $size={22} $color="greyA3" />
            <FreeDelivery>
              Бесплатная доставка от {numberFormat(freeDeliveryMount)} руб.
            </FreeDelivery>
          </>
        )}
      </Row>
      <EstimatedDelivery>
        Расчётное время доставки:&nbsp;
        {startDate !== endDate
          ? `c ${dateFormat(startDate)} по ${dateFormat(endDate)}`
          : dateFormat(startDate)}
      </EstimatedDelivery>
    </>
  );
};

export default DeliveryServiceInfo;
