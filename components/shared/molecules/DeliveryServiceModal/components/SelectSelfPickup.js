import React from 'react';
import { phoneFormatter } from 'helpers';

import DatePickerInput from 'components/shared/molecules/DatePickerInput';

import { TitleAddress, AddressWrapper, AddressCol, Title, DatePickup } from './styled';

const SelectSelfPickup = ({ companyLocation, setFieldValue, values }) => {
  const { address, postcode, comment, phoneNumber } = companyLocation;

  return (
    <>
      <TitleAddress>Адрес магазина</TitleAddress>
      <AddressWrapper>
        <AddressCol>
          <div>
            {address}, {postcode}
          </div>
          <div>Контактный телефон: {phoneFormatter(phoneNumber)}</div>
        </AddressCol>
        <AddressCol>
          <div>Комментарий: {comment}</div>
        </AddressCol>
      </AddressWrapper>
      <Title>Укажите дату вашего приезда за товаром</Title>
      <DatePickup>
        <span>Впишите дату</span>
        <DatePickerInput
          size="small"
          $width="9rem"
          name="pickupDate"
          placeholder="дд.мм.гг"
          setFieldValue={setFieldValue}
          currentDate={values.pickupDate}
        />
      </DatePickup>
    </>
  );
};

export default SelectSelfPickup;
