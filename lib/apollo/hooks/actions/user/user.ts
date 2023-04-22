import { UpdateUserInput } from 'graphql/types';
import { useUpdateUserMutation } from 'graphql/mutations/__generated__/updateUser.generated';

import useNotifier from 'hooks/useNotifier';

export const useUpdateUser = ({ onSubmit = () => {} }) => {
  const { setError } = useNotifier();

  const [mutation, mutationResult] = useUpdateUserMutation({
    onCompleted: () => {
      onSubmit();
    },
    onError: error => {
      setError(error);
    },
  });

  const mutate = async ({
    avatar,
    email,
    firstName,
    lastName,
    password,
    currentPassword,
  }: UpdateUserInput) => {
    const updateUserInput = {
      avatar,
      email,
      firstName,
      lastName,
      password,
      currentPassword,
    };

    await mutation({ variables: { input: updateUserInput } });
  };

  return [mutate, mutationResult] as const;
};

export default useUpdateUser;
