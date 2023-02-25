import React, { useEffect } from 'react';
import minBy from 'lodash/minBy';

import useCurrentUser from 'hooks/useCurrentUser';
import { useUserDeliveryMethods } from 'lib/apollo/hooks/state/deliveryMethods';

import Icon from 'components/shared/atoms/Icon';
import Loader from 'components/shared/atoms/Loader';

import { deliveryMethods as deliveryMethodsName } from 'config/constants/delivery';
import DeliveryAddressModal from '../DeliveryAddressModal';
import DeliveryService from '../DeliveryService';
import DeliveryServiceInfo from './DeliveryServiceInfo';

import {
  ProductBuyerAddressWrapper,
  Title,
  Row,
  TerminalWrapper,
  Terminal,
  LoaderWrapper,
} from './styled';

const getCheapestService = services => minBy(services, 'price');

const getCheapestMethod = deliveryMethods => {
  const availableCouriers = deliveryMethods?.courier?.filter(({ available }) => available);
  const availableDeliveryPoints = deliveryMethods?.deliveryPoint?.filter(
    ({ available }) => available,
  );
  const availablePickup = deliveryMethods?.pickup?.available;
  const today = new Date();

  switch (true) {
    case availableCouriers.length > 0:
      return {
        method: deliveryMethodsName.COURIER,
        service: getCheapestService(availableCouriers),
      };
    case availableDeliveryPoints.length > 0: {
      const cheapestDeliveryPoint = getCheapestService(availableDeliveryPoints);
      return {
        method: deliveryMethodsName.DELIVERY_POINT,
        service: cheapestDeliveryPoint,
        point: cheapestDeliveryPoint.deliveryPoints[0],
      };
    }
    case availablePickup:
      return {
        method: deliveryMethodsName.PICKUP,
        service: null,
        date: new Date(today.setDate(today.getDate() + 1)).toISOString(),
      };
    default:
      return {
        method: null,
      };
  }
};

export const ProductBuyerAddress = ({
  product,
  remainingVariants,
  setFieldValue,
  values,
  onChangeDeliveryMethodsQuery,
  deliveryMethodsQuery,
}) => {
  const [variant] = remainingVariants;
  const { id: variantId } = variant;
  const { address, deliveryService, quantity } = values;

  const { isGuest } = useCurrentUser();
  const { userDeliveryMethods, loadingUserDeliveryMethods } = useUserDeliveryMethods({
    deliveryMethodsQuery,
    isGuestUser: isGuest,
  });

  useEffect(() => {
    if (loadingUserDeliveryMethods || !Object.values(userDeliveryMethods).length) {
      return;
    }

    const { method, service, point, date } = getCheapestMethod(userDeliveryMethods);
    if (!method) return;

    setFieldValue('deliveryMethod', method);
    setFieldValue('deliveryService', service);
    switch (method) {
      case deliveryMethodsName.DELIVERY_POINT:
        setFieldValue('deliveryPoint', point);
        break;
      case deliveryMethodsName.PICKUP:
        setFieldValue('pickupDate', date);
        break;
      default:
        break;
    }
  }, [loadingUserDeliveryMethods, userDeliveryMethods]);

  useEffect(() => {
    if (address?.id && remainingVariants.length === 1 && quantity) {
      const deliveryField = isGuest ? 'cityId' : 'companyLocationId';

      onChangeDeliveryMethodsQuery({
        variantId,
        quantity,
        [deliveryField]: address?.id,
      });
    }
  }, [address?.id, remainingVariants]);

  return (
    <ProductBuyerAddressWrapper>
      <Title>Доставка</Title>
      <Row>
        <Icon name="pin" $size={20} />
        <DeliveryAddressModal values={values} setFieldValue={setFieldValue} />
      </Row>
      <Row>
        <span>Служба доставки:</span>
        <DeliveryService
          values={values}
          setFieldValue={setFieldValue}
          variantId={variantId}
          product={product}
        />
      </Row>
      {loadingUserDeliveryMethods ? (
        <LoaderWrapper>
          <Loader variant="simple" $ml={32} />
        </LoaderWrapper>
      ) : (
        <>
          {deliveryService?.deliveryPoint && (
            <TerminalWrapper>
              <span>Терминал: </span>
              <Terminal>{deliveryService?.deliveryPoint.address}</Terminal>
            </TerminalWrapper>
          )}
          {deliveryService?.service && (
            <DeliveryServiceInfo service={deliveryService} product={product} address={address} />
          )}
        </>
      )}
    </ProductBuyerAddressWrapper>
  );
};

export default ProductBuyerAddress;
