import React from 'react';
import { useModal } from '@ebay/nice-modal-react';
import useRouter from 'hooks/useRouter';
import useHistory from 'hooks/useHistory';

import { ADMIN_DISPUTE } from 'config/routes';

import { useCreateDisputeProposal } from 'lib/apollo/hooks/actions/dispute';

import SimpleModal from 'components/shared/molecules/Modal/SimpleModal';
import CreateDisputeProposalForm from 'components/shared/organisms/CreateDisputeProposalForm';
import { TProposalFormValues } from 'components/shared/organisms/CreateDisputeProposalForm/types';

import { FormikHelpers } from 'formik';
import { CreateDisputeProposalWrapper, Title } from './styled';
import CurrentProposal from './CurrentProposal';
import { TCreateAdminDisputeProposal } from './types';

const CreateAdminDisputeProposal: React.FunctionComponent<TCreateAdminDisputeProposal> = ({
  order,
  dispute,
}) => {
  const { pushRoute } = useRouter();
  const { history, setHistory } = useHistory();

  const { id: orderId } = order;
  const { id: disputeId } = dispute;

  const goBackToDispute = () => {
    setHistory(history.slice(0, -1));
    pushRoute({
      pathname: ADMIN_DISPUTE,
      query: { orderId },
    });
  };

  const [createDisputeProposal] = useCreateDisputeProposal({
    disputeId,
    onSubmit: goBackToDispute,
  });
  const createDisputeProposalModal = useModal(SimpleModal);

  const onSubmit = async (
    values: TProposalFormValues,
    { setSubmitting }: FormikHelpers<TProposalFormValues>,
  ) => {
    setSubmitting(false);
    await createDisputeProposalModal.show({
      onSubmit: async () => {
        await createDisputeProposal(values);
      },
      title: 'Решение от Medagregator',
      description: (
        <>
          Нажимая “Подтвердить”, вы отправите наш вариант решения спора по заказу
          <b> №{orderId} </b>
        </>
      ),
    });
  };

  return (
    <CreateDisputeProposalWrapper data-testid="create-dispute-proposal-form">
      <Title>Решение по спору от Medagregator</Title>

      <CurrentProposal dispute={dispute} />

      <CreateDisputeProposalForm
        onSubmit={onSubmit}
        onCloseDispute={goBackToDispute}
        order={order}
        variant="admin"
        dispute={dispute}
      />
    </CreateDisputeProposalWrapper>
  );
};

export default CreateAdminDisputeProposal;
