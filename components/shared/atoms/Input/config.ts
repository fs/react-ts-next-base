import theme from 'public/styles/theme';

import { TVariantConfig, TBorderConfig, TPaddingConfig, TMarginConfig } from './types';

export const borderConfig: TBorderConfig = {
  default: {
    default: `border: 1px solid ${theme.colors.greyCC}`,
    error: `border: 1px solid ${theme.colors.greyCC}`,
  },
  secondary: {
    default: `border: 1px solid ${theme.colors.white}`,
    error: `border: 1px solid ${theme.colors.white}`,
  },
  change: {
    default: `border: 1px solid ${theme.colors.orange}`,
    error: `border: 1px solid ${theme.colors.orange}`,
  },
  underlined: {
    default: `
    border: 0;
    border-bottom: 1px solid ${theme.colors.greyC4}`,
    error: `
    border: 0;
    border-bottom: 1px solid ${theme.colors.error}`,
  },
  'table-cell': {
    default: 'border: 0',
    error: 'border: 0',
  },
};

export const backgroundColorConfig: TVariantConfig = {
  default: theme.colors.white,
  secondary: theme.colors.blue4d,
  change: theme.colors.white,
  underlined: theme.colors.white,
  'table-cell': theme.colors.white,
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
  change: {
    error: '0.15rem 0 0 0.5rem',
    input: '0.625rem 1rem',
  },
  underlined: {
    error: '0.5rem 0 0',
    input: '0.5rem 0',
  },
  'table-cell': {
    error: '0',
    input: '0 1rem',
  },
};

export const marginConfig: TMarginConfig = {
  default: 20,
  secondary: 20,
  change: 20,
  underlined: 28,
  'table-cell': 0,
};

export const heightConfig: TVariantConfig = {
  default: '2.5rem',
  secondary: '2.5rem',
  change: '2.5rem',
  underlined: '2.5rem',
  'table-cell': '100%',
};

export const colorConfig: TVariantConfig = {
  default: theme.colors.black,
  secondary: theme.colors.white,
  change: theme.colors.black,
  underlined: theme.colors.black,
  'table-cell': theme.colors.black,
};
