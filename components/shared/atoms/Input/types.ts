import { ReactNode } from 'react';
import { TMargin } from 'public/styles/config/margin';
import { TWidth } from 'public/styles/config/width';

export enum EVariant {
  DEFAULT = 'default',
  SECONDARY = 'secondary',
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
    inputHeight: string;
    backgroundColor: string;
    textAlign: `${ETextAlign}`;
    textColor: string;
    type: string;
  };

export type TBorderStates = {
  default: string;
  error: string;
};
export type TBorderConfig = { [innerKey in EVariant]: TBorderStates };

export type TMarginConfig = { [innerKey in EVariant]: number };

export type TVariantConfig = { [innerKey in EVariant]: string };
