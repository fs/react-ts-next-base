import React from 'react';
import { dateFormat } from 'helpers';

import { deliveryMethods, deliveryServices } from 'config/constants/delivery';
import { DASHBOARD_COMPANY_ORDER_TRACKING } from 'config/routes';

import Icon from 'components/shared/atoms/Icon';
import ActionLink from 'components/shared/atoms/ActionLink';

import ActionsButtons from '../ActionsButtons';
import { TActionContent } from './types';
import { DeliveryDate, DeliveryDateInfo, ActionsWrapper, ButtonsWrapper } from '../../styled';

export const ActionContent: React.FunctionComponent<TActionContent> = ({
  companyId,
  variant,
  isDetailed = false,
  refetchOrders,
  isUserBuyer,
  order,
}) => {
  const {
    id: orderId,
    deliveryMethod,
    pickupDate,
    deliveryMinDate,
    deliveryMaxDate,
    deliveryService,
  } = order;

  const isPickup = deliveryMethod === deliveryMethods.PICKUP;
  const isSellerDelivery = deliveryService === deliveryServices.SELLER;

  return (
    <ActionsWrapper>
      <DeliveryDate>
        <Icon name="truck" $size={24} $color="blue" $mr={8} />
        {isPickup ? (
          <DeliveryDateInfo>Дата самовывоза: {dateFormat(pickupDate)}</DeliveryDateInfo>
        ) : (
          <DeliveryDateInfo>
            <div>
              Дата доставки:&nbsp;
              {deliveryMinDate !== deliveryMaxDate
                ? `c ${dateFormat(deliveryMinDate)} по ${dateFormat(deliveryMaxDate)}`
                : dateFormat(deliveryMinDate)}
            </div>
            {!isSellerDelivery && (
              <ActionLink
                label="Просмотреть отслеживание"
                href={{ pathname: DASHBOARD_COMPANY_ORDER_TRACKING, query: { companyId, orderId } }}
              />
            )}
          </DeliveryDateInfo>
        )}
      </DeliveryDate>
      <ButtonsWrapper>
        <ActionsButtons
          variant={variant}
          refetchOrders={refetchOrders}
          isDetailed={isDetailed}
          companyId={companyId}
          order={order}
          isUserBuyer={isUserBuyer}
        />
      </ButtonsWrapper>
    </ActionsWrapper>
  );
};

export default ActionContent;
