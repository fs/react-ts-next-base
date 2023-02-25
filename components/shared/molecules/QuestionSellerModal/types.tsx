import { TFile } from 'config/types';

export type TQuestionPhotosProps = {
  setFieldValue: (field: string, value: any) => void;
  values: { photos: TFile[] };
};
