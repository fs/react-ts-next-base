import { TFile } from 'config/types';

export type TVariantImagesProps = {
  name: string;
  index: string;
  readOnly: boolean;
  title: string;
  readOnlyTitle: string;
  documentFormats: any;
  variantImages: { image: TFile }[];
};
