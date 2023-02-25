import useRouter from 'hooks/useRouter';
import globalEvents from 'config/globalEvents.json';
import CurrentUser from 'graphql/queries/currentUser.graphql';
import useNotifier from 'hooks/useNotifier';

import { HOME, DASHBOARD, AUTH, ADMIN_ACCOUNT } from 'config/routes';

import { isUserAdmin } from 'config/constants/systemRoles';
import { useSignInMutation } from 'graphql/mutations/__generated__/signIn.generated';
import { useSignUpMutation } from 'graphql/mutations/__generated__/signUp.generated';
import { useSignOutMutation } from 'graphql/mutations/__generated__/signOut.generated';
import { useSendSmsCodeMutation } from 'graphql/mutations/__generated__/sendSmsCode.generated';
import { useUpdatePasswordMutation } from 'graphql/mutations/__generated__/updatePassword.generated';
import { useRequestPasswordRecoveryMutation } from 'graphql/mutations/__generated__/requestPasswordRecovery.generated';

import {
  RequestPasswordRecoveryInput,
  SignInInput,
  SignOutInput,
  SignUpInput,
  UpdatePasswordInput,
} from 'graphql/types';
import { useSignUpFromCartMutation } from 'graphql/mutations/__generated__/signUpFromCart.generated';
import { TUseSignUpFromCart } from './types';

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
    onCompleted: ({ signIn }) => {
      window.localStorage.setItem(SIGN_IN_EVENT, Date.now().toString());
      pushRoute({
        pathname: isUserAdmin(signIn?.me?.systemRole) ? ADMIN_ACCOUNT : DASHBOARD,
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

      pushRoute(DASHBOARD);
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
    setTimeout(() => pushRoute(AUTH), 1000);
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

export const useSendSmsCode = () => {
  const { setError } = useNotifier();

  const [mutation, mutationState] = useSendSmsCodeMutation();

  const mutate = (phoneNumber: string) => {
    const sendSmsCodeInput = { phoneNumber };
    try {
      mutation({ variables: { input: sendSmsCodeInput } });
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState] as const;
};

export const useSignUpFromCart = ({ onSubmit }: TUseSignUpFromCart) => {
  const { setError } = useNotifier();
  const { pushRoute } = useRouter();

  const [mutation, mutationState] = useSignUpFromCartMutation({
    update: (store, { data }) => {
      store.writeQuery({
        query: CurrentUser,
        data: {
          me: {
            ...data?.signUpFromCart?.me,
          },
        },
      });
    },
    onCompleted: onSubmit,
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
      const { data } = await mutation({ variables: { input: signUpInput } });
      const message = data?.signUpFromCart?.message;

      window.localStorage.setItem(SIGN_IN_EVENT, Date.now().toString());

      pushRoute(DASHBOARD);
      if (message) setError(message);
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState] as const;
};
