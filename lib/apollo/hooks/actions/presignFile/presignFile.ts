import useNotifier from 'hooks/useNotifier';

import { usePresignDataMutation } from 'graphql/mutations/__generated__/presignData.generated';

import { PresignDataInput } from 'graphql/types';

export const usePresignFile = () => {
  const { setError } = useNotifier();

  const [mutation, mutationState] = usePresignDataMutation({
    onError: error => {
      setError(error);
    },
  });

  const mutate = async ({ type, filename }: PresignDataInput) => {
    if (!type || !filename) return { fields: [], url: '' };

    const presignDataInput = { type, filename };

    const fileData = await mutation({ variables: { input: presignDataInput } });

    return fileData?.data?.presignData?.data || null;
  };

  return [mutate, mutationState] as const;
};
