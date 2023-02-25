import ErrorDecorator from 'decorators/ErrorDecorator';

import {
  CreateProductDraftInput,
  CreateProductFromTemplateInput,
  SubmitProductBasicStepInput,
  SubmitProductPropertiesStepInput,
  SubmitProductAddressStepInput,
  SubmitProductDeliveryStepInput,
  SubmitProductDeliveryConditionsStepInput,
  SubmitProductPricesStepInput,
  SubmitProductDiscountsStepInput,
  DestroyProductInput,
  ConfirmProductInput,
  RejectProductInput,
  AddProductToPriorityListInput,
  RemoveProductFromPriorityListInput,
} from 'graphql/types';
import { useCreateProductDraftMutation } from 'graphql/mutations/__generated__/createProductDraft.generated';
import { useSubmitProductBasicStepMutation } from 'graphql/mutations/__generated__/submitProductBasicStep.generated';
import { useCreateProductFromTemplateMutation } from 'graphql/mutations/__generated__/createProductFromTemplate.generated';
import { useSubmitProductPropertiesStepMutation } from 'graphql/mutations/__generated__/submitProductPropertiesStep.generated';
import { useSubmitProductAddressStepMutation } from 'graphql/mutations/__generated__/submitProductAddressStep.generated';
import { useSubmitProductDeliveryStepMutation } from 'graphql/mutations/__generated__/submitProductDeliveryStep.generated';
import { useSubmitProductDeliveryConditionStepMutation } from 'graphql/mutations/__generated__/submitProductDeliveryConditionStep.generated';
import { useSubmitProductPricesStepMutation } from 'graphql/mutations/__generated__/submitProductPricesStep.generated';
import { useSubmitProductDiscountsStepMutation } from 'graphql/mutations/__generated__/submitProductDiscountsStep.generated';
import { useCreateProductTemplateMutation } from 'graphql/mutations/__generated__/createProductTemplate.generated';
import { useDestroyProductMutation } from 'graphql/mutations/__generated__/destroyProduct.generated';
import { useRestoreProductMutation } from 'graphql/mutations/__generated__/restoreProduct.generated';
import { useRenewProductMutation } from 'graphql/mutations/__generated__/renewProduct.generated';
import { useAddProductToFavoritesMutation } from 'graphql/mutations/__generated__/addProductToFavorites.generated';
import { useRemoveProductFromFavoritesMutation } from 'graphql/mutations/__generated__/removeProductFromFavorites.generated';
import { useConfirmProductMutation } from 'graphql/mutations/__generated__/confirmProduct.generated';
import { useRejectProductMutation } from 'graphql/mutations/__generated__/rejectProduct.generated';
import { useDestroyCustomerProductMutation } from 'graphql/mutations/__generated__/destroyCustomerProduct.generated';
import { useRestoreCustomerProductMutation } from 'graphql/mutations/__generated__/restoreCustomerProduct.generated';
import { useAddProductToPriorityListMutation } from 'graphql/mutations/__generated__/addProductToPriorityList.generated';
import { useRemoveProductFromPriorityListMutation } from 'graphql/mutations/__generated__/removeProductFromPriorityList.generated';

import { ProductInfoFragment } from 'graphql/fragments/__generated__/productInfo.generated';

import useNotifier from 'hooks/useNotifier';

