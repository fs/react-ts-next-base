import React from 'react';
import useRouter from 'hooks/useRouter';
import NiceModal, { useModal } from '@ebay/nice-modal-react';

import { ADMIN_ANALYTICAL_ACCOUNT } from 'config/routes';

import { useCancelDispute } from 'lib/apollo/hooks/actions/dispute';
import { useReceiveReturnedShipment } from 'lib/apollo/hooks/actions/returnedShipment';
import {
  useConfirmReservedOrder,
  useDestroyOrder,
  useFinishOrderDelivery,
  useCancelReservedOrder,
  useConfirmOrderPayment,
} from 'lib/apollo/hooks/actions/order';

import Button from 'components/shared/atoms/Button';
import SimpleModal from 'components/shared/molecules/Modal/SimpleModal';

import ReviewDetailsModal from '../ReviewDetailsModal';
import {
  TCancelDisputeButton,
  TConfirmOrderPaymentButton,
  TDeleteOrderButton,
  TFinishOrderDeliveryButton,
  TPlaceOrderButton,
  TReceiveReturnedShipmentButton,
  TShowReviewDetails,
  TCancelReservedOrderButton,
} from './types';
import { ModalSubtitle } from './styled';

export const DeleteOrderButton = ({ orderId, sellerName, isDetailed }: TDeleteOrderButton) => {
  const { pushRoute } = useRouter();

  const onDestroy = () => {
    if (isDetailed) {
      pushRoute({
        pathname: ADMIN_ANALYTICAL_ACCOUNT,
      });
    }
  };
  const [destroyOrder] = useDestroyOrder({ orderId, onSubmit: onDestroy });
  const destroyOrderModal = useModal(SimpleModal);

  const showConfirmDeleteOrder = () =>
    destroyOrderModal.show({
      roundedButton: true,
      onSubmit: async () => {
        await destroyOrder();
      },
      title: 'Удаление заказа',
      description: (
        <>
          Нажимая “Подтвердить”, вы соглашаетесь с тем, что <b>{sellerName}</b> нарушила условия
          Агентского договора и ст. 395 ГК РФ.
        </>
      ),
    });

  return (
    <Button
      testId="delete-order-button"
      label="Удалить"
      shape="rounded"
      $width="9rem"
      onClick={showConfirmDeleteOrder}
    />
  );
};

export const ConfirmOrderPaymentButton = ({ orderId, isDetailed }: TConfirmOrderPaymentButton) => {
  const [confirmOrderPayment] = useConfirmOrderPayment({ orderId, deleteFromCache: !isDetailed });
  const confirmOrderPaymentModal = useModal(SimpleModal);

  const showConfirmOrderPayment = () =>
    confirmOrderPaymentModal.show({
      variant: 'confirm',
      roundedButton: true,
      onSubmit: async () => {
        await confirmOrderPayment();
      },
      title: 'Подтверждение оплаты заказа',
      description:
        'Нажимая “Подтвердить”, вы даете согласие на смену статуса заказа с “Не оплачен” на “Подтвержден”.',
    });

  return (
    <Button
      label="Подтвердить оплату"
      variant="confirm"
      shape="rounded"
      onClick={showConfirmOrderPayment}
      testId="confirm-order-payment-button"
    />
  );
};

export const CancelDisputeButton = ({ dispute, orderId, refetchOrders }: TCancelDisputeButton) => {
  const [cancelDispute] = useCancelDispute({
    disputeId: dispute?.id,
    orderId,
    onSubmit: refetchOrders,
  });
  const cancelDisputeModal = useModal(SimpleModal);

  const showCancelDispute = () =>
    cancelDisputeModal.show({
      onSubmit: async () => {
        await cancelDispute();
      },
      title: 'Отменить спор',
      description: 'Вы уверены, что хотите отменить спор?',
      subDescription:
        'Если вы отмените спор по заказу или товару, вы не сможете открыть его повторно.',
      cancelText: 'Вернуться к спору',
      acceptText: 'Отменить спор',
    });
  return (
    <Button testId="cancel-dispute-button" label="Отменить спор" onClick={showCancelDispute} />
  );
};

