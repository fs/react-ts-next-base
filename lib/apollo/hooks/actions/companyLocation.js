import { useMutation } from '@apollo/client';

import AcceptCompanyLocation from 'graphql/mutations/acceptCompanyLocation.graphql';
import RejectCompanyLocation from 'graphql/mutations/rejectCompanyLocation.graphql';
import UpdateCompanyLocation from 'graphql/mutations/updateCompanyLocation.graphql';
import CreateCompanyLocations from 'graphql/mutations/createCompanyLocations.graphql';
import DestroyCompanyLocation from 'graphql/mutations/destroyCompanyLocation.graphql';
import MarkCompanyLocationAsMain from 'graphql/mutations/markCompanyLocationAsMain.graphql';
import DestroyCustomerCompanyLocation from 'graphql/mutations/destroyCustomerCompanyLocation.graphql';

import CompanyLocations from 'graphql/queries/companyLocations.graphql';

import useNotifier from 'hooks/useNotifier';

export const useCreateCompanyLocations = ({ companyId, onSubmit = () => {} }) => {
  const { setError, setSuccess } = useNotifier();

  const [mutation, mutationState] = useMutation(CreateCompanyLocations, {
    onCompleted: () => {
      setSuccess('Адрес успешно создан');
      onSubmit();
    },
  });

  const mutate = async ({ companyLocations }) => {
    const createCompanyLocationsInput = {
      companyId,
      companyLocations,
    };

    try {
      const {
        data: { createCompanyLocations },
      } = await mutation({ variables: { input: createCompanyLocationsInput } });
      return createCompanyLocations;
    } catch (error) {
      setError(error);
      return null;
    }
  };

  return [mutate, mutationState];
};

export const useUpdateCompanyLocation = companyId => {
  const { setError, setSuccess } = useNotifier();

  const [mutation, mutationState] = useMutation(UpdateCompanyLocation, {
    refetchQueries: [{ query: CompanyLocations, variables: { companyId } }],
    onCompleted: () => setSuccess('Адрес успешно отредактирован'),
  });

  const mutate = async ({
    companyLocationId,
    cityId,
    comment,
    phoneNumber,
    postcode,
    address,
    companyLicenses,
  }) => {
    const updateCompanyLocationInput = {
      companyLocationId,
      cityId,
      address,
      postcode,
      phoneNumber,
      comment,
      companyLicenses,
    };

    try {
      const {
        data: { updateCompanyLocation },
      } = await mutation({ variables: { input: updateCompanyLocationInput } });
      return updateCompanyLocation;
    } catch (error) {
      setError(error);
      return null;
    }
  };

  return [mutate, mutationState];
};

export const useDestroyCompanyLocation = companyId => {
  const { setSuccess } = useNotifier();

  const [mutation, mutationState] = useMutation(DestroyCompanyLocation, {
    onCompleted: () => setSuccess('Адрес успешно удален'),
    refetchQueries: [{ query: CompanyLocations, variables: { companyId } }],
  });

  const mutate = async companyLocationId => {
    const destroyCompanyLocationInput = { companyLocationId };

    await mutation({ variables: { input: destroyCompanyLocationInput } });
  };

  return [mutate, mutationState];
};

export const useMarkCompanyLocationAsMain = companyId => {
  const { setSuccess } = useNotifier();

  const [mutation, mutationState] = useMutation(MarkCompanyLocationAsMain, {
    refetchQueries: [{ query: CompanyLocations, variables: { companyId } }],
    onCompleted: () => setSuccess('Адрес успешно выбран как основной'),
  });

  const mutate = async companyLocationId => {
    const markCompanyLocationAsMainInput = { companyLocationId };

    await mutation({ variables: { input: markCompanyLocationAsMainInput } });
  };

  return [mutate, mutationState];
};

export const useAcceptCompanyLocation = ({ onSubmit }) => {
  const { setSuccess, setError } = useNotifier();

  const [mutation, mutationState] = useMutation(AcceptCompanyLocation, {
    onCompleted: () => {
      setSuccess(`Адрес успешно подтвержден.`);
      onSubmit();
    },
  });

  const mutate = async companyLocationId => {
    const acceptCompanyLocationInput = { companyLocationId };

    try {
      await mutation({ variables: { input: acceptCompanyLocationInput } });
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState];
};

export const useRejectCompanyLocation = ({ onSubmit }) => {
  const { setSuccess, setError } = useNotifier();

  const [mutation, mutationState] = useMutation(RejectCompanyLocation, {
    onCompleted: () => {
      setSuccess(`Запрос на внесение изменений успешно отправлен.`);
      onSubmit();
    },
  });

  const mutate = async ({ companyLocationId, rejectionReason }) => {
    const rejectCompanyLocationInput = { companyLocationId, rejectionReason };

    try {
      await mutation({ variables: { input: rejectCompanyLocationInput } });
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState];
};

export const useDestroyCustomerCompanyLocation = ({ onSubmit }) => {
  const { setSuccess, setError } = useNotifier();

  const [mutation, mutationState] = useMutation(DestroyCustomerCompanyLocation, {
    onCompleted: () => {
      setSuccess(`Адрес успешно удален`);
      onSubmit();
    },
  });

  const mutate = async companyLocationId => {
    const destroyCustomerCompanyLocationInput = { companyLocationId };

    try {
      await mutation({ variables: { input: destroyCustomerCompanyLocationInput } });
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState];
};
