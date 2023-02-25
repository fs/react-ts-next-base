import React from 'react';
import * as Yup from 'yup';
import { useModal } from '@ebay/nice-modal-react';

import {
  useConfirmReturnedShipment,
  useRejectReturnedShipment,
} from 'lib/apollo/hooks/actions/returnedShipment';
import { REQUIRED_FIELD } from 'config/constants/errorsText';

import { dateFormat } from 'helpers';
import { CustomerOrdersQueryResult } from 'graphql/queries/__generated__/customerOrders.generated';
import { ReturnedShipmentFragment } from 'graphql/fragments/__generated__/returnedShipmentInfo.generated';

import Input from 'components/shared/atoms/Input';
import Button from 'components/shared/atoms/Button';
import Photos from 'components/shared/molecules/Photos';
import SimpleModal from 'components/shared/molecules/Modal/SimpleModal';

import {
  ConfirmReturnedShipmentWrapper,
  ReturnShipmentDetails,
  Title,
  DateDelivery,
  ActionsWrapper,
} from './styled';

type TConfirmReturnedShipment = {
  returnedShipment: ReturnedShipmentFragment;
  refetchOrders?: CustomerOrdersQueryResult['refetch'];
};

const ConfirmReturnedShipment = ({ returnedShipment, refetchOrders }: TConfirmReturnedShipment) => {
  const { id: returnedShipmentId, attachments, endDate, startDate } = returnedShipment;

  const [rejectReturnedShipment] = useRejectReturnedShipment({ onSubmit: refetchOrders });
  const [confirmReturnedShipment] = useConfirmReturnedShipment({ onSubmit: refetchOrders });
  const rejectReturnedShipmentModal = useModal(SimpleModal);
  const confirmReturnedShipmentModal = useModal(SimpleModal);

  const showRejectReturnedShipment = () =>
    rejectReturnedShipmentModal.show({
      variant: 'change',
      roundedButton: true,
      onSubmit: async ({ rejectComment }: { rejectComment?: string }) => {
        rejectComment && (await rejectReturnedShipment({ returnedShipmentId, rejectComment }));
      },
      title: 'Опишите ошибку',
      description:
        'Нажимая “Подтвердить”, вы отправляете уведомление пользователю о том, что он должен отредактировать данные',
      form: {
        body: (
          <Input
            rounded
            type="textarea"
            testId="reject-comment"
            placeholder="Добавьте поясняющий комментарий"
            name="rejectComment"
          />
        ),
        initialValues: {
          rejectComment: '',
        },
        validationSchema: Yup.object().shape({
          rejectComment: Yup.string().required(REQUIRED_FIELD),
        }),
      },
    });

  const showConfirmReturnedShipment = () =>
    confirmReturnedShipmentModal.show({
      variant: 'confirm',
      roundedButton: true,
      onSubmit: async () => {
        await confirmReturnedShipment({ returnedShipmentId });
      },
      title: 'Подтверждение документа',
      description:
        'Нажимая “Подтвердить”, вы отправляете эти данные Продавцу. Как только продавец подтвердит получение товара спор будет завершен',
    });

  return (
    <ConfirmReturnedShipmentWrapper>
      <ReturnShipmentDetails>
        <Title>Промежуток, в который товар будет доставлен продавцу:</Title>
        <DateDelivery>
          от <span>{dateFormat(startDate)}</span> до <span>{dateFormat(endDate)}</span>
        </DateDelivery>

        <Title>Фото документа:</Title>
        <Photos
          images={attachments?.map(({ attachmentUrl, id, originalFilename }) => ({
            id,
            url: attachmentUrl,
            metadata: { filename: originalFilename || 'image' },
          }))}
          editable={false}
        />
      </ReturnShipmentDetails>

      <ActionsWrapper>
        <Button
          variant="confirm"
          label="Принять"
          $width="8.75rem"
          onClick={showConfirmReturnedShipment}
          testId="confirm-returned-shipment-button"
        />
        <Button
          variant="change"
          label="Отклонить"
          $width="8.75rem"
          onClick={showRejectReturnedShipment}
          testId="reject-returned-shipment-button"
        />
      </ActionsWrapper>
    </ConfirmReturnedShipmentWrapper>
  );
};

export default ConfirmReturnedShipment;
