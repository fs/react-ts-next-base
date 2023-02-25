import { TSizeConfig, TShapeConfig } from './types';

export const sizeConfig: TSizeConfig = {
  'extra-small': {
    height: '1.5rem',
    iconSize: 10,
  },
  small: {
    height: '2.125rem',
    iconSize: 14,
  },
  medium: {
    height: '2.5rem',
    iconSize: 16,
  },
  large: {
    height: '2.75rem',
    iconSize: 18,
  },
  'extra-large': {
    height: '3.125rem',
    iconSize: 22,
  },
};

export const borderRadiusConfig: TShapeConfig = {
  none: '0',
  rounded: '0.375rem',
  'extra-rounded': '0.875rem',
};
