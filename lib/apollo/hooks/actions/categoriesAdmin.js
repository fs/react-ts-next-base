import { useMutation } from '@apollo/client';

import CreateCategory from 'graphql/mutations/createCategory.graphql';
import UpdateCategory from 'graphql/mutations/updateCategory.graphql';
import DestroyCategory from 'graphql/mutations/destroyCategory.graphql';

import useNotifier from 'hooks/useNotifier';

const castParentId = parentId => {
  if (parentId === 0 || parentId === undefined) {
    return null;
  }
  return parentId;
};
export const useCreateCategory = ({ depthName, onCompleted = () => {} }) => {
  const { setError, setSuccess } = useNotifier();

  const [mutation, mutationState] = useMutation(CreateCategory, {
    onCompleted: ({ createCategory: { name } }) => {
      setSuccess(`Вы создали ${depthName.toLowerCase()} "${name}"`);
      onCompleted();
    },
  });

  const mutate = async ({ name, parentId }) => {
    const createCategoryInput = {
      name,
      parentId: castParentId(parentId),
    };

    try {
      await mutation({ variables: { input: createCategoryInput } });
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState];
};

export const useUpdateCategory = ({ depthName, previousName }) => {
  const { setError, setSuccess } = useNotifier();

  const [mutation, mutationState] = useMutation(UpdateCategory);

  const mutate = async ({ name, categoryId }) => {
    const updateCategoryInput = {
      name,
      categoryId,
    };

    try {
      await mutation({ variables: { input: updateCategoryInput } });
      setSuccess(
        `Вы изменили название ${depthName.toLowerCase()} "${previousName}" на "${
          updateCategoryInput.name
        }"`,
      );
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState];
};

export const useDestroyCategory = ({ depthName, onCompleted = () => {} }) => {
  const { setError, setSuccess } = useNotifier();

  const [mutation, mutationState] = useMutation(DestroyCategory, {
    onCompleted: ({
      destroyCategory: {
        category: { name },
      },
    }) => {
      setSuccess(`Вы удалили ${depthName.toLowerCase()} "${name}"`);
      onCompleted();
    },
  });

  const mutate = async ({ categoryId }) => {
    const destroyCategoryInput = {
      categoryId,
    };

    try {
      await mutation({ variables: { input: destroyCategoryInput } });
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState];
};
