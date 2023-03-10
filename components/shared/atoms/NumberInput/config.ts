import theme from 'public/styles/theme';
import { TVariantConfig, TVariantFlag } from './types';

export const borderConfig: TVariantConfig = {
  default: `border: 1px solid ${theme.colors.grey_500}`,
  table_cell: 'border: none',
};

export const paddingConfig: TVariantConfig = {
  default: 'padding: 0.625rem 1rem',
  table_cell: 'padding: 0 1rem',
};

export const heightConfig: TVariantConfig = {
  default: '2.5rem',
  table_cell: '100%',
};

export const showTitle: TVariantFlag = {
  default: true,
  table_cell: false,
};

export const showErrorMessage: TVariantFlag = {
  default: true,
  table_cell: false,
};
