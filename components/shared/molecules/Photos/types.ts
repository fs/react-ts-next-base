import { TFile } from 'config/types';
import { TMargin } from 'public/styles/config/margin';

export type TPhotos = TMargin & {
  onRemovePhoto?: (id: string) => void;
  onReorderPhoto?: (list: TFile[]) => void;
  images?: TFile[];
  loading?: boolean;
  editable?: boolean;
  zoomable?: boolean;
  draggable?: boolean;
  testId?: string;
};

export type TPhoto = {
  name: string;
  url: string;
  onRemovePhoto?: (id: string) => void;
  editable?: boolean;
  zoomable?: boolean;
  fileName?: string;
  aviFileCount?: number;
};
