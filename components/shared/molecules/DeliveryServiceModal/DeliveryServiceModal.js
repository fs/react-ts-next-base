import React, { useState } from 'react';
import * as Yup from 'yup';

import ModalWindow from 'components/shared/atoms/ModalWindow';

import { deliveryMethods } from 'config/constants/delivery';
import DeliveryServiceModalForm from './DeliveryServiceModalForm';

import { DeliveryServiceButton } from './styled';

const deliveryMethodsRadio = [
  {
    type: 'courier',
    value: deliveryMethods.COURIER,
    label: 'Курьер',
    tooltip:
      'Вы не можете выбрать этот способ доставки, так как курьерские услуги недоступны в вашем городе.',
  },
  {
    type: 'deliveryPoint',
    value: deliveryMethods.DELIVERY_POINT,
    label: 'До терминала в моем городе',
    tooltip:
      'Вы не можете выбрать этот способ доставки, так как услуги доставки до терминала недоступны в вашем городе.',
  },
  {
    type: 'pickup',
    value: deliveryMethods.PICKUP,
    label: 'Самовывоз',
    tooltip: 'Самовывоз недоступен',
  },
];

const DeliveryServiceModal = ({
  children,
  onSubmit: onSubmitForm,
  variantId,
  deliveryValues,
  product,
}) => {
  const [isOpenModalDelivery, setIsOpenModalDelivery] = useState(false);

  const { deliveryMethod, deliveryService, deliveryPoint, pickupDate } = deliveryValues;

  const onOpenModal = () => setIsOpenModalDelivery(true);
  const onCloseModal = () => setIsOpenModalDelivery(false);

  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    await onSubmitForm(values);

    onCloseModal();
    setSubmitting(false);
  };

  const initialValues = {
    deliveryMethod: deliveryMethod || deliveryMethods.UNAVAILABLE,
    service: deliveryService?.service || null,
    deliveryPoint: deliveryPoint || null,
    pickupDate: pickupDate || undefined,
  };

  const validationSchema = Yup.object().shape({});

  const form = {
    onSubmit,
    initialValues,
    validationSchema,
  };

  return (
    <>
      <DeliveryServiceButton
        type="button"
        onClick={onOpenModal}
        data-testid="select-delivery-service-modal"
      >
        {children}
      </DeliveryServiceButton>

      <ModalWindow
        isOpen={isOpenModalDelivery}
        setIsOpen={setIsOpenModalDelivery}
        $width="45.75rem"
        padding={0}
      >
        <DeliveryServiceModalForm
          form={form}
          deliveryValues={deliveryValues}
          variantId={variantId}
          deliveryMethodsRadio={deliveryMethodsRadio}
          product={product}
        />
      </ModalWindow>
    </>
  );
};

export default DeliveryServiceModal;
