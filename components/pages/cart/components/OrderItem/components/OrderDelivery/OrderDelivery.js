import React, { useMemo } from 'react';

import { useUpdateOrderDelivery } from 'lib/apollo/hooks/actions/order';

import Icon from 'components/shared/atoms/Icon';
import Loader from 'components/shared/atoms/Loader';
import DeliveryServiceModal from 'components/shared/molecules/DeliveryServiceModal';

import { dateFormat, numberFormat } from 'helpers';
import {
  deliveryMethods,
  deliveryMethodsLabel,
  deliveryServices,
  deliveryServicesLabel,
} from 'config/constants/delivery';

import useCurrentUser from 'hooks/useCurrentUser';
import { useCity } from 'lib/apollo/hooks/state/clientSideState';
import {
  DeliveryWrapper,
  DeliveryDetails,
  DeliveryDate,
  EditButton,
  DeliveryPrice,
  DeliveryAddress,
} from './styled';

const OrderDelivery = ({ order, loadingQuantity }) => {
  const {
    id: orderId,
    companyLocation: buyerCompanyLocation,
    deliveryAddress,
    deliveryPrice,
    deliveryService,
    deliveryMethod,
    pickupDate,
    deliveryMinDate,
    deliveryMaxDate,
    quantity,
    product,
    variant: { id: variantId },
  } = order;
  const { companyLocation: sellerCompanyLocation } = product;

  const { isRegisteredUser } = useCurrentUser();
  const { city } = useCity();

  const deliveryValues = {
    deliveryMethod,
    deliveryService,
    pickupDate,
    address: isRegisteredUser ? buyerCompanyLocation : city,
    quantity,
  };
  const isPickup = deliveryMethod === deliveryMethods.PICKUP;

  const [updateOrderDelivery] = useUpdateOrderDelivery({ orderId });

  const onSubmit = async ({
    deliveryMethod: method,
    service,
    deliveryPoint,
    pickupDate: pickup = null,
  }) => {
    await updateOrderDelivery({
      deliveryMethod: method,
      deliveryService: service?.service || null,
      companyLocationId: buyerCompanyLocation?.id || null,
      deliveryPointId: deliveryPoint?.id || null,
      pickupDate: pickup,
    });
  };

  const deliveryServiceLabel = useMemo(() => {
    switch (deliveryMethod) {
      case deliveryMethods.COURIER:
      case deliveryMethods.DELIVERY_POINT: {
        return (
          <>
            Служба доставки:&nbsp;
            <strong>
              {deliveryService === deliveryServices.SELLER
                ? 'Продавец'
                : deliveryServicesLabel[deliveryService]}
            </strong>
          </>
        );
      }
      case deliveryMethods.PICKUP: {
        return <strong>{deliveryMethodsLabel[deliveryMethod]}</strong>;
      }
      default:
        return '';
    }
  }, [order]);

  const deliveryAddressLabel = useMemo(() => {
    switch (deliveryMethod) {
      case deliveryMethods.COURIER: {
        return `Адрес доставки: ${deliveryAddress}`;
      }
      case deliveryMethods.DELIVERY_POINT: {
        return `Адрес терминала: ${deliveryAddress}`;
      }
      case deliveryMethods.PICKUP: {
        return `Адрес продавца: ${sellerCompanyLocation.address}`;
      }
      default:
        return '';
    }
  }, [order]);

  return (
    <DeliveryWrapper>
      <DeliveryDetails>
        <div>
          <h3>Информация о доставке товара:</h3>
          <DeliveryPrice>
            {!isPickup && (
              <>
                Стоимость доставки:&nbsp;
                {loadingQuantity ? (
                  <Loader variant="simple" $ml={16} size={17} />
                ) : deliveryPrice === 0 ? (
                  <strong>Бесплатно</strong>
                ) : (
                  <strong>{numberFormat(deliveryPrice)} руб.</strong>
                )}
              </>
            )}
          </DeliveryPrice>
          <DeliveryPrice>{deliveryServiceLabel}</DeliveryPrice>
          <DeliveryAddress>{deliveryAddressLabel}</DeliveryAddress>
        </div>

        <DeliveryServiceModal
          product={product}
          onSubmit={onSubmit}
          variantId={variantId}
          deliveryValues={deliveryValues}
        >
          <EditButton>
            <Icon name="pencil-square" $color="orange" $size={20} $mr={10} />
            Редактировать
          </EditButton>
        </DeliveryServiceModal>
      </DeliveryDetails>

      <DeliveryDate>
        <Icon name="truck" $size={24} $color="white" $mr={16} />
        {isPickup ? (
          <>Дата самовывоза: {dateFormat(pickupDate)}</>
        ) : (
          <>
            Срок доставки:&nbsp;
            {deliveryMinDate !== deliveryMaxDate
              ? `c ${dateFormat(deliveryMinDate)} по ${dateFormat(deliveryMaxDate)}`
              : dateFormat(deliveryMinDate)}
          </>
        )}
      </DeliveryDate>
    </DeliveryWrapper>
  );
};

export default OrderDelivery;
