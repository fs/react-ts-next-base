import { ColorKeys } from 'public/styles/config/colors';
import { TWidth } from 'public/styles/config/width';

export enum EVariant {
  default = 'default',
  light = 'light',
}

export type TOption = { value: string; label: string };

export type TSelectStyled = {
  backgroundColor: ColorKeys;
};

export type TVariantConfig = {
  [innerKey in EVariant]: ColorKeys;
};

export type TSorter = TWidth & {
  options: TOption[];
  variant?: `${EVariant}`;
};
