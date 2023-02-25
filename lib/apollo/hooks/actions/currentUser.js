import useRouter from 'hooks/useRouter';
import { useMutation } from '@apollo/client';

import UpdateUser from 'graphql/mutations/updateUser.graphql';
import CurrentUser from 'graphql/queries/currentUser.graphql';
import UpdateUserAvatar from 'graphql/mutations/updateUserAvatar.graphql';
import UpdateUserEmail from 'graphql/mutations/updateUserEmail.graphql';
import UpdateUserPhone from 'graphql/mutations/updateUserPhone.graphql';
import DestroyAccount from 'graphql/mutations/destroyAccount.graphql';
import UpdateUserPassword from 'graphql/mutations/updateUserPassword.graphql';
import UpdateUserMenuItems from 'graphql/mutations/updateUserMenuItems.graphql';

import { HOME } from 'config/routes';
import { phoneFormatter } from 'helpers';
import globalEvents from 'config/globalEvents.json';

import useNotifier from 'hooks/useNotifier';

const { SIGN_OUT_EVENT } = globalEvents;

export const useUpdateUser = () => {
  const { setSuccess, setError } = useNotifier();
  const [mutation, mutationState] = useMutation(UpdateUser, {
    update: (store, { data }) => {
      store.writeQuery({
        query: CurrentUser,
        data: {
          me: {
            ...data.updateUser,
          },
        },
      });
    },
    onCompleted: () => setSuccess('Аккаунт успешно обновлен'),
  });

  const mutate = async ({
    email,
    firstName,
    lastName,
    middleName,
    password,
    currentPassword,
    avatar,
  }) => {
    const updateUserInput = {
      email,
      firstName,
      lastName,
      middleName,
      password,
      currentPassword,
      avatar,
    };
    try {
      await mutation({ variables: { input: updateUserInput } });
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState];
};

export const useUpdateUserAvatar = () => {
  const { setSuccess, setError } = useNotifier();

  const [mutation, mutationState] = useMutation(UpdateUserAvatar, {
    update: (store, { data }) => {
      store.writeQuery({
        query: CurrentUser,
        data: {
          me: {
            ...data.updateUserAvatar,
          },
        },
      });
    },
    onCompleted: () => setSuccess('Аватар успешно обновлен'),
  });

  const mutate = async ({ id, metadata: { filename, mimeType, size } }) => {
    const updateUseAvatarInput = {
      avatar: {
        id,
        metadata: {
          filename,
          mimeType,
          size,
        },
      },
    };

    try {
      await mutation({ variables: { input: updateUseAvatarInput } });
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState];
};

export const useDestroyUserAccount = () => {
  const { setSuccess, setError } = useNotifier();
  const { pushRoute } = useRouter();

  const onCompleted = () => {
    setSuccess('Аккаунт успешно удален');
    window.localStorage.setItem(SIGN_OUT_EVENT, Date.now());
    setTimeout(() => pushRoute(HOME), 1000);
  };

  const [mutation, mutationState] = useMutation(DestroyAccount, {
    onCompleted,
    update: store => {
      store.writeQuery({
        query: CurrentUser,
        data: {
          me: null,
        },
      });
    },
  });

  const mutate = async () => {
    try {
      await mutation();
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState];
};

export const useUpdateUserPassword = () => {
  const { setError, setSuccess } = useNotifier();

  const onCompleted = () => {
    setSuccess('Пароль успешно изменен');
  };

  const [mutation, mutationState] = useMutation(UpdateUserPassword, {
    onCompleted,
  });

  const mutate = async ({ password, currentPassword }) => {
    const updateUserPasswordInput = { password, currentPassword };

    try {
      const {
        data: { updateUserPassword },
      } = await mutation({ variables: { input: updateUserPasswordInput } });
      return updateUserPassword;
    } catch (error) {
      setError(error);
      return null;
    }
  };

  return [mutate, mutationState];
};

export const useUpdateUserEmail = () => {
  const { setError, setSuccess } = useNotifier();

  const onCompleted = ({ updateUserEmail: { email } }) => {
    setSuccess(`Почта успешно изменена на "${email}"`);
  };

  const [mutation, mutationState] = useMutation(UpdateUserEmail, {
    onCompleted,
  });

  const mutate = async ({
    currentPassword,
    email,
    emailNotificationsDisabled,
    emailMailingEnabled,
  }) => {
    const updateUserEmailInput = {
      currentPassword,
      email,
      emailNotificationsDisabled,
      emailMailingEnabled,
    };

    try {
      const {
        data: { updateUserEmail },
      } = await mutation({ variables: { input: updateUserEmailInput } });
      return updateUserEmail;
    } catch (error) {
      setError(error);
      return null;
    }
  };

  return [mutate, mutationState];
};

export const useUpdateUserPhone = () => {
  const { setError, setSuccess } = useNotifier();

  const onCompleted = ({ updateUserPhone: { phoneNumber } }) => {
    setSuccess(`Номер телефона успешно изменен на "${phoneFormatter(phoneNumber)}"`);
  };

  const [mutation, mutationState] = useMutation(UpdateUserPhone, {
    onCompleted,
  });

  const mutate = async ({
    currentPassword,
    phoneNumber,
    smsCode,
    phoneNotificationsDisabled,
    phoneMailingEnabled,
  }) => {
    const updateUserPhoneInput = {
      currentPassword,
      phoneNumber,
      smsCode,
      phoneNotificationsDisabled,
      phoneMailingEnabled,
    };

    try {
      const {
        data: { updateUserPhone },
      } = await mutation({ variables: { input: updateUserPhoneInput } });
      return updateUserPhone;
    } catch (error) {
      setError(error);
      return null;
    }
  };

  return [mutate, mutationState];
};

export const useUpdateUserMenuItems = () => {
  const { setError, setSuccess } = useNotifier();

  const onCompleted = () => {
    setSuccess(`Меню успешно отредактированно`);
  };

  const [mutation, mutationState] = useMutation(UpdateUserMenuItems, {
    onCompleted,
    update: (store, { data }) => {
      store.writeQuery({
        query: CurrentUser,
        data: {
          me: {
            ...data.updateUserMenuItems,
          },
        },
      });
    },
  });

  const mutate = async menuItems => {
    try {
      const {
        data: { updateUserMenuItems },
      } = await mutation({ variables: { input: { menuItems } } });

      return updateUserMenuItems;
    } catch (error) {
      setError(error);
      return null;
    }
  };

  return [mutate, mutationState];
};
