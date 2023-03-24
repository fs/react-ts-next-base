import { UpdateUserInput } from 'graphql/types';
import { useUpdateUserMutation } from 'graphql/mutations/__generated__/updateUser.generated';

export const useUpdateUser = ({ onSubmit = () => {} }) => {
  const [mutation, mutationResult] = useUpdateUserMutation({
    onCompleted: () => {
      onSubmit();
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
