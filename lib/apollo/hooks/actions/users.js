// todo: maybe remove joinUser to this file.

import useNotifier from 'hooks/useNotifier';
import { useMutation } from '@apollo/client';
import BlockUser from 'graphql/mutations/blockUser.graphql';
import UnblockUser from 'graphql/mutations/unblockUser.graphql';

export const useBlockUser = ({ onSubmit = () => {} }) => {
  const { setSuccess, setError } = useNotifier();

  const [mutation, mutationState] = useMutation(BlockUser, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          users(existing, { readField }) {
            return {
              ...existing,
              edges: existing.edges.filter(
                edge => data.blockUser.id !== readField('id', edge.node),
              ),
            };
          },
        },
      });
    },
    onCompleted: data => {
      setSuccess(`Пользователь ${data.blockUser.fullName} заблокирован`);
      onSubmit();
    },
  });

  const mutate = async ({ userId }) => {
    const BlockUserInput = {
      userId,
    };

    try {
      await mutation({ variables: { input: BlockUserInput } });
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState];
};

export const useUnblockUser = ({ onSubmit = () => {} }) => {
  const { setSuccess, setError } = useNotifier();

  const [mutation, mutationState] = useMutation(UnblockUser, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          users(existing, { readField }) {
            return {
              ...existing,
              edges: existing.edges.filter(
                edge => data.unblockUser.id !== readField('id', edge.node),
              ),
            };
          },
        },
      });
    },
    onCompleted: data => {
      setSuccess(`Пользователь ${data.unblockUser.fullName} разблокирован`);
      onSubmit();
    },
  });

  const mutate = async ({ userId }) => {
    const UnblockUserInput = {
      userId,
    };

    try {
      await mutation({ variables: { input: UnblockUserInput } });
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState];
};
