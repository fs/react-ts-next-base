import { css } from 'styled-components';

export type TMargin = {
  $ml?: number | 'auto';
  $mr?: number | 'auto';
  $mt?: number | 'auto';
  $mb?: number | 'auto';
};

export const getMarginStyles = ({ $ml = 0, $mr = 0, $mt = 0, $mb = 0 }: TMargin) => {
  return css`
    margin-right: ${$mr === 'auto' ? $mr : `${$mr}px`};
    margin-left: ${$ml === 'auto' ? $ml : `${$ml}px`};
    margin-bottom: ${$mb === 'auto' ? $mb : `${$mb}px`};
    margin-top: ${$mt === 'auto' ? $mt : `${$mt}px`};
  `;
};
