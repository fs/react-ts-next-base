import React from 'react';
import { capitalize } from 'lodash';

import { EXECUTION_STATUS_LABEL } from 'config/constants/executionStatus';

import { DeliveryHistoryWrapper, Title, DeliveryPoint, Mark, DeliveryPointInfo } from './styled';

const DeliveryHistory = () => {
  // MOCK DATA
  const mockTrackingPoints = [
    {
      point: '20.06.2019 17:56(Мск) Доставлен до места назначения',
      status: 'DELIVERED',
      date: '12.08.2019 17:56(Мск)',
    },
    {
      point: '12.06.2019 17:56(Мск) В пути в Москву',
      status: 'IN_TRANSIT',
      date: '12.08.2019 17:56(Мск)',
    },
    {
      point: '08.06.2019 17:56(Мск) Готов к отправке со склада в Казани',
      status: 'IN_TRANSIT',
      date: '12.08.2019 17:56(Мск)',
    },
  ];

  return (
    <DeliveryHistoryWrapper>
      <Title>История доставки заказа</Title>
      {mockTrackingPoints.map(({ point, status, date }, i) => (
        <DeliveryPoint key={i} status={status}>
          <Mark status={status} />
          <DeliveryPointInfo>
            <strong>Адрес нахождения заказа: </strong> {point}
            <br />
            <strong>Статус: </strong> {capitalize(EXECUTION_STATUS_LABEL[status])}
            <br />
            <strong>Дата: </strong> {date}
            <br />
          </DeliveryPointInfo>
        </DeliveryPoint>
      ))}
    </DeliveryHistoryWrapper>
  );
};

export default DeliveryHistory;
