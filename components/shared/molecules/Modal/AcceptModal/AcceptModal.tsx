import React from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';
import ModalWindow from 'components/shared/atoms/ModalWindow';

import { TAcceptModal } from './types';
import { AcceptTitle, Wrapper, Description } from './styled';

const AcceptModal = NiceModal.create<TAcceptModal>(
  ({
    title = 'Пользователь создан для управления выбранными компаниями',
    description = 'Пользователю отправлено письмо, в котором находится ссылка для перехода в его Личный кабинет.',
  }) => {
    const { visible, remove } = useModal();

    return (
      <ModalWindow isOpen={visible} setIsOpen={remove} $width="26.5rem">
        <Wrapper>
          <AcceptTitle data-testid="accept-modal-title" data-cy="accept-modal-title">
            {title}
          </AcceptTitle>
          <Icon name="mail" $color="greyCC" $size={116} />
          <Description>{description}</Description>
          <Button
            label="Понятно"
            $width="10rem"
            onClick={remove}
            testId="accept-modal-submit-button"
          />
        </Wrapper>
      </ModalWindow>
    );
  },
);

export default AcceptModal;
