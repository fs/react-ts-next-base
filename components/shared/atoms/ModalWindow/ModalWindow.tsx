import React, { FC } from 'react';
import Modal from 'react-modal';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';

import { TModalWindow } from './types';
import { positionConfig } from './config';
import { modalStyles, Title, ModalWrapper, ModalCloseButton } from './styled';

const ModalWindow: FC<TModalWindow> = ({
  position = 'center',
  isOpen,
  setIsOpen = () => {},
  isClosable = true,
  closeOnOverlayClick = true,
  onClose = () => {},
  children,
  $width = 'fit-content',
  padding = '1.75rem',
  rounded = false,
  title,
}) => {
  const onCloseActions = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <Modal
      style={{
        content: { ...modalStyles.content, ...positionConfig[position] },
        overlay: modalStyles.overlay,
      }}
      isOpen={isOpen}
      shouldCloseOnOverlayClick={closeOnOverlayClick}
      onRequestClose={() => {
        if (closeOnOverlayClick) {
          onCloseActions();
        }
      }}
      closeTimeoutMS={200}
      shouldReturnFocusAfterClose={false}
    >
      {isClosable && (
        <ModalCloseButton>
          <Button
            variant="hollow"
            size="small"
            iconType="only"
            icon={<Icon name="close" $color="white" />}
            onClick={onCloseActions}
            data-cy="close-button"
          />
        </ModalCloseButton>
      )}
      <ModalWrapper
        style={{
          width: $width,
          padding,
          borderRadius: rounded ? '1.875rem' : '0',
        }}
      >
        {title && (
          <Title data-testid="modal-title" data-cy="modal-title">
            {title}
          </Title>
        )}
        {children}
      </ModalWrapper>
    </Modal>
  );
};

Modal.setAppElement('body');

export default ModalWindow;
