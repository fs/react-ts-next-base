import React from 'react';

import { TProfileImage } from './types';
import { ImageWrapper, Image } from './styled';

const ProfileImage: React.FC<TProfileImage> = ({ avatar, alt = 'Avatar', id }) => {
  const defaultAvatar = `${process.env.ASSET_HOST}/images/default-avatars/avatar-${
    Number.parseInt(id, 10) % 4
  }.svg`;
  return <ImageWrapper>{id && <Image alt={alt} src={avatar || defaultAvatar} />}</ImageWrapper>;
};

export default ProfileImage;
