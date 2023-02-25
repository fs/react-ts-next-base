import React from 'react';
import { useModal } from '@ebay/nice-modal-react';
import useRouter from 'hooks/useRouter';

import { DASHBOARD_COMPANY_ORDERS, DASHBOARD_COMPANY_ORDER } from 'config/routes';

import { useCreateDisputeProposal } from 'lib/apollo/hooks/actions/dispute';

import SimpleModal from 'components/shared/molecules/Modal/SimpleModal';
import CreateDisputeProposalForm from 'components/shared/organisms/CreateDisputeProposalForm';

import CurrentProposal from './CurrentProposal';

import { CreateDisputeProposalWrapper, Title } from './styled';

const CreateDisputeProposal = ({ query, order, isSeller }) => {
  const { pushRoute } = useRouter();
  const { companyId } = query;
  const { id: orderId, dispute } = order;
  const { id: disputeId } = dispute;

  const onCreateDisputeProposal = () => {
    pushRoute({
      pathname: DASHBOARD_COMPANY_ORDERS,
      query: {
        disputes: true,
        companyId,
      },
    });
  };

  const [createDisputeProposal] = useCreateDisputeProposal({
    disputeId,
    onSubmit: onCreateDisputeProposal,
  });
  const closeDisputeModal = useModal(SimpleModal);
  const createDisputeProposalModal = useModal(SimpleModal);

  const showCloseDispute = () => {
    closeDisputeModal.show({
      onSubmit: async () => {
        pushRoute({ pathname: DASHBOARD_COMPANY_ORDER, query: { companyId, orderId } });
      },
      title: 'Отмена решения по спору',
      description: 'Вы уверены, что хотите отменить решение по спору?',
      acceptText: 'Отменить спор',
      cancelText: 'Вернуться к спору',
    });
  };

  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitting(false);
    await createDisputeProposalModal.show({
      onSubmit: async () => {
        await createDisputeProposal(values);
      },
      title: 'Предложить решение',
      description: 'Вы уверены, что хотите отклонить решение покупателя по спору?',
    });
  };

  return (
    <CreateDisputeProposalWrapper>
      <Title>Измените решение по спору</Title>

      <CurrentProposal dispute={dispute} order={order} companyId={companyId} isSeller={isSeller} />

      <CreateDisputeProposalForm
        onSubmit={onSubmit}
        onCloseDispute={showCloseDispute}
        order={order}
        variant={isSeller ? 'seller' : 'buyer'}
        dispute={order.dispute}
      />
    </CreateDisputeProposalWrapper>
  );
};

export default CreateDisputeProposal;
