import * as icons from './assets';

export const configIcons = {
  'arrow-chevron-left': icons.ArrowChevronLeft,
  'arrow-chevron-right': icons.ArrowChevronRight,
  'eye-closed': icons.EyeClosed,
  close: icons.Close,
  eye: icons.Eye,
  plus: icons.Plus,
  minus: icons.Minus,
};
export type IconKeys = keyof typeof configIcons;
