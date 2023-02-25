import React from 'react';

import WorkTimeFormatter from '../WorkTimeFormatter';

import { DeliveryPointInfoWrapper, Col, PhonesWrapper, PhonesList, PhoneItem } from './styled';

const DeliveryPointInfoRadio = ({ deliveryPoint }) => {
  const { address, phones, openingHours } = deliveryPoint || {};

  return (
    <DeliveryPointInfoWrapper>
      <Col>{address}</Col>
      <Col>
        <PhonesWrapper>
          Контактный номер:
          <PhonesList>
            {phones.map((phoneNumber, i) => (
              <PhoneItem key={i}>{phoneNumber}</PhoneItem>
            ))}
          </PhonesList>
        </PhonesWrapper>
        <WorkTimeFormatter openingHours={openingHours} />
      </Col>
    </DeliveryPointInfoWrapper>
  );
};

export default DeliveryPointInfoRadio;
