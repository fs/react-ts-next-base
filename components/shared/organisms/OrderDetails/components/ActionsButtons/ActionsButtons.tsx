import React, { FunctionComponent } from 'react';

import { ANALYTICAL_OPERATION } from 'config/constants/analyticalAccount';

import Button from 'components/shared/atoms/Button';
import {
  OrderCheckoutStatusEnum,
  OrderExecutionStatusEnum,
  OrderReservationStatusEnum,
} from 'graphql/types';

import {
  ADMIN_ANALYTICAL_ACCOUNT_DOCUMENTS,
  ADMIN_DISPUTE,
  ADMIN_CREATE_DISPUTE_PROPOSAL,
  DASHBOARD_COMPANY_CREATE_RETURNED_SHIPMENT,
  DASHBOARD_COMPANY_OPEN_DISPUTE,
  DASHBOARD_COMPANY_ORDER,
  DASHBOARD_COMPANY_ORDER_DOCUMENTS,
} from 'config/routes';

import ReviewModal from '../ReviewModal';

import {
  CancelDisputeButton,
  ConfirmOrderPaymentButton,
  DeleteOrderButton,
  FinishOrderDeliveryButton,
  PlaceOrderButton,
  ReceiveReturnedShipmentButton,
  ShowReviewDetails,
  CancelReservedOrderButton,
} from './Buttons';
import { TActionsButtons } from './types';
import { EVariant } from '../../types';

const {
  Confirmed,
  Delivered,
  DisputeOpened,
  InAssembly,
  InTransit,
  MedagregatorIntervened,
  PaymentPending,
} = OrderExecutionStatusEnum;

const ActionsButtons: FunctionComponent<TActionsButtons> = ({
  order,
  isDetailed,
  refetchOrders = () => {},
  isUserBuyer,
  companyId,
  variant,
}) => {
  const {
    id: orderId,
    buyer,
    seller: { officialName: sellerName },
    executionStatus,
    checkoutStatus,
    dispute,
    canLeaveReview,
    productReview,
    companyReview,
    reservationStatus,
    deletionReason,
  } = order;

  const canCreateReturnedShipment = dispute?.canCreateReturnedShipment.value;
  const canUpdateReturnedShipment = dispute?.returnedShipment?.canUpdate.value;
  const canReceiveReturnedShipment = dispute?.canReceiveReturnedShipment.value;
  const canCreateProposal = dispute?.canCreateProposal.value;
  const canCancelDispute = dispute?.canCancel?.value;

  if (variant === EVariant.ADMIN_OPERATION) {
    const canConfirmReserved =
      reservationStatus !== OrderReservationStatusEnum.Confirmed && !deletionReason;

    if (checkoutStatus === OrderCheckoutStatusEnum.Reserved) {
      return (
        <>
          {!deletionReason && <CancelReservedOrderButton orderId={orderId} />}
          {canConfirmReserved && <PlaceOrderButton buyer={buyer} orderId={orderId} />}
        </>
      );
    }
    if (executionStatus === OrderExecutionStatusEnum.DisputeOpened) {
      return (
        <>
          {!isDetailed && (
            <Button
              label="Подробнее"
              $width="9rem"
              shape="rounded"
              href={{ pathname: ADMIN_DISPUTE, query: { orderId } }}
            />
          )}
        </>
      );
    }
    const canConfirm = executionStatus === OrderExecutionStatusEnum.PaymentPending;
    return (
      <>
        {canConfirm && (
          <DeleteOrderButton orderId={orderId} sellerName={sellerName} isDetailed={isDetailed} />
        )}
        {!isDetailed && (
          <Button
            testId="open-operations-page"
            label="Просмотреть счета"
            shape="rounded"
            href={{
              pathname: ADMIN_ANALYTICAL_ACCOUNT_DOCUMENTS,
              query: { type: ANALYTICAL_OPERATION.ORDER, id: orderId },
            }}
          />
        )}
        {canConfirm && <ConfirmOrderPaymentButton orderId={orderId} isDetailed={isDetailed} />}
      </>
    );
  }

  if (variant === EVariant.ADMIN_DISPUTES)
    return (
      <>
        {canCreateProposal && (
          <Button
            shape="rounded"
            href={{ pathname: ADMIN_CREATE_DISPUTE_PROPOSAL, query: { orderId } }}
            label="Предложить решение"
            testId="create-dispute-proposal-by-admin"
          />
        )}
        {!isDetailed && (
          <Button
            testId="open-dispute-page"
            label="Подробнее"
            $width="9rem"
            shape="rounded"
            href={{ pathname: ADMIN_DISPUTE, query: { orderId } }}
          />
        )}
      </>
    );

  if (variant === EVariant.DOCUMENTS)
    return (
      <>
        {!isDetailed && (
          <Button
            testId="open-documents-page"
            label="Просмотреть счета"
            href={{ pathname: DASHBOARD_COMPANY_ORDER_DOCUMENTS, query: { companyId, orderId } }}
          />
        )}
      </>
    );

  const actionButtons = () => {
    switch (executionStatus) {
      case PaymentPending:
        return (
          isUserBuyer && (
            <Button
              testId="open-accounts-page-button"
              label="Посмотреть счета"
              href={{ pathname: DASHBOARD_COMPANY_ORDER_DOCUMENTS, query: { companyId, orderId } }}
            />
          )
        );
      case InTransit:
        return (
          <>
            {isUserBuyer && (
              <>
                <Button
                  testId="open-dispute-button"
                  label="Открыть спор"
                  $width="9rem"
                  href={{ pathname: DASHBOARD_COMPANY_OPEN_DISPUTE, query: { companyId, orderId } }}
                />

                <FinishOrderDeliveryButton orderId={orderId} />
              </>
            )}
          </>
        );
      case Delivered:
        return (
          <>
            {productReview || companyReview ? (
              <ShowReviewDetails order={order} />
            ) : (
              isUserBuyer && canLeaveReview?.value && <ReviewModal order={order} />
            )}
          </>
        );
      case DisputeOpened:
      case MedagregatorIntervened:
        return (
          <>
            {canCancelDispute && (
              <CancelDisputeButton
                refetchOrders={refetchOrders}
                dispute={dispute}
                orderId={orderId}
              />
            )}
            {canCreateReturnedShipment && (
              <Button
                testId="show-create-returned-shipment-button"
                variant="confirm"
                label="Товар отправлен"
                href={{
                  pathname: DASHBOARD_COMPANY_CREATE_RETURNED_SHIPMENT,
                  query: { companyId, orderId },
                }}
              />
            )}
            {canUpdateReturnedShipment && (
              <Button
                testId="show-update-returned-shipment-button"
                label="Отредактировать данные"
                href={{
                  pathname: DASHBOARD_COMPANY_CREATE_RETURNED_SHIPMENT,
                  query: { companyId, orderId },
                }}
              />
            )}
            {canReceiveReturnedShipment && (
              <ReceiveReturnedShipmentButton dispute={dispute} refetchOrders={refetchOrders} />
            )}
          </>
        );
      case Confirmed:
      case InAssembly:
        return <></>;
      default:
        return <></>;
    }
  };

  const buttonDetails = isDetailed ? (
    <></>
  ) : (
    <Button
      testId="show-more-details"
      label="Подробнее"
      $width="9rem"
      href={{ pathname: DASHBOARD_COMPANY_ORDER, query: { companyId, orderId } }}
    />
  );

  return (
    <>
      {actionButtons()}
      {buttonDetails}
    </>
  );
};

export default ActionsButtons;
