import { useAuthenticateGuestUserMutation } from 'graphql/mutations/__generated__/authenticateGuestUser.generated';
import useNotifier from 'hooks/useNotifier';

import globalEvents from 'config/globalEvents.json';
import CurrentUser from 'graphql/queries/currentUser.graphql';

const { SIGN_IN_EVENT } = globalEvents;

export const useAuthenticateGuestUser = () => {
  const { setError } = useNotifier();

  const [mutation, mutationState] = useAuthenticateGuestUserMutation({
    update: (store, { data }) => {
      store.writeQuery({
        query: CurrentUser,
        data: {
          me: {
            ...data?.authenticateGuestUser?.me,
          },
        },
      });
    },
    onCompleted: () => {
      window.localStorage.setItem(SIGN_IN_EVENT, Date.now().toString());
    },
  });

  const mutate = async () => {
    try {
      await mutation();
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState] as const;
};
