import { ColorKeys } from 'public/styles/config/colors';
import { TWidth } from 'public/styles/config/width';

export type TOption = {
  value: string;
  label: string;
};

export enum EVariant {
  default = 'default',
  light = 'light',
}

export type TVariantConfig = {
  [innerKey in EVariant]: ColorKeys;
};

export type TStylesProps = {
  backgroundColor: ColorKeys;
};

export type TMultiSelect = TWidth & {
  name: string;
  options: TOption[];
  labelAll?: string;
  selected: string[];
  onChange: (params?: string) => void;
  variant?: `${EVariant}`;
};
