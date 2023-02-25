import { TUploadedFile } from 'config/types';

export enum EFormat {
  photo = 'photo',
  pdf = 'pdf',
  video = 'video',
}

export type TFileInput = {
  name: string;
  testId?: string;
  action: (uploadedFiles: TUploadedFile[]) => void;
  multiple?: boolean;
  setLoading?: (loading: boolean) => void;
  format?: `${EFormat}`[];
  disabled?: boolean;
  limitUpload?: number;
};
