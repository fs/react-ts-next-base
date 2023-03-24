import { css } from 'styled-components';
import { configColors } from 'public/styles/config/colors';
import { TIconBase } from './types';

export const getSizeStyles = ({ $size }: TIconBase) => {
  if ($size === 'fit') {
    return css`
      height: 100%;
    `;
  }
  if ($size) {
    return css`
      &&& {
        height: ${$size}px;
        width: ${$size}px;
        min-height: ${$size}px;
        min-width: ${$size}px;
      }
    `;
  }
  return css``;
};

export const getFillStyles = ({ $color = 'black' }: TIconBase) => {
  return css`
    & path {
      transition: fill 0.5s;
      fill: ${configColors[$color]};
    }
  `;
};

export const getRotateStyles = ({ $rotate = '0' }: TIconBase) => {
  return css`
    transition: transform 0.2s;
    transform: rotate(${$rotate});
  `;
};
