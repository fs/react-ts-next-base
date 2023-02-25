import React, { useMemo } from 'react';
import { useModal } from '@ebay/nice-modal-react';

import { useCancelReservedOrder, useConfirmReservedOrder } from 'lib/apollo/hooks/actions/order';

import { DeliveryMethodEnum, DeliveryServiceEnum, OrderReservationStatusEnum } from 'graphql/types';

import Button from 'components/shared/atoms/Button';
import Tooltip from 'components/shared/atoms/Tooltip';
import Collapsible from 'components/shared/atoms/Collapsible';
import SimpleModal from 'components/shared/molecules/Modal/SimpleModal';
import OrderTrackingInfo from 'components/shared/molecules/OrderTrackingInfo';
import SupportRequestModal from 'components/shared/molecules/SupportRequestModal';
import OrderDetails from 'components/shared/organisms/OrderDetails';
import OrderCartDetails from 'components/shared/organisms/OrderCartDetails';
import OrderProductDetails from 'components/shared/organisms/OrderProductDetails';

import { dateDiff } from 'helpers';
import { TReservedOrders } from './types';
import {
  ReservedOrdersWrapper,
  Notice,
  ImageWrapper,
  NoticeImage,
  NoticeDescription,
  OrderCartWrapper,
  ButtonsWrapper,
  OrderDetailsWrapper,
  ModalSubtitle,
} from './styled';

const ReservedOrders = ({ isCompanyVerified, orders, refetchReservedOrders }: TReservedOrders) => {
  const [order] = orders || [];
  const {
    id: orderId,
    reservationStatus,
    quantity,
    deliveryMethod,
    deliveryService,
    product,
    canRequestSupport,
    expiredAt,
  } = order || {};

  const title = isCompanyVerified
    ? 'Поздравляем, вы зарегистрировали компанию!'
    : 'Эта страница будет вам доступна после того, как компания пройдет проверку.';
  const description = useMemo(() => {
    if (reservationStatus === OrderReservationStatusEnum.SupportRequested) {
      return 'Скоро с вами свяжутся наши администраторы. По результатам разговора, администраторы оформят или удалят ваш заказ.';
    }
    if (reservationStatus === OrderReservationStatusEnum.PendingConfirmation) {
      return `У вас ${dateDiff({
        start: new Date(),
        end: new Date(expiredAt),
      }).toLowerCase()}, чтобы принять одно из предложенных ниже действий по заказу. Если вы ничего не выберите, заказ будет отменен автоматически.`;
    }
    return 'Заказ практически оформлен! Доступ к счетам по заказу вы получите после того, как администраторы нашего сервиса подтвердят вашу компанию.';
  }, [reservationStatus]);

  const isPickup = deliveryMethod === DeliveryMethodEnum.Pickup;
  const isSellerDelivery = deliveryService === DeliveryServiceEnum.Seller;

  const productDetailsAccordion = [
    {
      name: 'product-details-info',
      heading: `Товар “${product?.name}”`,
      content: <OrderProductDetails order={order} />,
      noContent: 'Описание отсутствует',
      $ml: 32,
      $mb: 8,
    },
  ];

  const confirmModal = useModal(SimpleModal);
  const supportRequestModal = useModal(SupportRequestModal);

  const [cancelReservedOrder] = useCancelReservedOrder({
    orderId,
    onSubmit: refetchReservedOrders,
  });
  const [confirmReservedOrder] = useConfirmReservedOrder({
    orderId,
    onSubmit: refetchReservedOrders,
  });

  const showSupportRequest = async () => {
    await supportRequestModal.show({
      initialSubject: `Помощь в оформлении заказа №${orderId}`,
      onSubmitRequest: refetchReservedOrders,
      orderId,
    });
  };

  const showCancelReservedOrder = () =>
    confirmModal.show({
      onSubmit: async () => {
        await cancelReservedOrder();
      },
      title: 'Отменить заказ',
      description: 'Вы уверены, что хотите отменить заказ?',
      acceptText: 'Отменить заказ',
    });

  const showConfirmReservedOrder = () =>
    confirmModal.show({
      onSubmit: async () => {
        await confirmReservedOrder();
      },
      title: 'Оформить заказ',
      description: (
        <>
          <ModalSubtitle>
            Вы уверены, что хотите оформить заказ <b>№{orderId}</b>?
          </ModalSubtitle>
          При нажатии на “Подтвердить” заказ <b>№{orderId}</b> будет автоматически оформлен после
          подтверждения компании
        </>
      ),
      acceptText: 'Подтвердить',
    });

  return (
    <ReservedOrdersWrapper>
      <Notice data-testid="guest-order-notice">
        <ImageWrapper>
          <NoticeImage
            alt="checking-company"
            src={`${process.env.ASSET_HOST}/images/checking-company-image.png`}
          />
        </ImageWrapper>
        <NoticeDescription>
          <strong data-testid="guest-order-notice-title">{title}</strong>
          <br />
          <span data-testid="guest-order-notice-description">{description}</span>
        </NoticeDescription>
      </Notice>

      {reservationStatus === OrderReservationStatusEnum.PendingConfirmation ? (
        <OrderCartWrapper>
          <OrderCartDetails order={order} summaryCount={quantity} />

          <ButtonsWrapper>
            {canRequestSupport.value && (
              <Tooltip text="Заказ не будет официально оформлен, но будет сохранен в вашем личном кабинете. С вами свяжутся администраторы сайта. По результатам разговора, администраторы оформят или удалят ваш заказ.">
                <Button
                  testId="request-support-reserved-order-button"
                  label="Попросить звонок"
                  $mr={16}
                  onClick={showSupportRequest}
                />
              </Tooltip>
            )}
            <Button
              testId="cancel-reserved-order-button"
              label="Отменить заказ"
              $mr={16}
              onClick={showCancelReservedOrder}
            />
            <Button
              testId="confirm-reserved-order-button"
              label="Оформить заказ"
              variant="confirm"
              onClick={showConfirmReservedOrder}
            />
          </ButtonsWrapper>
        </OrderCartWrapper>
      ) : (
        <>
          <OrderDetails order={order} isDetailed />

          {!isPickup && !isSellerDelivery && <OrderTrackingInfo order={order} />}

          <OrderDetailsWrapper>
            <Collapsible accordion={productDetailsAccordion} />
          </OrderDetailsWrapper>
        </>
      )}
    </ReservedOrdersWrapper>
  );
};

export default ReservedOrders;
