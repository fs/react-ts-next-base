import { useMutation } from '@apollo/client';

import DestroyAdmin from 'graphql/mutations/destroyAdmin.graphql';
import CreateAdmin from 'graphql/mutations/createAdmin.graphql';
import UpdateAdminAccount from 'graphql/mutations/updateAdminAccount.graphql';

import Admins from 'graphql/queries/admins.graphql';

import useNotifier from 'hooks/useNotifier';

export const useDestroyAdmin = ({ userId, email }) => {
  const { setError, setSuccess } = useNotifier();

  const [mutation, mutationState] = useMutation(DestroyAdmin, {
    onCompleted: () => {
      setSuccess(`Админ ${email} был успешно удален`);
    },
    refetchQueries: [{ query: Admins }],
  });

  const mutate = async () => {
    const destroyAdminInput = {
      userId,
    };

    try {
      await mutation({ variables: { input: destroyAdminInput } });
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState];
};

export const useCreateAdmin = ({ onSubmit = () => {} }) => {
  const { setError, setSuccess } = useNotifier();

  const [mutation, mutationState] = useMutation(CreateAdmin, {
    onCompleted: () => {
      setSuccess(`Админ был успешно добавлен`);
      onSubmit();
    },
  });

  const mutate = async ({ firstName, lastName, middleName, email, phoneNumber }) => {
    const createAdminInput = {
      firstName,
      lastName,
      middleName,
      email,
      phoneNumber,
    };

    try {
      await mutation({ variables: { input: createAdminInput } });
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState];
};

export const useUpdateAdminAccount = () => {
  const { setError, setSuccess } = useNotifier();

  const [mutation, mutationState] = useMutation(UpdateAdminAccount, {
    onCompleted: () => {
      setSuccess('Аккаунт успешно обновлен');
    },
  });

  const mutate = async ({ email, phoneNumber, currentPassword }) => {
    const updateAdminAccountInput = {
      email,
      phoneNumber,
      currentPassword,
    };

    try {
      await mutation({ variables: { input: updateAdminAccountInput } });
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState];
};
