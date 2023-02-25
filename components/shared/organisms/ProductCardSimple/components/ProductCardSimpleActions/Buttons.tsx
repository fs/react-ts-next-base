import React, { FC } from 'react';
import { useModal } from '@ebay/nice-modal-react';

import {
  useDestroyCustomerProduct,
  useRestoreCustomerProduct,
  useAddProductToPriorityList,
  useRemoveProductFromPriorityList,
} from 'lib/apollo/hooks/actions/product';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';
import SimpleModal from 'components/shared/molecules/Modal/SimpleModal';

import {
  TAddProductToPriorityButton,
  TDestroyCustomerProductButton,
  TRemoveProductFromPriorityButton,
  TRestoreCustomerProductButton,
} from './types';

export const DestroyCustomerProductButton: FC<TDestroyCustomerProductButton> = ({ productId }) => {
  const [destroyCustomerProduct] = useDestroyCustomerProduct();
  const destroyCustomerProductModal = useModal(SimpleModal);

  const showRemoveProduct = () => {
    destroyCustomerProductModal.show({
      roundedButton: true,
      onSubmit: async () => {
        await destroyCustomerProduct(productId);
      },
      title: 'Удаление товара',
      description:
        'Нажимая “Подтвердить”, вы удалите товар из страницы товаров продавца и каталога.',
    });
  };
  return (
    <Button
      variant="alert"
      iconType="only"
      icon={<Icon name="trash-bin" $color="white" />}
      onClick={showRemoveProduct}
      testId="destroy-customer-product-button"
    />
  );
};

export const RestoreCustomerProductButton: FC<TRestoreCustomerProductButton> = ({ productId }) => {
  const [restoreCustomerProduct] = useRestoreCustomerProduct();
  const restoreCustomerProductModal = useModal(SimpleModal);

  const showRestoreProduct = () =>
    restoreCustomerProductModal.show({
      variant: 'confirm',
      roundedButton: true,
      onSubmit: async () => {
        await restoreCustomerProduct(productId);
      },
      title: 'Восстановление товара',
      description:
        'Нажимая “Подтвердить”, вы восстановите товар. Он будет отображаться в каталоге товаров на сайте.',
    });

  return (
    <Button
      label="Восстановить"
      variant="confirm"
      $width="100%"
      onClick={showRestoreProduct}
      testId="restore-customer-product-button"
    />
  );
};

export const AddProductToPriorityButton: FC<TAddProductToPriorityButton> = ({ productId }) => {
  const [addProductToPriorityList] = useAddProductToPriorityList();
  const addProductToPriorityListModal = useModal(SimpleModal);

  const showAddProductToPriorityList = () =>
    addProductToPriorityListModal.show({
      variant: 'confirm',
      roundedButton: true,
      onSubmit: async () => {
        await addProductToPriorityList({ productId });
      },
      title: 'Приоритетная выдача',
      description:
        'Нажимая “Подтвердить”, вы присвоите товару статус “Приоритетный”. Он будет отображаться в начале каталога перед обычными товарами и обведется оранжевой рамкой.',
    });

  return (
    <Button
      label="Добавить"
      variant="confirm"
      $width="100%"
      onClick={showAddProductToPriorityList}
      iconType="leading"
      icon={<Icon name="plus" $color="white" />}
      testId="add-product-to-priority-button"
    />
  );
};

export const RemoveProductFromPriorityButton: FC<TRemoveProductFromPriorityButton> = ({
  productId,
}) => {
  const [removeProductFromPriorityList] = useRemoveProductFromPriorityList();
  const removeProductFromPriorityListModal = useModal(SimpleModal);

  const showRemoveProductFromPriorityList = () =>
    removeProductFromPriorityListModal.show({
      roundedButton: true,
      onSubmit: async () => {
        await removeProductFromPriorityList({ productId });
      },
      title: 'Убрать из приоритетной выдачи',
      description:
        'Вы уверены что хотите убрать товар из приоритетной выдачи? Нажимая “Подтвердить”, вы уберете статус “Приоритетный” у выбранного товара.',
    });

  return (
    <Button
      label="Убрать из приоритетных"
      $width="100%"
      onClick={showRemoveProductFromPriorityList}
      iconType="leading"
      icon={<Icon name="minus" $color="white" />}
      testId="remove-product-from-priority-button"
    />
  );
};
