import styled, { css, keyframes } from 'styled-components';

import { getMarginStyles } from 'public/styles/config/margin';

import { TLoaderWrapper, TSpinner } from './types';

export const LoaderWrapper = styled.div(
  ({ size }: TLoaderWrapper) => css`
    display: flex;
    align-items: center;
    justify-content: center;

    width: ${size.width};
    height: ${size.height};
    min-height: ${size.minHeight};
  `,
);

const spinnerFade = keyframes`
  0% {
    background-color: #c6c6c6;
  }
  100% {
    background-color: transparent;
  }
`;

export const Spinner = styled.div(
  ({ size, ...props }: TSpinner) => css`
    position: relative;

    display: inline-block;

    width: ${size}px;
    height: ${size}px;

    ${getMarginStyles(props)}

    div {
      position: absolute;
      bottom: 0;
      left: 47%;

      width: 6%;
      height: 25%;

      background-color: transparent;
      border-radius: 22%;

      transform-origin: center -100%;
      animation: ${spinnerFade} 1s infinite linear;
    }

    div:nth-child(1) {
      transform: rotate(0deg);
      animation-delay: 0s;
    }

    div:nth-child(2) {
      transform: rotate(30deg);
      animation-delay: 0.083s;
    }

    div:nth-child(3) {
      transform: rotate(60deg);
      animation-delay: 0.166s;
    }

    div:nth-child(4) {
      transform: rotate(90deg);
      animation-delay: 0.249s;
    }

    div:nth-child(5) {
      transform: rotate(120deg);
      animation-delay: 0.332s;
    }

    div:nth-child(6) {
      transform: rotate(150deg);
      animation-delay: 0.415s;
    }

    div:nth-child(7) {
      transform: rotate(180deg);
      animation-delay: 0.498s;
    }

    div:nth-child(8) {
      transform: rotate(210deg);
      animation-delay: 0.581s;
    }

    div:nth-child(9) {
      transform: rotate(240deg);
      animation-delay: 0.664s;
    }

    div:nth-child(10) {
      transform: rotate(270deg);
      animation-delay: 0.747s;
    }

    div:nth-child(11) {
      transform: rotate(300deg);
      animation-delay: 0.83s;
    }

    div:nth-child(12) {
      transform: rotate(330deg);
      animation-delay: 0.913s;
    }
  `,
);
