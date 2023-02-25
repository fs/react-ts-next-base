import theme from 'public/styles/theme';
import { TSizeConfig, TVariantConfig } from './types';

export const borderConfig: TVariantConfig = {
  default: `1px solid ${theme.colors.greyCC}`,
  'table-cell': '0',
};

export const sizeConfig: TSizeConfig = {
  'extra-small': {
    height: '1.25rem',
  },
  small: {
    height: '2.125rem',
  },
  medium: {
    height: '2.5rem',
  },
  large: {
    height: '2.75rem',
  },
  'extra-large': {
    height: '3.125rem',
  },
};
