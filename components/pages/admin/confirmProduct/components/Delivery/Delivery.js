import React from 'react';

import Fieldset from 'components/shared/atoms/Fieldset';
import { SectionH4, SectionHeader, SectionRow, SectionWrapper } from '../styled';

const FreeDelivery = ({ productFreeDeliveries }) => {
  if (productFreeDeliveries.length === 0) {
    return null;
  }
  return (
    <>
      <SectionH4>Параметры бесплатной доставки</SectionH4>
      {productFreeDeliveries.map(({ id, minCost, city }) => (
        <SectionRow justifyContent="start" key={id}>
          <Fieldset legend="Город бесплатной доставки" $width="auto">
            {city?.name}
          </Fieldset>
          <Fieldset legend="От" $width="auto">
            {`${minCost} р.`}
          </Fieldset>
        </SectionRow>
      ))}
    </>
  );
};

const PaidDelivery = ({ productPaidDeliveries }) => {
  if (productPaidDeliveries.length === 0) {
    return null;
  }
  return (
    <>
      <SectionH4>Параметры платной доставки</SectionH4>
      {productPaidDeliveries.map(({ id, price, minWeight, maxWeight, city }) => (
        <SectionRow justifyContent="start" key={id}>
          <Fieldset legend="Цена" $width="auto">
            {`${price} р.`}
          </Fieldset>
          <Fieldset legend="Вес от" $width="auto">
            {`${minWeight} кг.`}
          </Fieldset>
          <Fieldset legend="Вес до" $width="auto">
            {`${maxWeight} кг.`}
          </Fieldset>
          <Fieldset legend="В какой город идет доставка за эту сумму" $width="auto">
            {city?.name}
          </Fieldset>
        </SectionRow>
      ))}
    </>
  );
};
const Delivery = ({ address, disablePickup, productFreeDeliveries, productPaidDeliveries }) => {
  return (
    <SectionWrapper>
      <SectionHeader>Параметры доставки продавца</SectionHeader>
      <SectionRow>
        <Fieldset legend="Адрес нахождения товара" $width="100%">
          {address}
        </Fieldset>
      </SectionRow>
      <SectionRow>
        <Fieldset legend="Самовывоз" $width="auto">
          {disablePickup ? 'Запрещен' : 'Разрешен'}
        </Fieldset>
      </SectionRow>
      <FreeDelivery productFreeDeliveries={productFreeDeliveries} />
      <PaidDelivery productPaidDeliveries={productPaidDeliveries} />
    </SectionWrapper>
  );
};

export default Delivery;
