import React from 'react';
import { useModal } from '@ebay/nice-modal-react';
import useRouter from 'hooks/useRouter';

import { DASHBOARD_COMPANY_ORDERS, DASHBOARD_COMPANY_ORDER } from 'config/routes';

import { useOpenDispute } from 'lib/apollo/hooks/actions/dispute';

import SimpleModal from 'components/shared/molecules/Modal/SimpleModal';

import { FormikHelpers } from 'formik';
import OpenDisputeForm from './OpenDisputeForm';

import { getInitialValues, validationSchema } from './fields';
import { CreateDisputeWrapper, Title } from './styled';
import { TFormValues, TOpenDispute } from './types';

const OpenDispute = ({ companyId, order }: TOpenDispute) => {
  const { pushRoute } = useRouter();
  const { id: orderId } = order;

  const onOpenDispute = () => {
    pushRoute({
      pathname: DASHBOARD_COMPANY_ORDERS,
      query: {
        disputes: true,
        companyId,
      },
    });
  };

  const [openDispute] = useOpenDispute({ orderId, onSubmit: onOpenDispute });
  const closeDisputeModal = useModal(SimpleModal);
  const openDisputeModal = useModal(SimpleModal);

  const showCloseDispute = () => {
    closeDisputeModal.show({
      onSubmit: async () => {
        pushRoute({ pathname: DASHBOARD_COMPANY_ORDER, query: { companyId, orderId } });
      },
      title: 'Отмена спора',
      description: (
        <>
          Вы уверены, что хотите отменить спор по заказу <strong>№{orderId}</strong>?
        </>
      ),
      acceptText: 'Отменить спор',
      cancelText: 'Вернуться к спору',
    });
  };

  const onSubmit = async (values: TFormValues, { setSubmitting }: FormikHelpers<TFormValues>) => {
    setSubmitting(false);
    await openDisputeModal.show({
      onSubmit: async () => {
        if (!values.dispute.reason) return;
        await openDispute({
          ...values,
          dispute: { ...values.dispute, reason: values.dispute.reason },
        });
      },
      title: 'Открыть спор',
      description: (
        <>
          Заказ <strong>№{orderId}</strong> будет переведен в статус
          <br /> “Открыт спор” до момента завершения спора.
        </>
      ),
      acceptText: 'Открыть спор',
    });
  };

  const form = {
    validationSchema,
    initialValues: getInitialValues(order),
    onSubmit,
  };

  return (
    <CreateDisputeWrapper>
      <Title>Чтобы начать процесс спора, пожалуйста, расскажите нам о вашей проблеме:</Title>
      <OpenDisputeForm form={form} order={order} showCloseDispute={showCloseDispute} />
    </CreateDisputeWrapper>
  );
};

export default OpenDispute;
