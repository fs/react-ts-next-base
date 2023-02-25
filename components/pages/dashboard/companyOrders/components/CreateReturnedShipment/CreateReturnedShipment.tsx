import React from 'react';
import { FormikHelpers } from 'formik';
import useRouter from 'hooks/useRouter';
import { useModal } from '@ebay/nice-modal-react';

import {
  useCreateReturnedShipment,
  useUpdateReturnedShipment,
} from 'lib/apollo/hooks/actions/returnedShipment';

import { DASHBOARD_COMPANY_ORDER } from 'config/routes';

import { ReturnedShipmentStatusEnum } from 'graphql/types';
import { DisputeFragment } from 'graphql/fragments/__generated__/disputeInfo.generated';

import SimpleModal from 'components/shared/molecules/Modal/SimpleModal';

import { TFormValues } from './fields';
import CreateReturnedShipmentForm from './CreateReturnedShipmentForm';

type TCreateReturnedShipment = {
  dispute: DisputeFragment;
  companyId: string;
  orderId: string;
};

const CreateReturnedShipment = ({ dispute, companyId, orderId }: TCreateReturnedShipment) => {
  const { id: disputeId } = dispute;
  const { pushRoute } = useRouter();

  const isRejectedReturnedShipment =
    dispute?.returnedShipment?.status === ReturnedShipmentStatusEnum.Rejected;

  const onCreateReturnedShipment = () => {
    pushRoute({ pathname: DASHBOARD_COMPANY_ORDER, query: { companyId, orderId } });
  };

  const [createReturnedShipment] = useCreateReturnedShipment({
    onSubmit: onCreateReturnedShipment,
  });
  const [updateReturnedShipment] = useUpdateReturnedShipment({
    onSubmit: onCreateReturnedShipment,
  });
  const updateReturnedShipmentModal = useModal(SimpleModal);

  const onSubmit = async (values: TFormValues, formHelpers: FormikHelpers<TFormValues>) => {
    formHelpers.setSubmitting(false);
    await updateReturnedShipmentModal.show({
      variant: isRejectedReturnedShipment ? 'default' : 'confirm',
      onSubmit: async () => {
        const submitValues = {
          ...values,
          attachments: values.attachments.map(({ attachmentRemoteUrl, attachment }) => {
            return {
              attachmentRemoteUrl,
              attachment,
            };
          }),
        };
        dispute?.returnedShipment?.status === ReturnedShipmentStatusEnum.Rejected
          ? await updateReturnedShipment({
              ...submitValues,
              returnedShipmentId: dispute.returnedShipment.id,
            })
          : await createReturnedShipment({ ...submitValues, disputeId });
      },
      title: isRejectedReturnedShipment
        ? 'Редактирование данных о доставке товара продавцу'
        : 'Данные о доставке товара продавцу',
      description: 'Вы уверены, что ввели верные данные о доставке товара?',
    });
  };

  return (
    <CreateReturnedShipmentForm
      onSubmit={onSubmit}
      dispute={dispute}
      isRejectedReturnedShipment={isRejectedReturnedShipment}
    />
  );
};

export default CreateReturnedShipment;
