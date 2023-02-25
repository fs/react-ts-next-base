import theme from 'public/styles/theme';
import { TVariantConfig, TSizeConfig, TIconConfig, TShapeConfig } from './types';

export const backgroundConfig: TVariantConfig = {
  primary: {
    default: theme.colors.blue,
    hover: theme.colors.blue49,
    focused: theme.colors.blue,
  },
  secondary: {
    default: theme.colors.blue49,
    hover: theme.colors.blue72,
    focused: theme.colors.blue49,
  },
  neutral: {
    default: theme.colors.grey,
    hover: theme.colors.greyA3,
    focused: theme.colors.grey,
  },
  confirm: {
    default: theme.colors.green,
    hover: theme.colors.green2B,
    focused: theme.colors.green,
  },
  change: {
    default: theme.colors.orange,
    hover: theme.colors.orangeFF,
    focused: theme.colors.orange,
  },
  alert: {
    default: theme.colors.error,
    hover: theme.colors.redE5,
    focused: theme.colors.error,
  },
  hollow: {
    default: theme.colors.transparent,
    hover: theme.colors.transparent,
    focused: theme.colors.transparent,
  },
  'hollow-primary': {
    default: theme.colors.transparent,
    hover: theme.colors.transparent,
    focused: theme.colors.transparent,
  },
  'hollow-change': {
    default: theme.colors.transparent,
    hover: theme.colors.transparent,
    focused: theme.colors.transparent,
  },
  ghost: {
    default: `${theme.colors.white}30`,
    hover: `${theme.colors.white}50`,
    focused: `${theme.colors.white}30`,
  },
  shadowed: {
    default: theme.colors.white,
    hover: theme.colors.white,
    focused: theme.colors.white,
  },
  'dashed-primary': {
    default: theme.colors.white,
    hover: theme.colors.white,
    focused: theme.colors.white,
  },
  'outlined-confirm': {
    default: theme.colors.white,
    hover: theme.colors.white,
    focused: theme.colors.white,
  },
  'outlined-secondary': {
    default: theme.colors.blue49,
    hover: theme.colors.blue72,
    focused: theme.colors.blue49,
  },
  'outlined-neutral': {
    default: theme.colors.white,
    hover: theme.colors.white,
    focused: theme.colors.white,
  },
  'outlined-primary': {
    default: theme.colors.white,
    hover: theme.colors.white,
    focused: theme.colors.white,
  },
};

const defaultColor = theme.colors.white;
export const colorConfig: TVariantConfig = {
  primary: {
    default: defaultColor,
    hover: defaultColor,
    focused: defaultColor,
  },
  secondary: {
    default: defaultColor,
    hover: defaultColor,
    focused: defaultColor,
  },
  neutral: {
    default: defaultColor,
    hover: defaultColor,
    focused: defaultColor,
  },
  confirm: {
    default: defaultColor,
    hover: defaultColor,
    focused: defaultColor,
  },
  change: {
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
    default: theme.colors.grey,
    hover: theme.colors.greyA3,
    focused: theme.colors.grey,
  },
  'hollow-primary': {
    default: theme.colors.blue,
    hover: theme.colors.blue49,
    focused: theme.colors.blue,
  },
  'hollow-change': {
    default: theme.colors.orange,
    hover: theme.colors.orangeFF,
    focused: theme.colors.orange,
  },
  ghost: {
    default: defaultColor,
    hover: defaultColor,
    focused: defaultColor,
  },
  shadowed: {
    default: theme.colors.grey,
    hover: theme.colors.greyA3,
    focused: theme.colors.grey,
  },
  'dashed-primary': {
    default: theme.colors.blue,
    hover: theme.colors.blue00,
    focused: theme.colors.blue,
  },
  'outlined-confirm': {
    default: theme.colors.green,
    hover: theme.colors.green2B,
    focused: theme.colors.green,
  },
  'outlined-secondary': {
    default: defaultColor,
    hover: defaultColor,
    focused: defaultColor,
  },
  'outlined-neutral': {
    default: theme.colors.grey,
    hover: theme.colors.grey,
    focused: theme.colors.grey,
  },
  'outlined-primary': {
    default: theme.colors.blue,
    hover: theme.colors.blue00,
    focused: theme.colors.blue,
  },
};

