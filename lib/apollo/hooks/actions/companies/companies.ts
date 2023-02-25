import { getOperationName } from '@apollo/client/utilities';

import CurrentUser from 'graphql/queries/currentUser.graphql';
import MyEmployees from 'graphql/queries/myEmployees.graphql';
import Account from 'graphql/queries/account.graphql';
import AccountOperations from 'graphql/queries/accountOperations.graphql';

import useNotifier from 'hooks/useNotifier';
import ErrorDecorator from 'decorators/ErrorDecorator';
import { useCreateCompanyMutation } from 'graphql/mutations/__generated__/createCompany.generated';
import {
  AddCompanyToBlacklistInput,
  BanCompanyInput,
  CompanyInput,
  ConfirmCompanyInput,
  CreateWithdrawalInput,
  MarkCompanyAsMainInput,
  RejectCompanyInput,
  RemoveCompanyFromBlacklistInput,
  UnbanCompanyInput,
  UpdateCompanyInput,
  UpdateCompanyLogoInput,
  UpdateRejectedCompanyInput,
} from 'graphql/types';

import { useUpdateCompanyLogoMutation } from 'graphql/mutations/__generated__/updateCompanyLogo.generated';
import { useBanCompanyMutation } from 'graphql/mutations/__generated__/banCompany.generated';
import { useUnbanCompanyMutation } from 'graphql/mutations/__generated__/unbanCompany.generated';
import { useRejectCompanyMutation } from 'graphql/mutations/__generated__/rejectCompany.generated';
import { useConfirmCompanyMutation } from 'graphql/mutations/__generated__/confirmCompany.generated';
import { useDestroyCompanyMutation } from 'graphql/mutations/__generated__/destroyCompany.generated';
import { useUpdateCompanyMutation } from 'graphql/mutations/__generated__/updateCompanyData.generated';
import { useCreateWithdrawalMutation } from 'graphql/mutations/__generated__/createWithdrawal.generated';
import { useMarkCompanyAsMainMutation } from 'graphql/mutations/__generated__/markCompanyAsMain.generated';
import { useAddCompanyToBlackListMutation } from 'graphql/mutations/__generated__/addCompanyToBlackList.generated';
import { useUpdateRejectedCompanyMutation } from 'graphql/mutations/__generated__/updateRejectedCompany.generated';
import { useRemoveCompanyFromBlackListMutation } from 'graphql/mutations/__generated__/removeCompanyFromBlackList.generated';

import {
  TAddCompanyToBlackList,
  TBanCompany,
  TCompanyEdge,
  TCreateCompany,
  TCreateWithdrawal,
  TDestroyCompany,
  TRejectCompany,
  TRemoveCompanyFromBlacklistInput,
  TUnbanCompany,
  TUpdateCompanyData,
  TUpdateRejectedCompany,
} from './types';

