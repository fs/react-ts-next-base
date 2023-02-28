import useRouter from 'hooks/useRouter';
import globalEvents from 'config/globalEvents.json';
import CurrentUser from 'graphql/queries/currentUser.graphql';
import useNotifier from 'hooks/useNotifier';

import { HOME, SIGNIN } from 'config/routes';

import { useSignInMutation } from 'graphql/mutations/__generated__/signIn.generated';
import { useSignUpMutation } from 'graphql/mutations/__generated__/signUp.generated';
import { useSignOutMutation } from 'graphql/mutations/__generated__/signOut.generated';
import { useUpdatePasswordMutation } from 'graphql/mutations/__generated__/updatePassword.generated';
import { useRequestPasswordRecoveryMutation } from 'graphql/mutations/__generated__/requestPasswordRecovery.generated';

import {
  RequestPasswordRecoveryInput,
  SignInInput,
  SignOutInput,
  SignUpInput,
  UpdatePasswordInput,
} from 'graphql/types';

const { SIGN_IN_EVENT, SIGN_OUT_EVENT } = globalEvents;

export const useSignIn = () => {
  const { setError } = useNotifier();
  const { pushRoute } = useRouter();

  const [mutation, mutationState] = useSignInMutation({
    update: (store, { data }) => {
      store.writeQuery({
        query: CurrentUser,
        data: {
          me: {
            ...data?.signIn?.me,
          },
        },
      });
    },
    onCompleted: () => {
      window.localStorage.setItem(SIGN_IN_EVENT, Date.now().toString());
      pushRoute({
        pathname: HOME,
      });
    },
  });

  const mutate = async ({ login, password }: SignInInput) => {
    const signInInput = {
      login,
      password,
    };

    try {
      await mutation({ variables: { input: signInInput } });
    } catch (error) {
      setError(error);
    }
  };
  return [mutate, mutationState] as const;
};

export const useSignUp = () => {
  const { setError } = useNotifier();
  const { pushRoute } = useRouter();

  const [mutation, mutationState] = useSignUpMutation({
    update: (store, { data }) => {
      store.writeQuery({
        query: CurrentUser,
        data: {
          me: {
            ...data?.signUp?.me,
          },
        },
      });
    },
  });

  const mutate = async ({
    email,
    password,
    firstName,
    lastName,
    middleName,
    phoneNumber,
    smsCode,
  }: SignUpInput) => {
    const signUpInput = {
      email,
      password,
      firstName,
      lastName,
      middleName,
      phoneNumber,
      smsCode,
    };

    try {
      await mutation({ variables: { input: signUpInput } });

      window.localStorage.setItem(SIGN_IN_EVENT, Date.now().toString());

      pushRoute(HOME);
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState] as const;
};

export const useSignOut = () => {
  const { setError } = useNotifier();
  const { pushRoute } = useRouter();

  const [mutation, mutationState] = useSignOutMutation({
    update: store => {
      store.writeQuery({
        query: CurrentUser,
        data: {
          me: null,
        },
      });
    },
  });

  const mutate = async ({ everywhere = false }: SignOutInput = {}) => {
    const signOutInput = { everywhere };

    try {
      await mutation({ variables: { input: signOutInput } });

      window.localStorage.setItem(SIGN_OUT_EVENT, Date.now().toString());

      pushRoute(HOME);
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState] as const;
};

export const usePasswordRecovery = () => {
  const { setError } = useNotifier();

  const [mutation, mutationState] = useRequestPasswordRecoveryMutation();

  const mutate = async ({ email }: RequestPasswordRecoveryInput) => {
    const requestPasswordRecoveryInput = { email };

    try {
      await mutation({ variables: { input: requestPasswordRecoveryInput } });
    } catch (error) {
      setError(error);
    }
  };

  const error = mutationState?.error;
  const detail = mutationState?.data?.requestPasswordRecovery?.detail || '';

  return [mutate, detail, error] as const;
};

export const useUpdatePassword = () => {
  const { setError, setSuccess } = useNotifier();
  const { pushRoute } = useRouter();

  const onCompleted = () => {
    setSuccess('Пароль успешно изменен');
    setTimeout(() => pushRoute(SIGNIN), 1000);
  };

  const [mutation, mutationState] = useUpdatePasswordMutation({
    onCompleted,
  });

  const mutate = async ({ password, resetToken }: UpdatePasswordInput) => {
    const updatePasswordInput = { password, resetToken };

    try {
      await mutation({ variables: { input: updatePasswordInput } });
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState] as const;
};
