import React from 'react';
import { numberFormat } from 'helpers';
import {
  deliveryAddressDictionary,
  deliveryMethods,
  deliveryMethodsLabel,
  deliveryServiceDictionary,
  deliveryServices,
  deliveryServicesLabel,
} from 'config/constants/delivery';
import { Col, RightCol, Row, Strong } from '../../styled';
import {
  getDeliveryAddressLabelProps,
  getDeliveryServiceLabelProps,
  TDeliveryContent,
} from './types';

const deliveryServicesLabelOverridden = {
  ...deliveryServicesLabel,
  [deliveryServices.SELLER]: 'Продавец',
};

const getDeliveryAddressLabel = ({
  deliveryMethod,
  deliveryAddress,
  sellerAddress,
}: getDeliveryAddressLabelProps) => {
  switch (deliveryMethod) {
    case deliveryMethods.COURIER:
    case deliveryMethods.DELIVERY_POINT: {
      return deliveryAddress || '';
    }
    case deliveryMethods.PICKUP: {
      return sellerAddress || '';
    }
    default:
      return '';
  }
};

const getDeliveryServiceLabel = ({
  deliveryMethod,
  serviceLabel,
  deliveryLabel,
}: getDeliveryServiceLabelProps) => {
  switch (deliveryMethod) {
    case deliveryMethods.COURIER:
    case deliveryMethods.DELIVERY_POINT: {
      return serviceLabel;
    }
    case deliveryMethods.PICKUP: {
      return deliveryLabel;
    }
    default:
      return '';
  }
};
export const DeliveryContent: React.FunctionComponent<TDeliveryContent> = ({
  deliveryPrice,
  deliveryMethod,
  deliveryService,
  deliveryAddress,
  product,
}) => {
  const deliveryAddressMethodLabel = deliveryAddressDictionary[deliveryMethod] || '';
  const { companyLocation: sellerCompanyLocation } = product;

  const deliveryAddressLabel = getDeliveryAddressLabel({
    deliveryMethod,
    deliveryAddress,
    sellerAddress: sellerCompanyLocation?.address,
  });

  const deliveryServiceMethodLabel = deliveryServiceDictionary[deliveryMethod] || '';

  const deliveryServiceLabel = getDeliveryServiceLabel({
    deliveryMethod,
    serviceLabel: deliveryServicesLabelOverridden[deliveryService || ''],
    deliveryLabel: deliveryMethodsLabel[deliveryMethod],
  });

  return (
    <Row>
      <Col>
        {deliveryAddressMethodLabel}:<Strong>{deliveryAddressLabel}</Strong>
      </Col>

      <RightCol>
        {deliveryServiceMethodLabel}:<Strong>{deliveryServiceLabel}</Strong>
      </RightCol>

      {deliveryMethod !== deliveryMethods.PICKUP && (
        <RightCol>
          Стоимость доставки:
          <Strong>
            {deliveryPrice === 0 ? 'Бесплатно' : `${numberFormat(deliveryPrice)} руб.`}
          </Strong>
        </RightCol>
      )}
    </Row>
  );
};

export default DeliveryContent;
