import { TVariantConfig } from './types';

export const sizeConfig: TVariantConfig = {
  default: {
    width: '100%',
    minHeight: '16rem',
    height: '100%',
    spinner: 45,
  },
  simple: {
    width: 'fit-content',
    minHeight: 'fit-content',
    height: 'fit-content',
    spinner: 26,
  },
};
