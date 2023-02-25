import { ReactNode } from 'react';
import { TMargin } from 'public/styles/config/margin';
import { TWidth } from 'public/styles/config/width';

export enum EVariant {
  DEFAULT = 'default',
  SECONDARY = 'secondary',
  CHANGE = 'change',
  UNDERLINED = 'underlined',
  TABLE_CELL = 'table-cell',
}

export enum ETextAlign {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
}

export enum EIconType {
  NONE = 'none',
  LEADING = 'leading',
  TRAILING = 'trailing',
}

export type TInput = TMargin &
  TWidth & {
    variant?: `${EVariant}`;
    name: string;
    testId?: string;
    rounded?: boolean;
    textAlign?: `${ETextAlign}`;
    iconType?: `${EIconType}`;
    icon?: ReactNode;
  };

export type InputWrapperProps = {
  border: string;
  rounded: boolean;
  backgroundColor: string;
  disabled: boolean;
};

export type FieldWrapperProps = TMargin &
  TWidth & {
    padding: string;
    inputHeight: string;
    backgroundColor: string;
    textAlign: `${ETextAlign}`;
    textColor: string;
    type: string;
  };

export type ErrorWrapperProps = {
  padding: string;
};

export type TBorderStates = {
  default: string;
  error: string;
};
export type TBorderConfig = { [innerKey in EVariant]: TBorderStates };

export type TPaddingStates = {
  error: string;
  input: string;
};
export type TPaddingConfig = { [innerKey in EVariant]: TPaddingStates };

export type TMarginConfig = { [innerKey in EVariant]: number };

export type TTextAlign = { [innerKey in ETextAlign]: string };

export type TVariantConfig = { [innerKey in EVariant]: string };
