import React, { useEffect, useState } from 'react';
import { useFormikContext } from 'formik';

import ModalWindow from 'components/shared/atoms/ModalWindow';

import {
  deliveryPointFields,
  deliveryServices,
  shipmentMethods,
} from 'config/constants/createProductDelivery';

import SelectDeliveryPointForm from './SelectDeliveryPointForm';
import DeliveryPointInfo from './DeliveryPointInfo/DeliveryPointInfo';

import { DeliveryPointWrapper, DeliveryPointTitle, Link } from './styled';

const DeliveryPoint = ({
  point,
  readOnly = false,
  deliveryPointsList,
  initialDeliveryPoints,
  dellinFreightTypesOptions,
}) => {
  const { service, label, deliveryPoint } = point;
  const { values, setFieldValue } = useFormikContext();
  const [isOpen, setIsOpen] = useState(false);

  const { shipmentMethod } = values;
  const noInitialDeliveryPoints = Object.values(initialDeliveryPoints).every(pointId => !pointId);

  const onOpenModal = () => setIsOpen(true);
  const onCloseModal = () => setIsOpen(false);

  useEffect(() => {
    if (
      shipmentMethod === shipmentMethods.DELIVERY_POINT &&
      service === deliveryServices.DELLIN &&
      noInitialDeliveryPoints
    ) {
      onOpenModal();
    }
  }, [shipmentMethod]);

  useEffect(() => {
    const currentDeliveryPoint = values[deliveryPointFields[service]];
    if (
      shipmentMethod === shipmentMethods.DELIVERY_POINT &&
      currentDeliveryPoint.deliveryPoint === null
    ) {
      setFieldValue(deliveryPointFields[service], {
        ...currentDeliveryPoint,
        deliveryPoint:
          (initialDeliveryPoints[service]
            ? deliveryPointsList[service].find(({ id }) => id === initialDeliveryPoints[service])
            : deliveryPointsList[service][0]) || null,
      });
    }
  }, [shipmentMethod, deliveryPointsList, initialDeliveryPoints, service]);

  return (
    <>
      <DeliveryPointWrapper>
        <DeliveryPointTitle>Терминал {label}</DeliveryPointTitle>
        {deliveryPoint ? (
          <DeliveryPointInfo
            deliveryPoint={deliveryPoint}
            dellinFreightTypesOptions={dellinFreightTypesOptions}
            service={service}
            readOnly={readOnly}
          />
        ) : (
          <div>
            Я не хочу сотрудничать
            <br /> с компанией {label}
          </div>
        )}
        {!readOnly && (
          <Link onClick={onOpenModal} data-testid="select-delivery-point-modal-button">
            {deliveryPoint ? 'Изменить терминал' : 'Выбрать терминал'}
          </Link>
        )}
      </DeliveryPointWrapper>

      <ModalWindow
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isClosable={false}
        closeOnOverlayClick={false}
        $width="43.75rem"
        padding={0}
      >
        <SelectDeliveryPointForm
          service={service}
          onCloseModal={onCloseModal}
          deliveryPointsList={deliveryPointsList}
        />
      </ModalWindow>
    </>
  );
};

export default DeliveryPoint;
