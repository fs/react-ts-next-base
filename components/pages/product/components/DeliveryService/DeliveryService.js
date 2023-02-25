import React, { useMemo } from 'react';

import DeliveryServiceModal from 'components/shared/molecules/DeliveryServiceModal';

import { dateFormat } from 'helpers';
import {
  deliveryMethods,
  deliveryMethodsLabel,
  deliveryServices,
  deliveryServicesLabel,
} from 'config/constants/delivery';

import { StyledLink, DeliveryServiceLabel } from './styled';

const DeliveryService = ({ values, setFieldValue, variantId, product }) => {
  const { deliveryService, deliveryMethod, pickupDate, address } = values || {};

  const deliveryServiceLabel = useMemo(() => {
    switch (deliveryMethod) {
      case deliveryMethods.COURIER:
      case deliveryMethods.DELIVERY_POINT: {
        return `${
          deliveryService?.service === deliveryServices.SELLER
            ? 'Продавец'
            : deliveryServicesLabel[deliveryService?.service]
        } (${deliveryMethodsLabel[deliveryMethod]})`;
      }
      case deliveryMethods.PICKUP: {
        return `${deliveryMethodsLabel[deliveryMethod]} (${dateFormat(pickupDate)})`;
      }
      default:
        return '';
    }
  }, [values]);

  const onSubmit = ({ deliveryMethod: method, service, deliveryPoint, pickupDate: pickup }) => {
    setFieldValue('deliveryMethod', method);
    switch (method) {
      case deliveryMethods.PICKUP: {
        setFieldValue('deliveryService', null);
        setFieldValue('pickupDate', pickup);
        break;
      }
      case deliveryMethods.COURIER: {
        setFieldValue('deliveryService', service);
        break;
      }
      case deliveryMethods.DELIVERY_POINT: {
        setFieldValue('deliveryService', service);
        setFieldValue('deliveryPoint', deliveryPoint);
        break;
      }
      default:
        break;
    }
  };

  return (
    <>
      {address ? (
        <>
          {(deliveryService?.service || pickupDate) && (
            <DeliveryServiceLabel>{deliveryServiceLabel}</DeliveryServiceLabel>
          )}
          <DeliveryServiceModal
            onSubmit={onSubmit}
            variantId={variantId}
            deliveryValues={values}
            product={product}
          >
            <StyledLink>
              {deliveryService?.service || pickupDate ? 'Изменить' : <strong>Выбрать</strong>}
            </StyledLink>
          </DeliveryServiceModal>
        </>
      ) : (
        <StyledLink disabled>Выбрать</StyledLink>
      )}
    </>
  );
};

export default DeliveryService;
