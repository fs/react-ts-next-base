import { FormikHelpers } from 'formik';
import { TFile, TUploadedFile } from 'config/types';

export type TSupportRequestModal = {
  initialSubject?: string;
  orderId?: string;
  onSubmitRequest?: () => void;
};

export type TFormValues = {
  email?: string;
  subject: string;
  message: string;
};

export type TSupportRequestForm = {
  onSubmit: (values: TFormValues, formHelpers: FormikHelpers<TFormValues>) => Promise<void>;
  onRemovePhoto: (imageId: string) => void;
  onAddPhoto: (uploadedFiles: TUploadedFile[]) => void;
  temporaryUrls: Array<TFile>;
  isGuest?: boolean;
  initialSubject: string;
};
