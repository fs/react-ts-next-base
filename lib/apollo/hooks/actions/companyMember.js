import { useMutation } from '@apollo/client';

import CreateCompanyMember from 'graphql/mutations/createCompanyMember.graphql';
import DestroyCompanyMember from 'graphql/mutations/destroyCompanyMember.graphql';
import UpdateCompanyMember from 'graphql/mutations/updateCompanyMember.graphql';

import MyEmployees from 'graphql/queries/myEmployees.graphql';

import useNotifier from 'hooks/useNotifier';

export const useCreateCompanyMember = () => {
  const [mutation, mutationState] = useMutation(CreateCompanyMember, {
    refetchQueries: [{ query: MyEmployees }],
  });

  const mutate = async ({ email, companyIds }) => {
    const companyMemberInput = {
      email,
      companyIds,
    };

    await mutation({ variables: { input: companyMemberInput } });
  };

  return [mutate, mutationState];
};

export const useDestroyCompanyMember = () => {
  const { setError, setSuccess } = useNotifier();

  const [mutation, mutationState] = useMutation(DestroyCompanyMember, {
    refetchQueries: [{ query: MyEmployees }],
    onCompleted: ({ destroyCompanyMember: { email } }) => {
      setSuccess(`Пользователь ${email} удален`);
    },
  });

  const mutate = async ({ userId, companyIds }) => {
    const destroyCompanyMemberInput = {
      userId,
      companyIds,
    };

    try {
      await mutation({ variables: { input: destroyCompanyMemberInput } });
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState];
};

export const useUpdateCompanyMember = ({ email }) => {
  const { setError, setSuccess } = useNotifier();

  const [mutation, mutationState] = useMutation(UpdateCompanyMember, {
    refetchQueries: [{ query: MyEmployees }],
    onCompleted: () => {
      setSuccess(`Список компаний пользователя ${email} обновлен`);
    },
  });

  const mutate = async ({ userId, companyIds }) => {
    const updateCompanyMemberInput = {
      userId,
      companyIds,
    };

    try {
      await mutation({ variables: { input: updateCompanyMemberInput } });
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState];
};
