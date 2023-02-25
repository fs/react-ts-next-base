import React from 'react';

import { useModal } from '@ebay/nice-modal-react';
import { useUpdateUserAvatar } from 'lib/apollo/hooks/actions/currentUser';

import ProfileImage from 'components/shared/atoms/ProfileImage';
import UploadAvatarModal from 'components/shared/molecules/UploadAvatarModal';
import useNotifier from 'hooks/useNotifier';

import { ChangeAvatarLink, ImageWrapper, Subscription, Wrapper } from './styled';

const EditAvatar = ({ user }) => {
  const { avatarUrl, id } = user || {};
  const [updateAvatar] = useUpdateUserAvatar();

  const { setError } = useNotifier();

  const onSubmit = async uploadedAvatar => {
    try {
      await updateAvatar(uploadedAvatar);
    } catch (error) {
      setError(error);
    }
  };

  const cropAvatarModal = useModal(UploadAvatarModal);
  const openCropAvatarModal = () => cropAvatarModal.show({ onSubmit });

  return (
    <Wrapper>
      <ImageWrapper>
        <ProfileImage avatar={avatarUrl} id={id} />
      </ImageWrapper>

      <ChangeAvatarLink data-testid="edit-avatar-button" onClick={openCropAvatarModal}>
        Изменить фотографию
      </ChangeAvatarLink>

      <Subscription>
        Фотография персонализирует
        <br /> ваш аккаунт
      </Subscription>
    </Wrapper>
  );
};

export default EditAvatar;
