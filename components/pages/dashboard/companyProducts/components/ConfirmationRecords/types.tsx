import { TFile } from 'config/types';

export type TConfirmationRecordsProps = {
  readOnly?: boolean;
  productConfirmationRecords: { attachment: TFile }[];
  setFieldValue?: (field: string, value: any) => void;
};
