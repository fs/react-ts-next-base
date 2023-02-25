import React from 'react';

import Button from 'components/shared/atoms/Button';

import {
  EmptyListWrapper,
  EmptyListMessageWrapper,
  EmptyListMessageImage,
  EmptyListMessageTitle,
  EmptyListMessageDescription,
  AddProductMessageWrapper,
  AddProductMessageImage,
  AddProductMessageDescription,
} from './styled';

const EmptyListMessage = ({ children, text, withCreateProductButton, onCreateProductDraft }) => {
  if (withCreateProductButton) {
    return (
      <EmptyListWrapper>
        <AddProductMessageWrapper>
          <AddProductMessageImage
            alt="add-product"
            src={`${process.env.ASSET_HOST}/images/add-product.png`}
          />

          <EmptyListMessageTitle>Давайте добавим ваш первый товар</EmptyListMessageTitle>
          <AddProductMessageDescription>
            Вы можете добавить безграничное количество товаров. После того как вы добавите товар, вы
            не сможете его отредактировать. Вы сможете создавать шаблоны для облегчения добавления
            товара в будущем.
          </AddProductMessageDescription>
          <Button
            label="Добавить первый товар"
            $width="14.5rem"
            onClick={onCreateProductDraft}
            testId="create-product-button"
          />
        </AddProductMessageWrapper>
      </EmptyListWrapper>
    );
  }

  return (
    <EmptyListWrapper data-testid="empty-list-message">
      <EmptyListMessageWrapper>
        <EmptyListMessageTitle>Ой!</EmptyListMessageTitle>
        {text && <EmptyListMessageDescription>{text}</EmptyListMessageDescription>}
        {children}
        <EmptyListMessageImage
          alt="empty-message"
          src={`${process.env.ASSET_HOST}/images/empty-message.png`}
        />
      </EmptyListMessageWrapper>
    </EmptyListWrapper>
  );
};

export default EmptyListMessage;
