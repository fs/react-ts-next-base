import useNotifier from 'hooks/useNotifier';
import { AcceptTransferInput } from 'graphql/types';
import { useAcceptTransferMutation } from 'graphql/mutations/__generated__/acceptTransfer.generated';

type TAcceptTransfer = {
  transferId: AcceptTransferInput['transferId'];
};

export const useAcceptTransfer = ({ transferId }: TAcceptTransfer) => {
  const { setError, setSuccess } = useNotifier();

  const [mutation, mutationState] = useAcceptTransferMutation({
    onCompleted: () => {
      setSuccess(`Вывод средств для перевода №${transferId} подтвержден`);
    },
  });

  const mutate = async () => {
    const confirmTransferInput = {
      transferId,
    };

    try {
      await mutation({ variables: { input: confirmTransferInput } });
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState];
};
