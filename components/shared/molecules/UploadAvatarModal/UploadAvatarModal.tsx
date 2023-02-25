import React from 'react';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';
import ModalWindow from 'components/shared/atoms/ModalWindow';
import NiceModal, { useModal } from '@ebay/nice-modal-react';

import CropAvatar from './components/CropAvatarModal';
import { TUploadAvatarModal } from './types';
import { ModalWrapper, FileInput, AddPhoto, Text, ButtonWrapper } from './styled';

const UploadAvatarModal = NiceModal.create<TUploadAvatarModal>(({ onSubmit, rounded = true }) => {
  const { visible, remove } = useModal();
  const cropAvatarModal = useModal(CropAvatar);

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { validity, files },
    } = event;
    const [file] = files || [];

    if (validity.valid) {
      remove();
      cropAvatarModal.show({
        avatar: file,
        temporaryUrl: URL.createObjectURL(file),
        onSubmit,
        rounded,
      });
    }
  };

  return (
    <ModalWindow isOpen={visible} setIsOpen={remove}>
      <ModalWrapper>
        <AddPhoto>
          <Icon name="camera-add" $color="greyCC" $size={48} />
          <Text data-testid="edit-avatar-modal-title">
            Перетащите фотографии сюда <br />
            или кликните чтобы выбрать
          </Text>
          <FileInput
            accept="image/png, image/jpeg, image/webp"
            type="file"
            name="load-avatar-input"
            data-testid="load-avatar-input"
            data-cy="load-avatar-input"
            onChange={handleAvatarChange}
          />
        </AddPhoto>
        <ButtonWrapper noPhotos>
          <span>или</span>
          <Button testId="add-photo-button">
            Загрузите фото
            <FileInput
              accept="image/png, image/jpeg, image/webp"
              type="file"
              name="load-avatar-input-button"
              data-testid="load-avatar-input-button"
              onChange={handleAvatarChange}
            />
          </Button>
        </ButtonWrapper>
      </ModalWrapper>
    </ModalWindow>
  );
});

export default UploadAvatarModal;
