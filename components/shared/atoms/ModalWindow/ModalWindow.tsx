import { FC } from 'react';
import Modal from 'react-modal';

import Button from 'components/shared/atoms/Button';
import Icon from 'components/shared/atoms/Icon';

import { ModalCloseButton, modalStyles, ModalWrapper, Title } from './styled';
import { TModalWindow } from './types';

const ModalWindow: FC<TModalWindow> = ({
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
        content: modalStyles.content,
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
            testId="close-button"
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
        {title && <Title data-testid="modal-title">{title}</Title>}
        {children}
      </ModalWrapper>
    </Modal>
  );
};

Modal.setAppElement('body');

export default ModalWindow;
