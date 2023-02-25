import React from 'react';
import ReactPlayer from 'react-player';
import NiceModal, { useModal } from '@ebay/nice-modal-react';

import ModalWindow from 'components/shared/atoms/ModalWindow/ModalWindow';

const VideoModal = NiceModal.create(({ url }) => {
  const { visible, hide } = useModal();

  return (
    <ModalWindow isOpen={visible} setIsOpen={hide} isClosable padding={0}>
      <ReactPlayer url={url} controls />
    </ModalWindow>
  );
});

export default VideoModal;
