import useNotifier from 'hooks/useNotifier';
import { PublicSupportRequestInput, SupportRequestInput } from 'graphql/types';
import { useCreatePublicSupportRequestMutation } from 'graphql/mutations/__generated__/createPublicSupportRequest.generated';
import { useCreateSupportRequestMutation } from 'graphql/mutations/__generated__/createSupportRequest.generated';
import { TSupportRequest } from './types';

export const useCreatePublicSupportRequest = ({ onSubmit }: TSupportRequest) => {
  const { setError, setSuccess } = useNotifier();
  const [mutation, mutationState] = useCreatePublicSupportRequestMutation({
    onCompleted: () => {
      onSubmit();
      setSuccess('Сообщение в службу поддержки успешно отправлено');
    },
  });

  const mutate = async ({ email, subject, message, images }: PublicSupportRequestInput) => {
    const publicSupportRequestInput = {
      email,
      subject,
      message,
      images,
    };

    try {
      await mutation({ variables: { input: publicSupportRequestInput } });
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState] as const;
};

export const useCreateSupportRequest = ({ onSubmit }: TSupportRequest) => {
  const { setError, setSuccess } = useNotifier();
  const [mutation, mutationState] = useCreateSupportRequestMutation({
    onCompleted: () => {
      onSubmit();
      setSuccess('Сообщение в службу поддержки успешно отправлено');
    },
  });

  const mutate = async ({ subject, message, images, orderId }: SupportRequestInput) => {
    const supportRequestInput = {
      subject,
      message,
      images,
      orderId,
    };

    try {
      await mutation({ variables: { input: supportRequestInput } });
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState] as const;
};
