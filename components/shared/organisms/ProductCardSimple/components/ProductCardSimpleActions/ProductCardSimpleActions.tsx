import React, { FC, useMemo } from 'react';

import { StatusEnum } from 'graphql/types';
import { ADMIN_PRODUCT, ADMIN_PRODUCT_CONFIRM } from 'config/routes';

import Button from 'components/shared/atoms/Button';

import {
  AddProductToPriorityButton,
  DestroyCustomerProductButton,
  RestoreCustomerProductButton,
  RemoveProductFromPriorityButton,
} from './Buttons';

import { ButtonsWrapper } from './styled';
import { TProductCardSimpleActions } from './types';

const ProductCardSimpleActions: FC<TProductCardSimpleActions> = ({
  productId,
  status,
  deleted,
  variant,
  canAddToPriorityList,
  canRemoveFromPriorityList,
}) => {
  const renderActions = useMemo(() => {
    if (variant === 'admin_priority') {
      if (canAddToPriorityList) {
        return <AddProductToPriorityButton productId={productId} />;
      }
      if (canRemoveFromPriorityList) {
        return <RemoveProductFromPriorityButton productId={productId} />;
      }
    }
    if (variant === 'default') {
      if (deleted) {
        return <RestoreCustomerProductButton productId={productId} />;
      }
      if (status === StatusEnum.Rejected) {
        return (
          <Button
            label="Подробнее"
            $width="100%"
            href={{ pathname: ADMIN_PRODUCT_CONFIRM, query: { productId } }}
            testId="product-details-button"
          />
        );
      }
      if ([StatusEnum.Verified, StatusEnum.OutOfStock].includes(status)) {
        return (
          <>
            <DestroyCustomerProductButton productId={productId} />
            <Button
              label="Подробнее"
              $width="100%"
              href={{ pathname: ADMIN_PRODUCT, query: { productId } }}
              testId="product-details-button"
            />
          </>
        );
      }
      if (status === StatusEnum.NotVerified) {
        return (
          <Button
            label="Проверить товар"
            variant="change"
            $width="100%"
            href={{ pathname: ADMIN_PRODUCT_CONFIRM, query: { productId } }}
            testId="confirm-product-button"
          />
        );
      }
    }
    return <></>;
  }, [variant, status, deleted, canAddToPriorityList, canRemoveFromPriorityList]);

  return <ButtonsWrapper data-testid="product-card-simple-actions">{renderActions}</ButtonsWrapper>;
};

export default ProductCardSimpleActions;
