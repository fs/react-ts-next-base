import { useOpenDisputeMutation } from 'graphql/mutations/__generated__/openDispute.generated';
import { useCreateDisputeProposalMutation } from 'graphql/mutations/__generated__/createDisputeProposal.generated';
import { useCancelDisputeMutation } from 'graphql/mutations/__generated__/cancelDispute.generated';
import { useRequestDisputeSupportMutation } from 'graphql/mutations/__generated__/requestDisputeSupport.generated';

import { useResolveDisputeMutation } from 'graphql/mutations/__generated__/resolveDispute.generated';

import {
  Order,
  Dispute,
  OpenDisputeInput,
  NewDisputeProposalInput,
  ResolveDisputeInput,
  RequestDisputeSupportInput,
} from 'graphql/types';

import useNotifier from 'hooks/useNotifier';

type TOpenDispute = {
  orderId: Order['id'];
  onSubmit?: () => void;
};

type TCreateDisputeProposal = {
  disputeId: Dispute['id'];
  onSubmit?: () => void;
};

type TCancelDispute = {
  disputeId: Dispute['id'];
  orderId: Order['id'];
  onSubmit?: () => void;
};

export const useOpenDispute = ({ orderId, onSubmit = () => {} }: TOpenDispute) => {
  const { setSuccess, setError } = useNotifier();

  const [mutation, mutationState] = useOpenDisputeMutation({
    onCompleted: () => {
      setSuccess(`Спор по заказу №${orderId} открыт`);
      onSubmit();
    },
  });

  const mutate = async ({ dispute, proposal }: Omit<OpenDisputeInput, 'orderId'>) => {
    const openDisputeInput = {
      orderId,
      dispute,
      proposal,
    };

    try {
      await mutation({ variables: { input: openDisputeInput } });
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState] as const;
};

export const useCreateDisputeProposal = ({
  disputeId,
  onSubmit = () => {},
}: TCreateDisputeProposal) => {
  const { setSuccess, setError } = useNotifier();

  const [mutation, mutationState] = useCreateDisputeProposalMutation({
    onCompleted: () => {
      setSuccess('Решение по спору предложено');
      onSubmit();
    },
  });

  const mutate = async ({ proposal }: Omit<NewDisputeProposalInput, 'disputeId'>) => {
    const createDisputeProposalInput = {
      disputeId,
      proposal,
    };

    try {
      await mutation({ variables: { input: createDisputeProposalInput } });
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState] as const;
};

export const useCancelDispute = ({ disputeId, orderId, onSubmit = () => {} }: TCancelDispute) => {
  const { setSuccess, setError } = useNotifier();

  const [mutation, mutationState] = useCancelDisputeMutation({
    onCompleted: () => {
      setSuccess(`Спор по заказу №${orderId} отменен`);
      onSubmit();
    },
  });

  const mutate = async () => {
    const cancelDisputeInput = {
      disputeId,
    };

    try {
      await mutation({ variables: { input: cancelDisputeInput } });
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState] as const;
};

export const useResolveDispute = ({ onSubmit = () => {} }) => {
  const { setSuccess, setError } = useNotifier();

  const [mutation, mutationState] = useResolveDisputeMutation({
    onCompleted: () => {
      setSuccess('Решение по спору принято');
      onSubmit();
    },
  });

  const mutate = async ({ proposalId }: ResolveDisputeInput) => {
    const resolveDisputeInput = {
      proposalId,
    };

    try {
      await mutation({ variables: { input: resolveDisputeInput } });
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState] as const;
};

export const useRequestDisputeSupport = ({ onSubmit = () => {} }) => {
  const { setSuccess, setError } = useNotifier();

  const [mutation, mutationState] = useRequestDisputeSupportMutation({
    onCompleted: () => {
      setSuccess('Вы попросили помощи у Medagregator');
      onSubmit();
    },
  });

  const mutate = async ({ disputeId }: RequestDisputeSupportInput) => {
    const requestDisputeSupportInput = {
      disputeId,
    };

    try {
      await mutation({ variables: { input: requestDisputeSupportInput } });
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState] as const;
};
