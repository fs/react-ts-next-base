import React, { useCallback, useEffect, useMemo } from 'react';

import Radio from 'components/shared/atoms/Radio';

import DeliveryPointInfoRadio from 'components/pages/dashboard/companyProducts/components/DeliveryPoint/DeliveryPointInfo/DeliveryPointInfoRadio';

import { numberFormat, dateFormat } from 'helpers';
import { deliveryServicesLabel } from 'config/constants/delivery';

import {
  Title,
  Separator,
  ServicesList,
  ServicesListHeader,
  Col,
  RadioItem,
  TerminalsList,
} from './styled';

const deliveryServiceItems = ['Дата доставки', 'Стоимость', 'Служба'];

const SelectDeliveryPoint = ({ values, setFieldValue, servicesList }) => {
  const deliveryPointsList = servicesList.find(
    ({ service }) => service === values?.service?.service,
  )?.deliveryPoints;

  const servicesRadio = useMemo(
    () =>
      servicesList.map(({ service, startDate, endDate, price, available }) => ({
        value: service,
        disabled: !available,
        label: (
          <RadioItem>
            <Col>
              {dateFormat(startDate)}
              {startDate !== endDate && `-${dateFormat(endDate)}`}
            </Col>
            <Col>{price === 0 ? 'Бесплатно' : `${numberFormat(price)} руб.`}</Col>
            <Col>{deliveryServicesLabel[service]}</Col>
          </RadioItem>
        ),
      })),
    [servicesList],
  );

  const deliveryPointsRadio = useCallback(
    deliveryPoints => {
      return deliveryPoints.map(({ id, ...deliveryPoint }) => ({
        value: id,
        label: <DeliveryPointInfoRadio deliveryPoint={deliveryPoint} />,
      }));
    },
    [deliveryPointsList],
  );

  useEffect(() => {
    const serviceItem = servicesList.find(({ available }) => available);
    if (!values.service) setFieldValue('service', serviceItem || null);
    if (!values.deliveryPoint) setFieldValue('deliveryPoint', serviceItem.deliveryPoints[0]);
  }, []);

  return (
    <>
      <Title>Выберите службу доставки</Title>
      <ServicesList>
        <ServicesListHeader>
          {deliveryServiceItems.map((item, i) => (
            <Col key={i}>{item}</Col>
          ))}
        </ServicesListHeader>
        <Radio
          options={servicesRadio}
          name="service"
          direction="column"
          selected={values.service?.service}
          onChange={value => {
            const newService = servicesList.find(({ service }) => service === value);
            setFieldValue('service', newService);
            setFieldValue('deliveryPoint', newService.deliveryPoints[0]);
          }}
        />
      </ServicesList>
      <Separator />
      <Title>Адреса ближайших к вам терминалов</Title>
      <TerminalsList>
        <Radio
          options={deliveryPointsRadio(deliveryPointsList || [])}
          name="deliveryPoint"
          direction="column"
          selected={values.deliveryPoint?.id}
          onChange={value =>
            setFieldValue(
              'deliveryPoint',
              deliveryPointsList.find(({ id }) => id === value),
            )
          }
          boldSelectedValue
        />
      </TerminalsList>
    </>
  );
};

export default SelectDeliveryPoint;
