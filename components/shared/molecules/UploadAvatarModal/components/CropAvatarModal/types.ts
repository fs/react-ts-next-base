import { Uploader } from 'graphql/types';

export type TCanvasStyles = {
  height: number;
  width: number;
};

export type TCropAvatarModal = {
  onSubmit: (data: Uploader, url: string) => void;
  avatar?: File;
  temporaryUrl: string;
  rounded: boolean;
};
