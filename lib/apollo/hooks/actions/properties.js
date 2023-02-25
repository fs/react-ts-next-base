import { useMutation } from '@apollo/client';

import useNotifier from 'hooks/useNotifier';

import CreateDictionaryProperty from 'graphql/mutations/createDictionaryProperty.graphql';
import CreateIntegerProperty from 'graphql/mutations/createIntegerProperty.graphql';
import CreateStringProperty from 'graphql/mutations/createStringProperty.graphql';

import UpdateDictionaryProperty from 'graphql/mutations/updateDictionaryProperty.graphql';
import UpdateIntegerProperty from 'graphql/mutations/updateIntegerProperty.graphql';
import UpdateStringProperty from 'graphql/mutations/updateStringProperty.graphql';

import DestroyProperty from 'graphql/mutations/destroyProperty.graphql';

export const useCreateDictionaryProperty = () => {
  const { setSuccess, setError } = useNotifier();
  const [mutation, mutationState] = useMutation(CreateDictionaryProperty, {
    onCompleted: ({ createDictionaryProperty: { name } }) => {
      setSuccess(`Характеристика "${name}" успешно создана`);
    },
  });

  const mutate = async (
    { name, displayName, categoryIds, dictionaryPropertyOptions },
    onSuccess = () => {},
  ) => {
    const createDictionaryPropertyInput = {
      name,
      displayName,
      categoryIds,
      dictionaryPropertyOptions,
    };

    try {
      await mutation({ variables: { input: createDictionaryPropertyInput } });
      onSuccess();
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState];
};

export const useCreateIntegerProperty = () => {
  const { setSuccess, setError } = useNotifier();
  const [mutation, mutationState] = useMutation(CreateIntegerProperty, {
    onCompleted: ({ createIntegerProperty: { name } }) => {
      setSuccess(`Характеристика "${name}" успешно создана`);
    },
  });

  const mutate = async ({ name, displayName, categoryIds, unit }, onSuccess = () => {}) => {
    const createIntegerPropertyInput = {
      name,
      displayName,
      categoryIds,
      unit,
    };

    try {
      await mutation({ variables: { input: createIntegerPropertyInput } });
      onSuccess();
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState];
};

export const useCreateStringProperty = () => {
  const { setSuccess, setError } = useNotifier();
  const [mutation, mutationState] = useMutation(CreateStringProperty, {
    onCompleted: ({ createStringProperty: { name } }) => {
      setSuccess(`Характеристика "${name}" успешно создана`);
    },
  });

  const mutate = async ({ name, displayName, categoryIds }, onSuccess = () => {}) => {
    const createStringPropertyInput = {
      name,
      displayName,
      categoryIds,
    };

    try {
      await mutation({ variables: { input: createStringPropertyInput } });
      onSuccess();
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState];
};

export const useDestroyProperty = ({ name, onSubmit }) => {
  const { setSuccess, setError } = useNotifier();
  const [mutation, mutationState] = useMutation(DestroyProperty, {
    onCompleted: () => {
      setSuccess(`Характеристика "${name}" успешно удалена`);
      onSubmit();
    },
  });

  const mutate = async ({ propertyId }) => {
    const destroyPropertyInput = { propertyId };

    try {
      await mutation({ variables: { input: destroyPropertyInput } });
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState];
};

export const useUpdateDictionaryProperty = propertyId => {
  const { setSuccess, setError } = useNotifier();
  const [mutation, mutationState] = useMutation(UpdateDictionaryProperty, {
    onCompleted: ({ updateDictionaryProperty: { name } }) => {
      setSuccess(`Характеристика "${name}" успешно обновлена`);
    },
  });

  const mutate = async ({ name, displayName, dictionaryPropertyOptions }) => {
    const updateDictionaryPropertyInput = {
      name,
      displayName,
      propertyId,
      dictionaryPropertyOptions: dictionaryPropertyOptions.map(({ name: optionName }) => ({
        name: optionName,
      })),
    };

    try {
      await mutation({ variables: { input: updateDictionaryPropertyInput } });
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState];
};

export const useUpdateIntegerProperty = propertyId => {
  const { setSuccess, setError } = useNotifier();
  const [mutation, mutationState] = useMutation(UpdateIntegerProperty, {
    onCompleted: ({ updateIntegerProperty: { name } }) => {
      setSuccess(`Характеристика "${name}" успешно обновлена`);
    },
  });

  const mutate = async ({ name, displayName }) => {
    const updateIntegerPropertyInput = {
      name,
      displayName,
      propertyId,
    };

    try {
      await mutation({ variables: { input: updateIntegerPropertyInput } });
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState];
};

export const useUpdateStringProperty = propertyId => {
  const { setSuccess, setError } = useNotifier();
  const [mutation, mutationState] = useMutation(UpdateStringProperty, {
    onCompleted: ({ updateStringProperty: { name } }) => {
      setSuccess(`Характеристика "${name}" успешно обновлена`);
    },
  });

  const mutate = async ({ name, displayName }) => {
    const updateStringPropertyInput = {
      name,
      displayName,
      propertyId,
    };

    try {
      await mutation({ variables: { input: updateStringPropertyInput } });
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState];
};
