import { TFile } from 'config/types';

export type TCompanyConfirmationRecords = {
  attachmentRemoteUrl: string;
  url: string;
  attachment: TFile;
};

export type TAcceptFilesUploadProps = {
  name: string;
  setFieldValue?: (field: string, value: any) => void;
  values: {
    [key: string]: any;
    companyConfirmationRecords: TCompanyConfirmationRecords[];
  };
};
