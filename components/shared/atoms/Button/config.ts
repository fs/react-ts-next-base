import theme from 'public/styles/theme';

import { TIconConfig, TShapeConfig, TSizeConfig, TVariantConfig } from './types';

export const backgroundConfig: TVariantConfig = {
  primary: {
    default: theme.colors.blue_500,
    hover: theme.colors.blue_400,
    focused: theme.colors.blue_500,
  },
  alert: {
    default: theme.colors.red_500,
    hover: theme.colors.red_400,
    focused: theme.colors.red_500,
  },
  hollow: {
    default: theme.colors.transparent,
    hover: theme.colors.transparent,
    focused: theme.colors.transparent,
  },
};

const defaultColor = theme.colors.white;
export const colorConfig: TVariantConfig = {
  primary: {
    default: defaultColor,
    hover: defaultColor,
    focused: defaultColor,
  },
  alert: {
    default: defaultColor,
    hover: defaultColor,
    focused: defaultColor,
  },
  hollow: {
    default: theme.colors.grey_500,
    hover: theme.colors.grey_400,
    focused: theme.colors.grey_500,
  },
};

const defaultTextDecoration = 'none';
export const textDecorationConfig: TVariantConfig = {
  primary: {
    default: defaultTextDecoration,
    hover: defaultTextDecoration,
    focused: defaultTextDecoration,
  },
  alert: {
    default: defaultTextDecoration,
    hover: defaultTextDecoration,
    focused: defaultTextDecoration,
  },
  hollow: {
    default: 'underline',
    hover: 'none',
    focused: 'underline',
  },
};

const defaultBorder = '0';
export const borderConfig: TVariantConfig = {
  primary: {
    default: defaultBorder,
    hover: defaultBorder,
    focused: defaultBorder,
  },
  alert: {
    default: defaultBorder,
    hover: defaultBorder,
    focused: defaultBorder,
  },
  hollow: {
    default: defaultBorder,
    hover: defaultBorder,
    focused: defaultBorder,
  },
};

const defaultShadow = 'none';
export const shadowConfig: TVariantConfig = {
  primary: {
    default: defaultShadow,
    hover: defaultShadow,
    focused: defaultShadow,
  },
  alert: {
    default: defaultShadow,
    hover: defaultShadow,
    focused: defaultShadow,
  },
  hollow: {
    default: defaultShadow,
    hover: defaultShadow,
    focused: defaultShadow,
  },
};

export const borderRadiusConfig: TShapeConfig = {
  none: '0',
  rounded: '0.375rem',
  'extra-rounded': '0.875rem',
  circle: '50%',
};

export const sizeConfig: TSizeConfig = {
  'extra-small': {
    height: '1.25rem',
    padding: '0 0.75rem',
    iconSize: '8px',
    loaderSize: 14,
    iconOnly: {
      width: '1.25rem',
      height: '1.25rem',
      iconSize: '8px',
    },
  },
  small: {
    height: '2.125rem',
    padding: '0 1rem',
    iconSize: '14px',
    loaderSize: 20,
    iconOnly: {
      width: '2.125rem',
      height: '2.125rem',
      iconSize: '16px',
    },
  },
  medium: {
    height: '2.5rem',
    padding: '0 1rem',
    iconSize: '16px',
    loaderSize: 26,
    iconOnly: {
      width: '2.5rem',
      height: '2.5rem',
      iconSize: '22px',
    },
  },
  large: {
    height: '2.75rem',
    padding: '0 1.25rem',
    iconSize: '18px',
    loaderSize: 26,
    iconOnly: {
      width: '2.75rem',
      height: '2.75rem',
      iconSize: '28px',
    },
  },
  'extra-large': {
    height: '3.125rem',
    padding: '0 1.5rem',
    iconSize: '28px',
    loaderSize: 32,
    iconOnly: {
      width: '4.5rem',
      height: '4.5rem',
      iconSize: '28px',
    },
  },
};

export const iconConfig: TIconConfig = {
  none: {
    margin: '',
  },
  leading: {
    margin: 'margin-right: 0.75rem',
  },
  trailing: {
    margin: 'margin-left: 0.75rem',
  },
  only: {
    margin: '',
  },
};
