import React, { useMemo } from 'react';

import Icon from 'components/shared/atoms/Icon';

import { StatusEnum } from 'graphql/types';

import { ProductCheck, CheckText } from './styled';
import { TProductCheckStatus, EProductStatus } from './types';

const icon = {
  [EProductStatus.checking]: <Icon name="timer" $color="white" $mr={16} $size={20} />,
  [EProductStatus.rejection]: <Icon name="pencil" $color="white" $ml={14} $mr={20} $size={20} />,
  [EProductStatus.draft]: <Icon name="exclamation-square" $color="white" $mr={10} $size={26} />,
  [EProductStatus.outOfStock]: (
    <Icon name="exclamation-square" $color="white" $ml={20} $mr={40} $size={26} />
  ),
};

const text = {
  [EProductStatus.checking]: 'Мы проверяем ваш товар',
  [EProductStatus.rejection]: (
    <>
      Внесите запрошенные
      <br /> администратором корректировки
    </>
  ),
  [EProductStatus.draft]: 'Вы не завершили добавление товара',
  [EProductStatus.outOfStock]: 'Товар закончился',
};

const ProductCheckStatus = ({ status, draft }: TProductCheckStatus) => {
  const productStatus = useMemo(() => {
    switch (true) {
      case status === StatusEnum.NotVerified && !draft:
        return EProductStatus.checking;
      case status === StatusEnum.Rejected:
        return EProductStatus.rejection;
      case status === StatusEnum.NotVerified && draft:
        return EProductStatus.draft;
      case status === StatusEnum.OutOfStock:
        return EProductStatus.outOfStock;
      default:
        return null;
    }
  }, [status, draft]);

  if (!productStatus) return <></>;

  return (
    <ProductCheck productStatus={productStatus} data-testid="product-status">
      {icon[productStatus]}
      <CheckText data-testid="product-status-text">{text[productStatus]}</CheckText>
    </ProductCheck>
  );
};

export default ProductCheckStatus;
