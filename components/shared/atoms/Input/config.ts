import theme from 'public/styles/theme';

import { TVariantConfig, TBorderConfig, TPaddingConfig, TMarginConfig } from './types';

export const borderConfig: TBorderConfig = {
  default: {
    default: `border: 1px solid ${theme.colors.grey_200}`,
    error: `border: 1px solid ${theme.colors.grey_200}`,
  },
  secondary: {
    default: `border: 1px solid ${theme.colors.white}`,
    error: `border: 1px solid ${theme.colors.white}`,
  },
};

export const backgroundColorConfig: TVariantConfig = {
  default: theme.colors.white,
  secondary: theme.colors.white,
};

export const paddingConfig: TPaddingConfig = {
  default: {
    error: '0.15rem 0 0 0.5rem',
    input: '0.625rem 1rem',
  },
  secondary: {
    error: '0.15rem 0 0 0.5rem',
    input: '0.625rem 1rem',
  },
};

export const marginConfig: TMarginConfig = {
  default: 20,
  secondary: 20,
};

export const heightConfig: TVariantConfig = {
  default: '2.5rem',
  secondary: '2.5rem',
};

export const colorConfig: TVariantConfig = {
  default: theme.colors.black,
  secondary: theme.colors.white,
};
