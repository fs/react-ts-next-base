import theme from 'public/styles/theme';
import { TDelimiterConfig, TVariantConfig, TVariantStatesConfig } from './types';

export const textSizeConfig: TVariantConfig = {
  default: '0.875rem',
  flat: '1rem',
  link_like: '1rem',
};

export const frontWeightConfig: TVariantStatesConfig = {
  default: {
    active: '700',
    inactive: '700',
  },
  flat: {
    active: '400',
    inactive: '400',
  },
  link_like: {
    active: '700',
    inactive: '400',
  },
};

export const colorConfig: TVariantStatesConfig = {
  default: {
    active: theme.colors.black,
    inactive: theme.colors.grey,
  },
  flat: {
    active: theme.colors.blue,
    inactive: theme.colors.grey,
  },
  link_like: {
    active: theme.colors.black,
    inactive: theme.colors.black,
  },
};

export const backgroundConfig: TVariantStatesConfig = {
  default: {
    active: theme.colors.white,
    inactive: theme.colors.greyF1,
  },
  flat: {
    active: theme.colors.white,
    inactive: theme.colors.white,
  },
  link_like: {
    active: theme.colors.white,
    inactive: theme.colors.white,
  },
};

export const borderConfig: TVariantStatesConfig = {
  default: {
    active: `
    border-top: 3px solid transparent;
    border-bottom: 3px solid ${theme.colors.blue}`,
    inactive: `
    border-top: 3px solid transparent;
    border-bottom: 3px solid ${theme.colors.greyF1}`,
  },
  flat: {
    active: `border-bottom: 2px solid ${theme.colors.blue}`,
    inactive: `border-bottom: 2px solid ${theme.colors.greyC4}`,
  },
  link_like: {
    active: `border-bottom: 6px solid ${theme.colors.blue}`,
    inactive: `border-bottom: 6px solid ${theme.colors.white}`,
  },
};

export const gapConfig: TVariantConfig = {
  default: '0',
  flat: '0',
  link_like: '3rem',
};

export const flexConfig: TVariantConfig = {
  default: '1 1 0',
  flat: '1 1 0',
  link_like: '0 1 auto',
};

export const delimiterConfig: TDelimiterConfig = {
  default: true,
  flat: false,
  link_like: false,
};
