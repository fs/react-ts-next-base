import React from 'react';
import { phoneFormatter } from 'helpers';

import { DeliveryAddressWrapper, Title } from './styled';

const DeliveryAddress = ({ order }) => {
  const {
    companyLocation: { address, phoneNumber, postcode },
  } = order;

  return (
    <DeliveryAddressWrapper>
      <Title>Адрес доставки</Title>
      {address}
      <br />
      Индекс: {postcode}
      <br />
      Телефон: {phoneFormatter(phoneNumber)}
    </DeliveryAddressWrapper>
  );
};

export default DeliveryAddress;