const defaultTextDecoration = 'none';
export const textDecorationConfig: TVariantConfig = {
  primary: {
    default: defaultTextDecoration,
    hover: defaultTextDecoration,
    focused: defaultTextDecoration,
  },
  secondary: {
    default: defaultTextDecoration,
    hover: defaultTextDecoration,
    focused: defaultTextDecoration,
  },
  neutral: {
    default: defaultTextDecoration,
    hover: defaultTextDecoration,
    focused: defaultTextDecoration,
  },
  confirm: {
    default: defaultTextDecoration,
    hover: defaultTextDecoration,
    focused: defaultTextDecoration,
  },
  change: {
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
  'hollow-primary': {
    default: 'underline',
    hover: 'none',
    focused: 'underline',
  },
  'hollow-change': {
    default: 'underline',
    hover: 'none',
    focused: 'underline',
  },
  ghost: {
    default: defaultTextDecoration,
    hover: defaultTextDecoration,
    focused: defaultTextDecoration,
  },
  shadowed: {
    default: defaultTextDecoration,
    hover: defaultTextDecoration,
    focused: defaultTextDecoration,
  },
  'dashed-primary': {
    default: defaultTextDecoration,
    hover: defaultTextDecoration,
    focused: defaultTextDecoration,
  },
  'outlined-confirm': {
    default: defaultTextDecoration,
    hover: defaultTextDecoration,
    focused: defaultTextDecoration,
  },
  'outlined-secondary': {
    default: defaultTextDecoration,
    hover: defaultTextDecoration,
    focused: defaultTextDecoration,
  },
  'outlined-neutral': {
    default: defaultTextDecoration,
    hover: defaultTextDecoration,
    focused: defaultTextDecoration,
  },
  'outlined-primary': {
    default: defaultTextDecoration,
    hover: defaultTextDecoration,
    focused: defaultTextDecoration,
  },
};

const defaultBorder = '0';
export const borderConfig: TVariantConfig = {
  primary: {
    default: defaultBorder,
    hover: defaultBorder,
    focused: defaultBorder,
  },
  secondary: {
    default: defaultBorder,
    hover: defaultBorder,
    focused: defaultBorder,
  },
  neutral: {
    default: defaultBorder,
    hover: defaultBorder,
    focused: defaultBorder,
  },
  confirm: {
    default: defaultBorder,
    hover: defaultBorder,
    focused: defaultBorder,
  },
  change: {
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
  'hollow-primary': {
    default: defaultBorder,
    hover: defaultBorder,
    focused: defaultBorder,
  },
  'hollow-change': {
    default: defaultBorder,
    hover: defaultBorder,
    focused: defaultBorder,
  },
  ghost: {
    default: `1px solid ${theme.colors.white}`,
    hover: `1px solid ${theme.colors.white}`,
    focused: `1px solid ${theme.colors.white}`,
  },
  shadowed: {
    default: defaultBorder,
    hover: defaultBorder,
    focused: defaultBorder,
  },
  'dashed-primary': {
    default: `1px dashed ${theme.colors.blue}`,
    hover: `1px dashed ${theme.colors.blue00}`,
    focused: `1px dashed ${theme.colors.blue}`,
  },
  'outlined-confirm': {
    default: `1px solid ${theme.colors.green}`,
    hover: `1px solid ${theme.colors.green2B}`,
    focused: `1px solid ${theme.colors.green}`,
  },
  'outlined-secondary': {
    default: `1px solid ${theme.colors.white}`,
    hover: `1px solid ${theme.colors.white}`,
    focused: `1px solid ${theme.colors.white}`,
  },
  'outlined-neutral': {
    default: `1px solid ${theme.colors.greyC4}`,
    hover: `1px solid ${theme.colors.greyA4}`,
    focused: `1px solid ${theme.colors.greyC4}`,
  },
  'outlined-primary': {
    default: `1px solid ${theme.colors.blue}`,
    hover: `1px solid ${theme.colors.blue00}`,
    focused: `1px solid ${theme.colors.blue}`,
  },
};

const defaultShadow = 'none';
export const shadowConfig: TVariantConfig = {
  primary: {
    default: defaultShadow,
    hover: defaultShadow,
    focused: defaultShadow,
  },
  secondary: {
    default: defaultShadow,
    hover: defaultShadow,
    focused: defaultShadow,
  },
  neutral: {
    default: defaultShadow,
    hover: defaultShadow,
    focused: defaultShadow,
  },
  confirm: {
    default: defaultShadow,
    hover: defaultShadow,
    focused: defaultShadow,
  },
  change: {
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
  'hollow-primary': {
    default: defaultShadow,
    hover: defaultShadow,
    focused: defaultShadow,
  },
  'hollow-change': {
    default: defaultShadow,
    hover: defaultShadow,
    focused: defaultShadow,
  },
  ghost: {
    default: defaultShadow,
    hover: defaultShadow,
    focused: defaultShadow,
  },
  shadowed: {
    default: `0px 0px 4px ${theme.colors.grey}`,
    hover: `0px 0px 4px ${theme.colors.greyA3}`,
    focused: `0px 0px 4px ${theme.colors.grey}`,
  },
  'dashed-primary': {
    default: defaultShadow,
    hover: defaultShadow,
    focused: defaultShadow,
  },
  'outlined-confirm': {
    default: defaultShadow,
    hover: defaultShadow,
    focused: defaultShadow,
  },
  'outlined-secondary': {
    default: defaultShadow,
    hover: defaultShadow,
    focused: defaultShadow,
  },
  'outlined-neutral': {
    default: defaultShadow,
    hover: defaultShadow,
    focused: defaultShadow,
  },
  'outlined-primary': {
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