export const FinishOrderDeliveryButton = ({ orderId }: TFinishOrderDeliveryButton) => {
  const [finishOrderDelivery] = useFinishOrderDelivery({ orderId });
  const finishOrderDeliveryModal = useModal(SimpleModal);

  const showFinishOrderDelivery = () =>
    finishOrderDeliveryModal.show({
      onSubmit: async () => {
        await finishOrderDelivery();
      },
      title: 'Подтверждение доставки',
      description:
        'Нажимая на кнопку “Подтвердить”, вы не сможете открыть спор по заказу. Этим вы подтверждаете, что товар доставлен в целости.',
    });

  return (
    <Button
      testId="finish-order-delivery-button"
      label="Заказ доставлен"
      onClick={showFinishOrderDelivery}
      $width="9rem"
    />
  );
};

export const PlaceOrderButton = ({ orderId, buyer }: TPlaceOrderButton) => {
  const [confirmReservedOrder] = useConfirmReservedOrder({ orderId });
  const placeOrderModal = useModal(SimpleModal);
  const buyerFullName = `${buyer?.legalForm?.shortName} "${buyer?.officialName}"`;

  const description = buyer ? (
    <>
      <ModalSubtitle>Вы связались с компанией {buyerFullName}?</ModalSubtitle>
      Нажимая “Подтвердить”, вы оформите заказ <b>№{orderId}</b> и компании {buyerFullName} будут
      высланы счета по заказу.
    </>
  ) : (
    <>
      <ModalSubtitle>Вы связались с пользователем?</ModalSubtitle>
      При нажатии “Подтвердить” заказ <b>№{orderId}</b> будет автоматически оформлен после
      подтверждения компании.
    </>
  );

  const showConfirmReservedOrder = () =>
    placeOrderModal.show({
      onSubmit: async () => {
        await confirmReservedOrder();
      },
      title: 'Оформление заказа',
      description,
      roundedButton: true,
      variant: 'confirm',
    });

  return (
    <Button
      label="Оформить"
      variant="confirm"
      shape="rounded"
      testId="admin-place-reserved-button"
      onClick={showConfirmReservedOrder}
      $width="9rem"
    />
  );
};

export const ReceiveReturnedShipmentButton = ({
  refetchOrders,
  dispute,
}: TReceiveReturnedShipmentButton) => {
  const [receiveReturnedShipment] = useReceiveReturnedShipment({ onSubmit: refetchOrders });
  const receiveReturnedShipmentModal = useModal(SimpleModal);

  const showReceiveReturnedShipment = () =>
    receiveReturnedShipmentModal.show({
      variant: 'confirm',
      onSubmit: async () => {
        await receiveReturnedShipment({ disputeId: dispute.id });
      },
      title: 'Подтверждение получения товара',
      description:
        'Нажимая “Подтвердить” вы завершаете спор и суммы, о которых вы договорились в процессе переговоров, будут зачислены на ваши Аналитические счета.',
    });

  return (
    <Button
      testId="receive-returned-shipment-button"
      variant="confirm"
      label="Товар получен"
      onClick={showReceiveReturnedShipment}
    />
  );
};

export const ShowReviewDetails = ({ order }: TShowReviewDetails) => {
  const showReviewDetails = () =>
    NiceModal.show(ReviewDetailsModal, {
      order,
    });
  return (
    <Button
      testId="show-review-details-button"
      label="Посмотреть отзыв"
      variant="hollow-primary"
      onClick={showReviewDetails}
    />
  );
};

export const CancelReservedOrderButton = ({ orderId }: TCancelReservedOrderButton) => {
  const [cancelReservedOrder] = useCancelReservedOrder({ orderId });
  const cancelReservedOrderModal = useModal(SimpleModal);

  const showCancelReservedOrder = () =>
    cancelReservedOrderModal.show({
      onSubmit: async () => {
        await cancelReservedOrder();
      },
      title: 'Отменить заказ',
      description: 'Вы уверены, что хотите отменить заказ?',
      cancelText: 'Вернуться к заказу',
      acceptText: 'Отменить заказ',
    });

  return (
    <Button
      label="Отменить"
      variant="primary"
      shape="rounded"
      testId="admin-cancel-reserved-button"
      onClick={showCancelReservedOrder}
      $width="9rem"
    />
  );
};
