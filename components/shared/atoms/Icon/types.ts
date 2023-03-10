import { ColorKeys } from 'public/styles/config/colors';
import { TMargin } from 'public/styles/config/margin';
import { IconKeys } from './config';

export type TIconBase = TMargin & {
  $size?: number | 'fit';
  $color?: ColorKeys;
  $rotate?: string;
};

export type TIcon = TIconBase & {
  name: IconKeys;
};
