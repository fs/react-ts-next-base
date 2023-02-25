import React, { useEffect } from 'react';

import Radio from 'components/shared/atoms/Radio';

import { numberFormat, dateFormat, phoneFormatter } from 'helpers';
import { deliveryServices, deliveryServicesLabel } from 'config/constants/delivery';

import {
  Title,
  AddressWrapper,
  AddressCol,
  ServicesListHeader,
  ServicesList,
  Col,
  RadioItem,
} from './styled';

const courierInfo = ['Дата доставки', 'Стоимость', 'Служба'];
const SelectCourier = ({ location, values, setFieldValue, courierList }) => {
  const { address, postcode, comment, phoneNumber } = location;

  const courierServicesRadio = courierList.map(
    ({ service, startDate, endDate, price, available }) => ({
      value: service,
      disabled: !available,
      label: (
        <RadioItem>
          {available ? (
            <>
              <Col>
                {dateFormat(startDate)}
                {startDate !== endDate && `-${dateFormat(endDate)}`}
              </Col>
              <Col>{price === 0 ? 'Бесплатно' : `${numberFormat(price)} руб.`}</Col>
              <Col>{deliveryServicesLabel[service]}</Col>
            </>
          ) : (
            <Col disabled={!available}>
              Служба доставки{' '}
              {service === deliveryServices.SELLER ? 'продавца' : deliveryServicesLabel[service]}{' '}
              недоступна
            </Col>
          )}
        </RadioItem>
      ),
    }),
  );

  useEffect(() => {
    if (!values.service)
      setFieldValue('service', courierList.find(({ available }) => available) || null);
  }, []);

  return (
    <>
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

      <div>
        <Title>Выберите службу доставки</Title>
        <ServicesList>
          <ServicesListHeader>
            {courierInfo.map((item, i) => (
              <Col key={i}>{item}</Col>
            ))}
          </ServicesListHeader>
          <Radio
            options={courierServicesRadio}
            name="service"
            direction="column"
            selected={values.service?.service}
            onChange={value =>
              setFieldValue(
                'service',
                courierList.find(({ service }) => service === value),
              )
            }
            boldSelectedValue
          />
        </ServicesList>
      </div>
    </>
  );
};

export default SelectCourier;
