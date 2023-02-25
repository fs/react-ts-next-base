import { useMutation } from '@apollo/client';

import JoinUser from 'graphql/mutations/joinUser.graphql';

import useNotifier from 'hooks/useNotifier';

export const useJoinUser = () => {
  const [mutation, mutationState] = useMutation(JoinUser);
  const { setError, setSuccess } = useNotifier();

  const mutate = async ({ firstName, lastName, middleName, phoneNumber, smsCode }) => {
    const joinUserInput = {
      firstName,
      lastName,
      middleName,
      phoneNumber,
      smsCode,
    };

    try {
      await mutation({ variables: { input: joinUserInput } });
      setSuccess('Данные пользователя успешно обновлены');
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState];
};
