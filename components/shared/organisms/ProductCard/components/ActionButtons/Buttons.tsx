import React, { useState } from 'react';
import useRouter from 'hooks/useRouter';
import useNotifier from 'hooks/useNotifier';
import { useModal } from '@ebay/nice-modal-react';

import {
  useAddProductToFavorites,
  useRemoveProductFromFavorites,
  useDestroyProduct,
  useRenewProduct,
  useRestoreProduct,
  useCreateProductFromTemplate,
} from 'lib/apollo/hooks/actions/product';

import { DASHBOARD_COMPANY_CREATE_PRODUCT, DASHBOARD_COMPANY_PRODUCTS } from 'config/routes';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';
import SimpleModal from 'components/shared/molecules/Modal/SimpleModal';

import { productTypes } from 'components/pages/dashboard/companyProducts/constants';

import {
  TFavoriteButton,
  TRemoveProductButton,
  TRenewProductButton,
  TRestoreProductButton,
  TUseTemplateButton,
} from './types';

export const FavoriteButton = ({
  favorite,
  productId,
  refetchProducts,
  isFavoriteModalShown,
}: TFavoriteButton) => {
  const [addProductToFavorites] = useAddProductToFavorites();
  const [removeProductFromFavorites] = useRemoveProductFromFavorites();
  const handleFavoritesModal = useModal(SimpleModal);

  const actionFavorites = favorite ? removeProductFromFavorites : addProductToFavorites;

  const handleFavoritesButton = async () => {
    await actionFavorites(productId);
  };

  const showHandleFavoritesModal = () =>
    handleFavoritesModal.show({
      onSubmit: async () => {
        await actionFavorites(productId);
        await refetchProducts();
      },
      title: 'Удаление товара из Избранных',
      description: 'Вы действительно хотите убрать выбранный товар из Избранных?',
    });

  return (
    <Button
      variant="change"
      iconType="only"
      icon={<Icon name={favorite ? 'heart' : 'heart-line'} $color="white" />}
      onClick={isFavoriteModalShown ? showHandleFavoritesModal : handleFavoritesButton}
    />
  );
};

export const RemoveProductButton = ({ id, name, isDraft, isTemplate }: TRemoveProductButton) => {
  const REMOVE_TEXT_VARIANTS = {
    product: {
      title: 'Удаление товара',
      description: (
        <>
          Вы уверены, что вы хотите удалить товар {name} с кодом <strong>{id}</strong>?
        </>
      ),
      subDescription: '',
    },

    draft: {
      title: 'Удаление черновика товара',
      description: 'Вы уверены, что хотите удалить выбранный черновик товара?',
      subDescription: 'Удаляя черновик товара, восстановить его будет невозможно.',
    },

    template: {
      title: 'Удаление шаблона',
      description: 'Вы уверены, что хотите удалить выбранный шаблон товара?',
      subDescription: 'Удалив шаблон товара, восстановить его будет невозможно.',
    },
  };

  const [destroyProduct] = useDestroyProduct({ productId: id });
  const destroyProductModal = useModal(SimpleModal);

  const modalText = isDraft
    ? REMOVE_TEXT_VARIANTS.draft
    : isTemplate
    ? REMOVE_TEXT_VARIANTS.template
    : REMOVE_TEXT_VARIANTS.product;

  const showRemoveModal = () => {
    destroyProductModal.show({
      onSubmit: async () => {
        await destroyProduct();
      },
      title: modalText.title,
      description: modalText.description,
      subDescription: modalText.subDescription,
    });
  };

  if (isTemplate) {
    return (
      <Button
        variant="alert"
        iconType="only"
        icon={<Icon name="trash-bin" $color="white" $size={18} />}
        onClick={showRemoveModal}
        testId="remove-product-button"
        $width="100%"
      />
    );
  }

  return (
    <Button
      label="Удалить"
      variant="change"
      onClick={showRemoveModal}
      testId="remove-product-button"
      $width="100%"
    />
  );
};

export const RenewProductButton = ({ productId, companyId, onlyRedirect }: TRenewProductButton) => {
  const { pushRoute } = useRouter();

  const redirect = () => {
    pushRoute({ pathname: DASHBOARD_COMPANY_CREATE_PRODUCT, query: { companyId, productId } });
  };
  const [renewProduct] = useRenewProduct({ onConfirm: redirect });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const renew = async () => {
    setIsSubmitting(true);
    await renewProduct(productId);
    setIsSubmitting(false);
  };

  return (
    <Button
      label="Обновить"
      testId="renew-product-button"
      $width="100%"
      onClick={onlyRedirect ? redirect : renew}
      isLoading={isSubmitting}
    />
  );
};

export const RestoreProductButton = ({ productId, companyId }: TRestoreProductButton) => {
  const [restoreProduct] = useRestoreProduct();
  const { pushRoute } = useRouter();
  const restoreProductModal = useModal(SimpleModal);

  const showRestoreModal = () => {
    restoreProductModal.show({
      onSubmit: async () => {
        await restoreProduct(productId);
        pushRoute({
          pathname: DASHBOARD_COMPANY_PRODUCTS,
          query: { companyId, type: productTypes.ACTIVE },
        });
      },
      title: 'Восстановление товара',
      description: 'Вы уверены, что хотите восстановить выбранный товар?',
      subDescription:
        'Восстановив товар, вы сможете найти его в разделе “Мои товары” и отредактировать перед сохранением и отправкой на проверку.',
    });
  };

  return (
    <Button
      label="Восстановить"
      $width="100%"
      onClick={showRestoreModal}
      testId="restore-product-button"
    />
  );
};

export const UseTemplateButton = ({ companyId, productId }: TUseTemplateButton) => {
  const { setError } = useNotifier();
  const { pushRoute } = useRouter();

  const [createProductFromTemplate] = useCreateProductFromTemplate({ productId });

  const onCreateProductFromTemplate = async () => {
    try {
      const product = await createProductFromTemplate();

      if (product) {
        const { id: newProductId } = product;
        pushRoute({
          pathname: DASHBOARD_COMPANY_CREATE_PRODUCT,
          query: {
            companyId,
            productId: newProductId,
          },
        });
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <Button
      label="Использовать"
      testId="use-template-button"
      onClick={onCreateProductFromTemplate}
      $width="100%"
    />
  );
};
