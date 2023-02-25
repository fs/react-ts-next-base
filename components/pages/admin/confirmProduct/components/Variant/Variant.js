import React from 'react';

import {
  courierServices,
  shipmentMethods,
  weekdaysDictionary,
} from 'config/constants/createProductDelivery';

import Fieldset from 'components/shared/atoms/Fieldset';
import FilesSection from 'components/shared/molecules/FilesSection';

import { humanizeUnitKind } from 'helpers/suffix';
import { SectionH4, SectionHeader, SectionRow, SectionWrapper } from '../styled';
import { UnVisibleFieldset, VarianTitle } from './styled';

const stringifyVariant = variantProperties => {
  const variantStringify = variantProperties
    .map(({ dictionaryPropertyOption, property, integerValue, stringValue }) => {
      const unit = integerValue ? property.unit : '';
      return `${property.displayName}: ${
        integerValue || stringValue || dictionaryPropertyOption?.name
      } ${unit}`;
    })
    .join(' / ');
  return variantStringify;
};

const DeliverySection = ({ deliveryCondition, shipmentMethod, courierService }) => {
  if (!deliveryCondition) return null;

  const shipmentMethodDictionary = {
    [shipmentMethods.NONE]: 'Нет необходимости в сторонней службе доставки',
    [shipmentMethods.COURIER]: 'Служба доставки заберет товар курьером',
    [shipmentMethods.DELIVERY_POINT]: 'Я отвезу заказанный товар в терминал',
  };

  const courierServicesDictionary = {
    [courierServices.ANY_SERVICE]: 'Сотрудничать с компаниями СДЭК и Деловые Линии',
    [courierServices.NO_SDEK]: 'Я не хочу сотрудничать с компанией СДЭК',
    [courierServices.NO_DELLIN]: 'Я не хочу сотрудничать с компанией Деловые Линии',
  };

  const { comment, hazardClass, insuranceRequired } = deliveryCondition || {};
  return (
    <>
      <SectionH4>Параметры для службы доставки</SectionH4>
      <SectionRow>
        <Fieldset legend="Сторонняя служба доставки" $width="100%">
          {shipmentMethodDictionary[shipmentMethod]}
        </Fieldset>
      </SectionRow>
      {courierService && (
        <SectionRow>
          <Fieldset legend="Сотрудничество со службами доставки" $width="100%">
            {courierServicesDictionary[courierService] || ''}
          </Fieldset>
        </SectionRow>
      )}
      {hazardClass && (
        <SectionRow>
          <Fieldset legend="Класс опасности" $width="100%">
            {hazardClass}
          </Fieldset>
        </SectionRow>
      )}
      <SectionRow>
        <Fieldset legend="Страхование" $width="100%">
          {insuranceRequired ? 'Да' : 'Нет'}
        </Fieldset>
      </SectionRow>
      {comment && (
        <SectionRow>
          <Fieldset legend="Комментарий" $width="100%">
            {comment}
          </Fieldset>
        </SectionRow>
      )}
    </>
  );
};

const DiscountSection = ({ currentWeeklyDiscount, currentPeriodDiscount }) => {
  const { amount: amountWeekly, weekday } = currentWeeklyDiscount || {};
  const { amount: amountPeriod, endDate, startDate } = currentPeriodDiscount || {};
  return (
    <>
      {(amountWeekly || amountPeriod) && <SectionH4>Параметры скидки</SectionH4>}
      {amountWeekly && (
        <SectionRow>
          <Fieldset legend="Скидка" $width="32%">
            {`${amountWeekly} %`}
          </Fieldset>
          <Fieldset legend="День" $width="32%">
            {weekdaysDictionary[weekday]}
          </Fieldset>
          <UnVisibleFieldset $width="32%" />
        </SectionRow>
      )}
      {amountPeriod && (
        <SectionRow>
          <Fieldset legend="Скидка" $width="32%">
            {`${amountPeriod} %`}
          </Fieldset>
          <Fieldset legend="Дата начала" $width="32%">
            {startDate}
          </Fieldset>
          <Fieldset legend="Дата окончания" $width="32%">
            {endDate}
          </Fieldset>
        </SectionRow>
      )}
    </>
  );
};

