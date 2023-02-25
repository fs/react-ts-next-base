import React from 'react';

import Button from 'components/shared/atoms/Button';

import {
  EmptyListWrapper,
  EmptyListMessageTitle,
  EmptyListMessageWrapper,
  EmptyListMessageImage,
  EmptyListMessageDescription,
} from './styled';

const EmptyListMessageWithMoveButton = ({ onHandleClick }) => {
  return (
    <EmptyListWrapper>
      <EmptyListMessageWrapper>
        <EmptyListMessageImage
          alt="checking-company"
          src={`${process.env.ASSET_HOST}/images/checking-company-image.png`}
        />

        <EmptyListMessageTitle>Ой</EmptyListMessageTitle>
        <EmptyListMessageDescription>
          Для загрузки первого товара необходимо загрузить подтверждающие фото и видео, чтобы
          подтвердить, что ваша компания существует. Перейдите в личном кабинете в данные о вашей
          компании и загрузите необходимые файлы.
        </EmptyListMessageDescription>
        <Button label="Перейти" $width="9rem" onClick={onHandleClick} testId="move-to-button" />
      </EmptyListMessageWrapper>
    </EmptyListWrapper>
  );
};

export default EmptyListMessageWithMoveButton;
