import React from 'react';

import { shipmentMethods, deliveryServices } from 'config/constants/createProductDelivery';

import { useFormikContext } from 'formik';
import WorkTimeFormatter from '../WorkTimeFormatter';
import DellinFreightTypeSelect from '../../DellinFreightTypeSelect';

import {
  DeliveryPointInfoWrapper,
  InfoWrapper,
  PhonesWrapper,
  PhonesList,
  PhoneItem,
  DellinFreightTypesWrapper,
} from './styled';

const DeliveryPointInfo = ({
  deliveryPoint,
  dellinFreightTypesOptions,
  service,
  readOnly = false,
}) => {
  const { values } = useFormikContext();
  const { address, phones, openingHours } = deliveryPoint || {};
  const { shipmentMethod } = values;

  const isShowSelectDellinFreightType =
    shipmentMethod === shipmentMethods.DELIVERY_POINT &&
    !!values.dellinDeliveryPoint?.deliveryPoint &&
    service === deliveryServices.DELLIN;

  return (
    <DeliveryPointInfoWrapper>
      <InfoWrapper>
        <div>{address}</div>
        <div>
          <PhonesWrapper>
            Контактный номер:
            <PhonesList>
              {phones.map((phoneNumber, i) => (
                <PhoneItem key={i}>{phoneNumber}</PhoneItem>
              ))}
            </PhonesList>
          </PhonesWrapper>
          <WorkTimeFormatter openingHours={openingHours} />
        </div>
      </InfoWrapper>

      {isShowSelectDellinFreightType && dellinFreightTypesOptions.length && (
        <DellinFreightTypesWrapper>
          <DellinFreightTypeSelect disabled={readOnly} options={dellinFreightTypesOptions} />
        </DellinFreightTypesWrapper>
      )}
    </DeliveryPointInfoWrapper>
  );
};

export default DeliveryPointInfo;
