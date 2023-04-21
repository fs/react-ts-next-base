import { FC } from 'react';

import { TProfileImage } from './types';
import { ImageWrapper, Image } from './styled';

const ProfileImage: FC<TProfileImage> = ({ avatar, alt = 'Avatar' }) => {
  const defaultAvatar = `${process.env.ASSET_HOST}/images/avatar-placeholder.png`;
  return (
    <ImageWrapper>
      <Image alt={alt} src={avatar || defaultAvatar} />
    </ImageWrapper>
  );
};

export default ProfileImage;
