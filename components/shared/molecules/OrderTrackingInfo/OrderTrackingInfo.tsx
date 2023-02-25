import React from 'react';

import { DASHBOARD_COMPANY_ORDER_TRACKING } from 'config/routes';
import { deliveryServicesLabel } from 'config/constants/delivery';

import ActionLink from 'components/shared/atoms/ActionLink';

import { TOrderTrackingInfo } from './types';
import { OrderTrackingInfoWrapper, Title, Row, Col, TrackingPoints, TrackingPoint } from './styled';

const trackingInfo = ['Транспортная компания', 'Номер отслеживания', 'Местонахождение груза'];

const OrderTrackingInfo = ({ order }: TOrderTrackingInfo) => {
  const {
    deliveryService,
    id: orderId,
    seller: { id: sellerId, myRole },
    buyer,
  } = order;
  const isUserBuyer = !myRole;
  const companyId = isUserBuyer ? buyer?.id : sellerId;

  // MOCK DATA
  const mockTrackNumber = 'DD8965446679087';
  const mockTrackingPoints = [
    '20.06.2019 17:56(Мск) Доставлен до места назначения',
    '12.06.2019 17:56(Мск) В пути в Москву',
    '08.06.2019 17:56(Мск) Готов к отправке со склада в Казани',
  ];

  return (
    <OrderTrackingInfoWrapper>
      <Title>Отслеживание заказа</Title>
      <Row header>
        {trackingInfo.map((label, i) => (
          <Col key={i}>{label}</Col>
        ))}
      </Row>
      <Row>
        <Col>{deliveryService && deliveryServicesLabel[deliveryService]}</Col>
        <Col>{mockTrackNumber}</Col>
        <Col>
          <TrackingPoints>
            {mockTrackingPoints.map((point, i) => (
              <TrackingPoint key={i} current={!i}>
                {point}
              </TrackingPoint>
            ))}
            <ActionLink
              label="Посмотреть еще"
              href={{ pathname: DASHBOARD_COMPANY_ORDER_TRACKING, query: { companyId, orderId } }}
            />
          </TrackingPoints>
        </Col>
      </Row>
    </OrderTrackingInfoWrapper>
  );
};

export default OrderTrackingInfo;