export const useCreateCompany = ({ onSubmit = () => {} }: TCreateCompany) => {
  const { setSuccess, setError } = useNotifier();

  const [mutation, mutationState] = useCreateCompanyMutation({
    onCompleted: ({ createCompany }) => {
      setSuccess('Компания успешно создана');
      onSubmit(createCompany);
    },
  });

  const mutate = async ({
    taxationSystem,
    bankName,
    bic,
    checkingAccount,
    correspondentAccount,
    companyConfirmationRecords,
    directorFullName,
    email,
    inn,
    kpp,
    legalAddress,
    legalFormId,
    officialName,
    ogrn,
    oktmo,
    phoneNumber,
    postcode,
    unofficialName,
    logo,
    direction,
  }: CompanyInput) => {
    const createCompanyInput = {
      taxationSystem,
      bankName,
      bic,
      checkingAccount,
      correspondentAccount,
      companyConfirmationRecords,
      directorFullName,
      email,
      inn,
      kpp,
      legalAddress,
      legalFormId,
      officialName,
      ogrn,
      oktmo,
      phoneNumber,
      postcode,
      unofficialName,
      direction,
      logo,
    };

    try {
      await mutation({ variables: { input: createCompanyInput } });
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState];
};

export const useDestroyCompany = ({
  companyName,
  companyId,
  onSubmit = () => {},
}: TDestroyCompany) => {
  const { setSuccess, setError } = useNotifier();

  const [mutation, mutationState] = useDestroyCompanyMutation({
    refetchQueries: [{ query: MyEmployees }],
    onCompleted: () => {
      setSuccess(`Компания "${companyName}" успешно удалена.`);
      onSubmit();
    },
    update(cache) {
      cache.modify({
        fields: {
          myCompanies(existing, { readField }) {
            return {
              ...existing,
              edges: existing.edges.filter(
                (edge: TCompanyEdge) => companyId !== readField('id', edge.node),
              ),
            };
          },
        },
      });
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const mutate = async (companyId: string) => {
    const destroyCompanyInput = {
      companyId,
    };

    try {
      await mutation({ variables: { input: destroyCompanyInput } });
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState];
};

export const useUpdateCompanyLogo = () => {
  const { setSuccess, setError } = useNotifier();

  const [mutation, mutationState] = useUpdateCompanyLogoMutation({
    onCompleted: () => {
      setSuccess('Логотип компании успешно изменен');
    },
  });

  const mutate = async ({ logo, companyId }: UpdateCompanyLogoInput) => {
    const updateCompanyLogoInput = {
      companyId,
      logo,
    };

    try {
      await mutation({ variables: { input: updateCompanyLogoInput } });
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState] as const;
};

export const useUpdateCompanyData = ({ companyId }: TUpdateCompanyData) => {
  const { setSuccess, setError } = useNotifier();

  const [mutation, mutationState] = useUpdateCompanyMutation({
    onCompleted: ({ updateCompany }) => {
      setSuccess(
        `Обновленные данные о компании "${updateCompany?.officialName}" отправлены на проверку администраторам`,
      );
    },
  });

  const mutate = async ({
    legalFormId,
    taxationSystem,
    inn,
    officialName,
    unofficialName,
    directorFullName,
    legalAddress,
    postcode,
    kpp,
    ogrn,
    oktmo,
    bankName,
    checkingAccount,
    correspondentAccount,
    bic,
    email,
    phoneNumber,
    logo,
    logoRemoteUrl,
    companyConfirmationRecords,
  }: UpdateCompanyInput) => {
    const updateCompanyInput = {
      companyId,
      legalFormId,
      taxationSystem,
      inn,
      officialName,
      unofficialName,
      directorFullName,
      legalAddress,
      postcode,
      kpp,
      ogrn,
      oktmo,
      bankName,
      checkingAccount,
      correspondentAccount,
      bic,
      email,
      phoneNumber,
      logo,
      logoRemoteUrl,
      companyConfirmationRecords,
    };

    try {
      await mutation({ variables: { input: updateCompanyInput } });
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState];
};

export const useMarkCompanyAsMain = () => {
  const { setSuccess, setError } = useNotifier();

  const [mutation, mutationState] = useMarkCompanyAsMainMutation({
    refetchQueries: [{ query: CurrentUser }, { query: MyEmployees }],
    onCompleted: () => {
      setSuccess('Компания успешно выбрана как основная.');
    },
  });

  const mutate = async ({ companyId }: MarkCompanyAsMainInput) => {
    const markCompanyAsMainInput = {
      companyId,
    };

    try {
      await mutation({ variables: { input: markCompanyAsMainInput } });
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState];
};

export const useCreateWithdrawal = ({ companyId }: TCreateWithdrawal) => {
  const { setSuccess, setError } = useNotifier();
  const [mutation, mutationState] = useCreateWithdrawalMutation({
    refetchQueries: [
      { query: Account, variables: { companyId } },
      getOperationName(AccountOperations) || '',
    ],
    onCompleted: () => {
      setSuccess('Средства вашей компании  успешно вывелись.');
    },
  });

  const mutate = async ({ vat, vatType, smsCode }: CreateWithdrawalInput) => {
    const createWithdrawalInput = {
      companyId,
      vat,
      vatType,
      smsCode,
    };
    try {
      await mutation({ variables: { input: createWithdrawalInput } });
    } catch (error) {
      const errorMessage = new ErrorDecorator(error);
      setError(errorMessage);
    }
  };
  return [mutate, mutationState];
};

export const useConfirmCompany = ({ companyName = '', onConfirm = () => {} }) => {
  const { setSuccess, setError } = useNotifier();
  const [mutation, mutationState] = useConfirmCompanyMutation({
    onCompleted: () => {
      setSuccess(`Компания "${companyName}" успешно подтверждена.`);
      onConfirm();
    },
  });

  const mutate = async ({ companyId }: ConfirmCompanyInput) => {
    const confirmCompanyInput = {
      companyId,
    };
    try {
      await mutation({ variables: { input: confirmCompanyInput } });
    } catch (error) {
      const errorMessage = new ErrorDecorator(error);
      setError(errorMessage);
    }
  };
  return [mutate, mutationState];
};

export const useRejectCompany = ({
  companyId,
  companyName = '',
  onSubmit = () => {},
}: TRejectCompany) => {
  const { setSuccess, setError } = useNotifier();
  const [mutation, mutationState] = useRejectCompanyMutation({
    onCompleted: () => {
      setSuccess(`Запрос на изменение компании "${companyName}" отправлен`);
      onSubmit();
    },
  });

  const mutate = async ({ fields }: RejectCompanyInput) => {
    const rejectCompanyInput = {
      companyId,
      fields,
    };
    try {
      await mutation({ variables: { input: rejectCompanyInput } });
    } catch (error) {
      setError(error);
    }
  };
  return [mutate, mutationState];
};

export const useUpdateRejectedCompany = ({ companyId }: TUpdateRejectedCompany) => {
  const { setSuccess, setError } = useNotifier();
  const [mutation, mutationState] = useUpdateRejectedCompanyMutation({
    onCompleted: ({ updateRejectedCompany }) => {
      setSuccess(
        `Обновленные данные о компании "${updateRejectedCompany?.officialName}" отправлены на повторную проверку администраторам`,
      );
    },
  });

  const mutate = async ({
    legalFormId,
    taxationSystem,
    inn,
    officialName,
    unofficialName,
    directorFullName,
    legalAddress,
    postcode,
    kpp,
    ogrn,
    oktmo,
    bankName,
    checkingAccount,
    correspondentAccount,
    bic,
    email,
    phoneNumber,
    logo,
    logoRemoteUrl,
    companyConfirmationRecords,
  }: UpdateRejectedCompanyInput) => {
    const updateRejectedCompanyInput = {
      companyId,
      legalFormId,
      taxationSystem,
      inn,
      officialName,
      unofficialName,
      directorFullName,
      legalAddress,
      postcode,
      kpp,
      ogrn,
      oktmo,
      bankName,
      checkingAccount,
      correspondentAccount,
      bic,
      email,
      phoneNumber,
      logo,
      logoRemoteUrl,
      companyConfirmationRecords,
    };
    try {
      await mutation({ variables: { input: updateRejectedCompanyInput } });
    } catch (error) {
      setError(error);
    }
  };
  return [mutate, mutationState];
};

export const useAddCompanyToBlackList = ({
  companyName = '',
  onSubmit = () => {},
}: TAddCompanyToBlackList) => {
  const { setSuccess, setError } = useNotifier();
  const [mutation, mutationState] = useAddCompanyToBlackListMutation({
    onCompleted: () => {
      setSuccess(`Компания ${companyName} отправлена в черный список`);
      onSubmit();
    },
  });

  const mutate = async ({ companyId }: AddCompanyToBlacklistInput) => {
    const addCompanyToBlacklistInput = {
      companyId,
    };

    try {
      await mutation({ variables: { input: addCompanyToBlacklistInput } });
    } catch (error) {
      setError(error);
    }
  };
  return [mutate, mutationState];
};

export const useRemoveCompanyFromBlacklist = ({
  companyName = '',
  onSubmit = () => {},
}: TRemoveCompanyFromBlacklistInput) => {
  const { setSuccess, setError } = useNotifier();
  const [mutation, mutationState] = useRemoveCompanyFromBlackListMutation({
    onCompleted: () => {
      setSuccess(`Компания ${companyName} возвращена из черного списка`);
      onSubmit();
    },
  });

  const mutate = async ({ companyId }: RemoveCompanyFromBlacklistInput) => {
    const removeCompanyFromBlacklistInput = {
      companyId,
    };

    try {
      await mutation({ variables: { input: removeCompanyFromBlacklistInput } });
    } catch (error) {
      setError(error);
    }
  };
  return [mutate, mutationState];
};

export const useBanCompany = ({ companyName = '', onSubmit = () => {} }: TBanCompany) => {
  const { setSuccess, setError } = useNotifier();
  const [mutation, mutationState] = useBanCompanyMutation({
    onCompleted: () => {
      setSuccess(`Компания ${companyName} заблокирована`);
      onSubmit();
    },
  });

  const mutate = async ({ companyId, deletionMessage }: BanCompanyInput) => {
    const banCompanyInput = {
      companyId,
      deletionMessage,
    };

    try {
      await mutation({ variables: { input: banCompanyInput } });
    } catch (error) {
      setError(error);
    }
  };
  return [mutate, mutationState];
};

export const useUnbanCompany = ({ onSubmit = () => {} }: TUnbanCompany) => {
  const { setError } = useNotifier();
  const [mutation, mutationState] = useUnbanCompanyMutation({
    onCompleted: () => {
      onSubmit();
    },
  });

  const mutate = async ({ companyId }: UnbanCompanyInput) => {
    const unbanCompanyInput = {
      companyId,
    };

    try {
      await mutation({ variables: { input: unbanCompanyInput } });
    } catch (error) {
      setError(error);
    }
  };
  return [mutate, mutationState];
};
