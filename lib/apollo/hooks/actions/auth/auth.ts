import useNotifier from 'hooks/useNotifier';
import useRouter from 'hooks/useRouter';

import { useRequestPasswordRecoveryMutation } from 'graphql/mutations/__generated__/requestPasswordRecovery.generated';
import { useSignInMutation } from 'graphql/mutations/__generated__/signIn.generated';
import { useSignOutMutation } from 'graphql/mutations/__generated__/signOut.generated';
import { useSignUpMutation } from 'graphql/mutations/__generated__/signUp.generated';
import { useUpdatePasswordMutation } from 'graphql/mutations/__generated__/updatePassword.generated';
import CurrentUser from 'graphql/queries/currentUser.graphql';

import globalEvents from 'config/globalEvents.json';
import { HOME, SIGNIN } from 'config/routes';
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
    onError: error => {
      setError(error);
    },
  });

  const mutate = async ({ email, password }: SignInInput) => {
    const signInInput = {
      email,
      password,
    };

    await mutation({ variables: { input: signInInput } });
  };
  return [mutate, mutationState] as const;
};

export const useSignUp = () => {
  const { setError } = useNotifier();
  const { pushRoute } = useRouter();

  const [mutation, mutationState] = useSignUpMutation({
    onCompleted: () => {
      window.localStorage.setItem(SIGN_IN_EVENT, Date.now().toString());
      pushRoute(HOME);
    },
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
    onError: error => {
      setError(error);
    },
  });

  const mutate = async ({ avatar, email, password, firstName, lastName }: SignUpInput) => {
    const signUpInput = {
      avatar,
      email,
      password,
      firstName,
      lastName,
    };

    await mutation({ variables: { input: signUpInput } });
  };

  return [mutate, mutationState] as const;
};

export const useSignOut = () => {
  const { setError } = useNotifier();
  const { reload } = useRouter();
  const [mutation, mutationState] = useSignOutMutation({
    onCompleted: () => {
      window.localStorage.setItem(SIGN_OUT_EVENT, Date.now().toString());
      reload();
    },
    onError: error => {
      setError(error);
    },
  });

  const mutate = async ({ everywhere = false }: SignOutInput = {}) => {
    const signOutInput = { everywhere };

    await mutation({ variables: { input: signOutInput } });
  };

  return [mutate, mutationState] as const;
};

export const usePasswordRecovery = () => {
  const { setError } = useNotifier();

  const [mutation, mutationState] = useRequestPasswordRecoveryMutation({
    onError: error => {
      setError(error);
    },
  });

  const mutate = async ({ email }: RequestPasswordRecoveryInput) => {
    const requestPasswordRecoveryInput = { email };

    await mutation({ variables: { input: requestPasswordRecoveryInput } });
  };

  const error = mutationState?.error;
  const detail = mutationState?.data?.requestPasswordRecovery?.detail || '';

  return [mutate, detail, error] as const;
};

export const useUpdatePassword = () => {
  const { setError, setSuccess } = useNotifier();
  const { pushRoute } = useRouter();

  const [mutation, mutationState] = useUpdatePasswordMutation({
    onCompleted: () => {
      setSuccess('Password updated successfully');
      setTimeout(() => pushRoute(SIGNIN), 1000);
    },
    onError: error => {
      setError(error);
    },
  });

  const mutate = async ({ password, resetToken }: UpdatePasswordInput) => {
    const updatePasswordInput = { password, resetToken };

    await mutation({ variables: { input: updatePasswordInput } });
  };

  return [mutate, mutationState] as const;
};
