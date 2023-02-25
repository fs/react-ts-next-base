import { usePresignDataMutation } from 'graphql/mutations/__generated__/presignData.generated';
import { PresignDataInput, PresignMethodEnum } from 'graphql/types';

export const usePresignFile = () => {
  const [mutation, mutationState] = usePresignDataMutation();

  const mutate = async ({ type, filename, size }: PresignDataInput) => {
    if (!type || !filename)
      return { fields: [], url: '', headers: [], presignMethod: PresignMethodEnum.Post };

    const presignDataInput = { type, filename, size };

    const fileData = await mutation({ variables: { input: presignDataInput } });

    return fileData?.data?.presignData || null;
  };

  return [mutate, mutationState] as const;
};
