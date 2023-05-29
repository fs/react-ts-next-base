import { HTMLAttributeAnchorTarget, HTMLAttributeReferrerPolicy, ReactNode } from 'react';
import { UrlObject } from 'url';

import { TMargin } from 'public/styles/config/margin';
import { ESize } from 'public/styles/config/size';
import { TWidth } from 'public/styles/config/width';

export enum EVariant {
  PRIMARY = 'primary',
  ALERT = 'alert',
  HOLLOW = 'hollow',
}

export enum EType {
  SUBMIT = 'submit',
  BUTTON = 'button',
  RESET = 'reset',
}

export enum EIconType {
  NONE = 'none',
  LEADING = 'leading',
  TRAILING = 'trailing',
  ONLY = 'only',
}

export enum EShape {
  NONE = 'none',
  ROUNDED = 'rounded',
  EXTRA_ROUNDED = 'extra-rounded',
  CIRCLE = 'circle',
}

export type TButton = TMargin &
  TWidth & {
    variant?: `${EVariant}`;
    testId?: string;
    disabled?: boolean;
    type?: `${EType}`;
    label?: string;
    iconType?: `${EIconType}`;
    icon?: ReactNode;
    size?: `${ESize}`;
    shape?: `${EShape}`;
    isLoading?: boolean;
    href?: UrlObject | string;
    target?: HTMLAttributeAnchorTarget;
    rel?: HTMLAttributeReferrerPolicy;
  };

export type TButtonStates = {
  default: string;
  hover: string;
  focused: string;
};
export type TVariantConfig = { [innerKey in EVariant]: TButtonStates };

export type TSizeStates = {
  height: string;
  padding: string;
  iconSize: string;
  loaderSize: number;
  iconOnly: {
    width: string;
    height: string;
    iconSize: string;
  };
};
export type TSizeConfig = { [innerKey in ESize]: TSizeStates };

export type TIconStates = {
  margin: string;
};
export type TIconConfig = { [innerKey in EIconType]: TIconStates };

export type TShapeConfig = { [innerKey in EShape]: string };

export type TButtonProps = TMargin &
  TWidth & {
    $backgroundColor: TButtonStates;
    $textColor: TButtonStates;
    $textDecoration: TButtonStates;
    $iconType: `${EIconType}`;
    $size: TSizeStates;
    $icon: TIconStates;
    $borderRadius: string;
    $border: TButtonStates;
    $boxShadow: TButtonStates;
    $isLoading: boolean;
  };

export type TSpinnerButtonProps = TMargin & {
  backgroundColor: TButtonStates;
};
