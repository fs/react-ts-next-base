import { Uploader } from 'graphql/types';

export type TUploadAvatarModal = {
  onSubmit: (uploadedLogo: Uploader) => void;
  rounded?: boolean;
};

export type TButtonWrapper = {
  noPhotos: boolean;
};