const Variant = ({
  variants = [],
  wholesaleLot,
  shipmentMethod,
  courierService,
  productDeliveryCondition,
}) => {
  return (
    <SectionWrapper>
      <SectionHeader>Параметры товара</SectionHeader>

      {variants.map(
        (
          {
            id: variantId,
            variantProperties,
            stock,
            price,
            wholesalePrice,
            variantPhotos,
            variantInstructions,
            variantCertificates,
            length,
            width,
            height,
            netWeight,
            grossWeight,
            packingMaterial,
            minShipmentLot,
            currentPeriodDiscount,
            currentWeeklyDiscount,
            deliveryCondition,
            unitKind,
          },
          index,
        ) => {
          const humanizedUnitKind = humanizeUnitKind(unitKind);
          return (
            <div key={variantId}>
              <VarianTitle>{`Вариант товара № ${index + 1}`}</VarianTitle>
              <SectionRow>
                <Fieldset legend="Характеристики товара" $width="100%">
                  {stringifyVariant(variantProperties)}
                </Fieldset>
              </SectionRow>
              <SectionRow>
                <Fieldset legend="Цена" $width="49%">
                  {`${price} р.`}
                </Fieldset>
                <Fieldset legend="Количество товара на руках" $width="49%">
                  {`${stock} ${humanizedUnitKind}`}
                </Fieldset>
              </SectionRow>
              {!!(wholesalePrice && wholesaleLot) && (
                <SectionRow>
                  <Fieldset legend="Цена оптовая" $width="49%">
                    {`${wholesalePrice} р.`}
                  </Fieldset>
                  <Fieldset legend="От" $width="49%">
                    {`${wholesaleLot} ${humanizedUnitKind}`}
                  </Fieldset>
                </SectionRow>
              )}
              <FilesSection title="Фото товара" type="image" files={variantPhotos} />
              <FilesSection
                title="Документы качества товара (jpeg, png, pdf, bmp)"
                type="attachment"
                files={variantCertificates}
              />
              <FilesSection
                title="Инструкция к товару (jpeg, png, pdf, bmp)"
                type="attachment"
                files={variantInstructions}
              />
              <SectionH4>Параметры упаковки</SectionH4>
              <SectionRow>
                <Fieldset legend="Длина" $width="32%">
                  {`${length} см.`}
                </Fieldset>
                <Fieldset legend="Ширина" $width="32%">
                  {`${width} см.`}
                </Fieldset>
                <Fieldset legend="Высота" $width="32%">
                  {`${height} см.`}
                </Fieldset>
              </SectionRow>
              <SectionRow>
                <Fieldset legend="Вес нетто" $width="32%">
                  {`${netWeight} г.`}
                </Fieldset>
                <Fieldset legend="Вес брутто" $width="32%">
                  {`${grossWeight} г.`}
                </Fieldset>
                <Fieldset legend="Материал упаковки" $width="32%">
                  {`${packingMaterial?.name}`}
                </Fieldset>
              </SectionRow>
              <SectionRow>
                <Fieldset legend="Минимальная партия отгрузки" $width="32%">
                  {`${minShipmentLot} ${humanizedUnitKind}`}
                </Fieldset>
              </SectionRow>
              <DiscountSection
                currentPeriodDiscount={currentPeriodDiscount}
                currentWeeklyDiscount={currentWeeklyDiscount}
              />
              <DeliverySection
                deliveryCondition={deliveryCondition || productDeliveryCondition}
                shipmentMethod={shipmentMethod}
                courierService={courierService}
              />
            </div>
          );
        },
      )}
    </SectionWrapper>
  );
};

export default Variant;