export const useCreateProductDraft = ({
  onSubmit = () => {},
}: {
  onSubmit: ({ id }: { id?: string }) => void;
}) => {
  const { setError } = useNotifier();

  const [mutation, mutationState] = useCreateProductDraftMutation({
    onCompleted: data => onSubmit({ id: data.createProductDraft?.id }),
  });

  const mutate = async ({
    companyId,
    name,
    description,
    condition,
    categoryId,
    countryId,
    manufacturer,
  }: CreateProductDraftInput) => {
    const createProductDraftInput = {
      companyId,
      name,
      description,
      condition,
      categoryId,
      countryId,
      manufacturer,
    };

    try {
      await mutation({ variables: { input: createProductDraftInput } });
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState] as const;
};

export const useCreateProductFromTemplate = ({ productId }: CreateProductFromTemplateInput) => {
  const { setError } = useNotifier();

  const [mutation, mutationState] = useCreateProductFromTemplateMutation();

  const mutate = async () => {
    const createProductFromTemplateInput = {
      productId,
    };

    try {
      const product = await mutation({ variables: { input: createProductFromTemplateInput } });
      return product.data?.createProductFromTemplate || null;
    } catch (error) {
      setError(error);
      return null;
    }
  };

  return [mutate, mutationState] as const;
};

export const useSubmitProductBasicStep = ({ onSubmit = () => {} }) => {
  const { setError } = useNotifier();

  const [mutation, mutationState] = useSubmitProductBasicStepMutation({
    onCompleted: () => onSubmit(),
  });

  const mutate = async ({
    productId,
    name,
    description,
    condition,
    categoryId,
    countryId,
    manufacturer,
  }: SubmitProductBasicStepInput) => {
    const submitProductBasicStepInput = {
      productId,
      name,
      description,
      condition,
      categoryId,
      countryId,
      manufacturer,
    };

    try {
      const product = await mutation({ variables: { input: submitProductBasicStepInput } });
      return product?.data?.submitProductBasicStep || null;
    } catch (error) {
      setError(error);
      return null;
    }
  };

  return [mutate, mutationState] as const;
};

export const useSubmitProductPropertiesStep = () => {
  const { setError } = useNotifier();

  const [mutation, mutationState] = useSubmitProductPropertiesStepMutation();

  const mutate = async ({ productId, variants }: SubmitProductPropertiesStepInput) => {
    const submitProductPropertiesStepInput = {
      productId,
      variants,
    };

    try {
      const product = await mutation({ variables: { input: submitProductPropertiesStepInput } });
      return product?.data?.submitProductPropertiesStep || null;
    } catch (error) {
      setError(error);
      return null;
    }
  };

  return [mutate, mutationState] as const;
};

export const useSubmitProductAddressStep = () => {
  const { setError } = useNotifier();

  const [mutation, mutationState] = useSubmitProductAddressStepMutation();

  const mutate = async ({
    productId,
    companyLocationId,
    variants,
  }: SubmitProductAddressStepInput) => {
    const submitProductAddressStepInput = {
      productId,
      companyLocationId,
      variants,
    };

    try {
      const product = await mutation({ variables: { input: submitProductAddressStepInput } });
      return product?.data?.submitProductAddressStep || null;
    } catch (error) {
      setError(error);
      return null;
    }
  };

  return [mutate, mutationState] as const;
};

export const useSubmitProductDeliveryStep = () => {
  const { setError } = useNotifier();

  const [mutation, mutationState] = useSubmitProductDeliveryStepMutation();

  const mutate = async ({
    productId,
    productFreeDeliveries,
    productPaidDeliveries,
    disablePickup,
  }: // eslint-disable-next-line consistent-return
  SubmitProductDeliveryStepInput) => {
    const submitProductDeliveryStepInput = {
      productId,
      productFreeDeliveries,
      productPaidDeliveries,
      disablePickup,
    };

    try {
      const product = await mutation({ variables: { input: submitProductDeliveryStepInput } });
      return product?.data?.submitProductDeliveryStep || null;
    } catch (error) {
      const errorMessage = new ErrorDecorator(error);
      setError(errorMessage);
      return null;
    }
  };

  return [mutate, mutationState] as const;
};

export const useSubmitProductDeliveryConditionStep = () => {
  const [mutation, mutationState] = useSubmitProductDeliveryConditionStepMutation();

  const mutate = async ({
    productId,
    shipmentMethod,
    sdekCourierAllowed,
    dellinCourierAllowed,
    sdekDeliveryPointId,
    dellinDeliveryPointId,
    deliveryConditionForVariant,
    deliveryCondition,
    dellinFreightTypeId,
    variants,
  }: SubmitProductDeliveryConditionsStepInput) => {
    const submitProductDeliveryConditionStepInput = {
      productId,
      shipmentMethod,
      sdekCourierAllowed,
      dellinCourierAllowed,
      sdekDeliveryPointId,
      dellinDeliveryPointId,
      deliveryConditionForVariant,
      deliveryCondition,
      dellinFreightTypeId,
      variants,
    };

    const product = await mutation({
      variables: { input: submitProductDeliveryConditionStepInput },
    });
    return product?.data?.submitProductDeliveryConditionsStep || null;
  };

  return [mutate, mutationState] as const;
};

export const useSubmitProductPricesStep = () => {
  const { setError } = useNotifier();

  const [mutation, mutationState] = useSubmitProductPricesStepMutation();

  // eslint-disable-next-line consistent-return
  const mutate = async ({
    productId,
    wholesaleLot,
    vat,
    productConfirmationRecords,
    variants,
  }: SubmitProductPricesStepInput) => {
    const submitProductPricesStepInput = {
      productId,
      wholesaleLot,
      vat,
      productConfirmationRecords,
      variants,
    };

    try {
      const product = await mutation({ variables: { input: submitProductPricesStepInput } });
      return product?.data?.submitProductPricesStep || null;
    } catch (error) {
      setError(error);
      return null;
    }
  };

  return [mutate, mutationState] as const;
};

export const useSubmitProductDiscountsStep = () => {
  const [mutation, mutationState] = useSubmitProductDiscountsStepMutation();

  const mutate = async ({
    productId,
    discountMethod,
    discountsForVariant,
    weeklyDiscounts,
    periodDiscounts,
    variants,
  }: SubmitProductDiscountsStepInput) => {
    const submitProductDiscountsStepInput = {
      productId,
      discountMethod,
      discountsForVariant,
      weeklyDiscounts,
      periodDiscounts,
      variants,
    };

    const product = await mutation({ variables: { input: submitProductDiscountsStepInput } });
    return product?.data?.submitProductDiscountsStep || null;
  };

  return [mutate, mutationState] as const;
};

export const useCreateProductTemplate = () => {
  const { setSuccess } = useNotifier();

  const onCompleted = () => {
    setSuccess('Шаблон успешно создан');
  };

  const [mutation, mutationState] = useCreateProductTemplateMutation({
    onCompleted,
  });

  const mutate = async ({
    productId,
    discountMethod,
    discountsForVariant,
    weeklyDiscounts,
    periodDiscounts,
    variants,
  }: SubmitProductDiscountsStepInput) => {
    const submitProductDiscountsStepInput = {
      productId,
      discountMethod,
      discountsForVariant,
      weeklyDiscounts,
      periodDiscounts,
      variants,
    };

    const product = await mutation({ variables: { input: submitProductDiscountsStepInput } });
    return product?.data?.createProductTemplate || null;
  };

  return [mutate, mutationState] as const;
};

export const useDestroyProduct = ({ productId }: DestroyProductInput) => {
  const { setSuccess, setError } = useNotifier();

  const [mutation, mutationState] = useDestroyProductMutation({
    update(cache) {
      cache.modify({
        fields: {
          myProducts(existing, { readField }) {
            return {
              ...existing,
              edges: existing.edges.filter(
                (edge: { node: ProductInfoFragment }) => productId !== readField('id', edge.node),
              ),
            };
          },
        },
      });
    },
    onCompleted: data => {
      setSuccess(data.destroyProduct?.message || '');
    },
  });

  const mutate = async () => {
    const destroyProductInput = {
      productId,
    };

    try {
      await mutation({ variables: { input: destroyProductInput } });
    } catch (error) {
      setError(error);
    }
  };

  const detailedMessage = mutationState.data?.destroyProduct?.message || 'error';

  return [mutate, detailedMessage] as const;
};

export const useRestoreProduct = () => {
  const [mutation, mutationState] = useRestoreProductMutation();

  const mutate = async (productId: string) => {
    const restoreProductInput = { productId };
    await mutation({ variables: { input: restoreProductInput } });
  };

  return [mutate, mutationState] as const;
};

export const useRenewProduct = ({ onConfirm = () => {} }) => {
  const { setError } = useNotifier();

  const onCompleted = () => {
    onConfirm();
  };

  const [mutation, mutationState] = useRenewProductMutation({ onCompleted });

  const mutate = async (productId: string) => {
    const renewProductInput = {
      productId,
    };

    try {
      await mutation({ variables: { input: renewProductInput } });
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState] as const;
};

export const useAddProductToFavorites = () => {
  const { setError, setSuccess } = useNotifier();

  const onCompleted = () => {
    setSuccess('Выбранный товар был добавлен в Избранное');
  };

  const [mutation, mutationState] = useAddProductToFavoritesMutation({ onCompleted });

  const mutate = async (productId: string) => {
    const addProductToFavoritesInput = {
      productId,
    };

    try {
      await mutation({ variables: { input: addProductToFavoritesInput } });
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState] as const;
};

export const useRemoveProductFromFavorites = () => {
  const { setError, setSuccess } = useNotifier();

  const onCompleted = () => {
    setSuccess('Выбранный товар был удалён из Избранных');
  };

  const [mutation, mutationState] = useRemoveProductFromFavoritesMutation({ onCompleted });

  const mutate = async (productId: string) => {
    const removeProductFromFavoritesInput = {
      productId,
    };

    try {
      await mutation({ variables: { input: removeProductFromFavoritesInput } });
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState] as const;
};

export const useConfirmProduct = ({ productName = '', onConfirm = () => {} }) => {
  const { setSuccess, setError } = useNotifier();
  const [mutation, mutationState] = useConfirmProductMutation({
    onCompleted: () => {
      setSuccess(`Продукт ${productName} успешно добавлен.`);
      onConfirm();
    },
  });

  const mutate = async ({ productId }: ConfirmProductInput) => {
    const confirmProductInput = {
      productId,
    };
    try {
      await mutation({ variables: { input: confirmProductInput } });
    } catch (error) {
      const errorMessage = new ErrorDecorator(error);
      setError(errorMessage);
    }
  };
  return [mutate, mutationState] as const;
};

export const useRejectProduct = ({ productName = '', onConfirm = () => {} }) => {
  const { setSuccess, setError } = useNotifier();
  const [mutation, mutationState] = useRejectProductMutation({
    onCompleted: () => {
      setSuccess(`Запрос на внесение изменений ${productName} успешно отправлен.`);
      onConfirm();
    },
  });

  const mutate = async ({ productId, rejectionMessage }: RejectProductInput) => {
    const rejectProductInput = {
      productId,
      rejectionMessage,
    };
    try {
      await mutation({ variables: { input: rejectProductInput } });
    } catch (error) {
      const errorMessage = new ErrorDecorator(error);
      setError(errorMessage);
    }
  };
  return [mutate, mutationState] as const;
};

export const useDestroyCustomerProduct = () => {
  const { setSuccess, setError } = useNotifier();

  const [mutation, mutationState] = useDestroyCustomerProductMutation({
    update(cache, { data }) {
      cache.modify({
        fields: {
          customerProducts(existing, { readField }) {
            return {
              ...existing,
              edges: existing.edges.filter(
                (edge: { node: ProductInfoFragment }) =>
                  data?.destroyCustomerProduct?.id !== readField('id', edge.node),
              ),
            };
          },
        },
      });
    },
    onCompleted: data => {
      setSuccess(`Продукт № ${data?.destroyCustomerProduct?.id} успешно удален`);
    },
  });

  const mutate = async (id: string) => {
    const destroyProductInput = {
      productId: id,
    };

    try {
      await mutation({ variables: { input: destroyProductInput } });
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState] as const;
};

export const useRestoreCustomerProduct = () => {
  const { setSuccess, setError } = useNotifier();

  const [mutation, mutationState] = useRestoreCustomerProductMutation({
    update(cache, { data }) {
      cache.modify({
        fields: {
          customerProducts(existing, { readField }) {
            return {
              ...existing,
              edges: existing.edges.filter(
                (edge: { node: ProductInfoFragment }) =>
                  data?.restoreCustomerProduct?.id !== readField('id', edge.node),
              ),
            };
          },
        },
      });
    },
    onCompleted: data => {
      setSuccess(`Продукт № ${data?.restoreCustomerProduct?.id} успешно восстановлен`);
    },
  });

  const mutate = async (id: string) => {
    const restoreProductInput = {
      productId: id,
    };

    try {
      await mutation({ variables: { input: restoreProductInput } });
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState] as const;
};

export const useAddProductToPriorityList = () => {
  const { setSuccess, setError } = useNotifier();

  const [mutation, mutationState] = useAddProductToPriorityListMutation({
    onCompleted: data => {
      setSuccess(`Продукт № ${data?.addProductToPriorityList?.product.id} добавлен в Приоритетные`);
    },
  });

  const mutate = async ({ productId }: AddProductToPriorityListInput) => {
    const addProductToPriorityListInput = {
      productId,
    };

    try {
      await mutation({ variables: { input: addProductToPriorityListInput } });
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState] as const;
};

export const useRemoveProductFromPriorityList = () => {
  const { setSuccess, setError } = useNotifier();

  const [mutation, mutationState] = useRemoveProductFromPriorityListMutation({
    onCompleted: data => {
      setSuccess(
        `Продукт № ${data?.removeProductFromPriorityList?.product.id} убран из Приоритетных`,
      );
    },
  });

  const mutate = async ({ productId }: RemoveProductFromPriorityListInput) => {
    const removeProductFromPriorityListInput = {
      productId,
    };

    try {
      await mutation({ variables: { input: removeProductFromPriorityListInput } });
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState] as const;
};
