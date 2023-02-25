import { useCreateReturnedShipmentMutation } from 'graphql/mutations/__generated__/createReturnedShipment.generated';
import { useRejectReturnedShipmentMutation } from 'graphql/mutations/__generated__/rejectReturnedShipment.generated';
import { useConfirmReturnedShipmentMutation } from 'graphql/mutations/__generated__/confirmReturnedShipment.generated';
import { useUpdateReturnedShipmentMutation } from 'graphql/mutations/__generated__/updateReturnedShipment.generated';
import { useReceiveReturnedShipmentMutation } from 'graphql/mutations/__generated__/receiveReturnedShipment.generated';

import {
  CreateReturnedShipmentInput,
  RejectReturnedShipmentInput,
  ConfirmReturnedShipmentInput,
  UpdateReturnedShipmentInput,
  ReceiveReturnedShipmentInput,
} from 'graphql/types';

import useNotifier from 'hooks/useNotifier';

export const useCreateReturnedShipment = ({ onSubmit = () => {} }) => {
  const { setSuccess, setError } = useNotifier();

  const [mutation, mutationState] = useCreateReturnedShipmentMutation({
    onCompleted: () => {
      setSuccess('Уведомление об отправке товара отправлено на проверку');
      onSubmit();
    },
  });

  const mutate = async ({
    attachments,
    disputeId,
    startDate,
    endDate,
  }: CreateReturnedShipmentInput) => {
    const createReturnedShipmentInput = {
      attachments,
      disputeId,
      startDate,
      endDate,
    };

    try {
      await mutation({ variables: { input: createReturnedShipmentInput } });
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState] as const;
};

export const useRejectReturnedShipment = ({ onSubmit = () => {} }) => {
  const { setSuccess, setError } = useNotifier();

  const [mutation, mutationState] = useRejectReturnedShipmentMutation({
    onCompleted: () => {
      setSuccess('Возврат товара отклонен');
      onSubmit();
    },
  });

  const mutate = async ({ returnedShipmentId, rejectComment }: RejectReturnedShipmentInput) => {
    const rejectReturnedShipmentInput = {
      returnedShipmentId,
      rejectComment,
    };

    try {
      await mutation({ variables: { input: rejectReturnedShipmentInput } });
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState] as const;
};

export const useConfirmReturnedShipment = ({ onSubmit = () => {} }) => {
  const { setSuccess, setError } = useNotifier();

  const [mutation, mutationState] = useConfirmReturnedShipmentMutation({
    onCompleted: () => {
      setSuccess('Возврат товара подтвержден');
      onSubmit();
    },
  });

  const mutate = async ({ returnedShipmentId }: ConfirmReturnedShipmentInput) => {
    const confirmReturnedShipmentInput = {
      returnedShipmentId,
    };

    try {
      await mutation({ variables: { input: confirmReturnedShipmentInput } });
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState] as const;
};

export const useUpdateReturnedShipment = ({ onSubmit = () => {} }) => {
  const { setSuccess, setError } = useNotifier();

  const [mutation, mutationState] = useUpdateReturnedShipmentMutation({
    onCompleted: () => {
      setSuccess('Уведомление об отправке товара отправлено на проверку');
      onSubmit();
    },
  });

  const mutate = async ({
    attachments,
    returnedShipmentId,
    startDate,
    endDate,
  }: UpdateReturnedShipmentInput) => {
    const updateReturnedShipmentInput = {
      attachments,
      returnedShipmentId,
      startDate,
      endDate,
    };

    try {
      await mutation({ variables: { input: updateReturnedShipmentInput } });
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState] as const;
};

export const useReceiveReturnedShipment = ({ onSubmit = () => {} }) => {
  const { setSuccess, setError } = useNotifier();

  const [mutation, mutationState] = useReceiveReturnedShipmentMutation({
    onCompleted: () => {
      setSuccess('Получение товара подтвержденно');
      onSubmit();
    },
  });

  const mutate = async ({ disputeId }: ReceiveReturnedShipmentInput) => {
    const receiveReturnedShipmentInput = {
      disputeId,
    };

    try {
      await mutation({ variables: { input: receiveReturnedShipmentInput } });
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState] as const;
};
