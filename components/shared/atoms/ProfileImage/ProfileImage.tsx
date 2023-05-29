import { FC } from 'react';

import { Image, ImageWrapper } from './styled';
import { TProfileImage } from './types';

const ProfileImage: FC<TProfileImage> = ({ avatar, alt = 'Avatar' }) => {
  const defaultAvatar = `${process.env.ASSET_HOST}/images/avatar-placeholder.png`;
  return (
    <ImageWrapper>
      <Image alt={alt} src={avatar || defaultAvatar} />
    </ImageWrapper>
  );
};

export default ProfileImage;
