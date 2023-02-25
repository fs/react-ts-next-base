import { TMargin } from 'public/styles/config/margin';

export enum EVariant {
  DEFAULT = 'default',
  SIMPLE = 'simple',
}

export type TLoader = TMargin & {
  variant?: `${EVariant}`;
  testId?: string;
  size?: number;
};

export type TVariantStates = {
  width: string;
  minHeight: string;
  height: string;
  spinner: number;
};

export type TVariantConfig = { [innerKey in EVariant]: TVariantStates };

export type TSpinner = {
  size?: number;
};

export type TLoaderWrapper = {
  size: TVariantStates;
};
