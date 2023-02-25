import React from 'react';

import { useModal } from '@ebay/nice-modal-react';
import { useUpdateUserAvatar } from 'lib/apollo/hooks/actions/currentUser';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';
import ProfileImage from 'components/shared/atoms/ProfileImage';
import UploadAvatarModal from 'components/shared/molecules/UploadAvatarModal';

import { AdminAvatarWrapper, ImageWrapper, EditIconWrapper } from './styled';

const EditAdminAvatar = ({ user }) => {
  const { avatarUrl, id } = user || {};

  const [updateAvatar] = useUpdateUserAvatar();

  const onSubmit = async uploadedAvatar => {
    await updateAvatar(uploadedAvatar);
  };

  const cropAvatarModal = useModal(UploadAvatarModal);

  const openCropAvatarModal = () => cropAvatarModal.show({ onSubmit });

  return (
    <AdminAvatarWrapper>
      <ImageWrapper>
        <ProfileImage avatar={avatarUrl} id={id} />
        <EditIconWrapper>
          <Button
            shape="circle"
            icon={<Icon name="pencil" $color="grey" $size={11} />}
            iconType="only"
            variant="hollow"
            onClick={openCropAvatarModal}
          />
        </EditIconWrapper>
      </ImageWrapper>
    </AdminAvatarWrapper>
  );
};

export default EditAdminAvatar;
