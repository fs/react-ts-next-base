import styled, { keyframes, css } from 'styled-components';

import { getMarginStyles } from 'public/styles/config/margin';

import { TLoaderWrapper, TSpinner } from './types';

export const LoaderWrapper = styled.div(
  ({ size }: TLoaderWrapper) => css`
    display: flex;
    justify-content: center;
    align-items: center;

    width: ${size.width};
    min-height: ${size.minHeight};
    height: ${size.height};
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
    width: ${size}px;
    height: ${size}px;
    position: relative;
    display: inline-block;

    ${getMarginStyles(props)}

    div {
      position: absolute;
      left: 47%;
      bottom: 0;
      width: 6%;
      height: 25%;
      border-radius: 22%;
      background-color: transparent;
      transform-origin: center -100%;
      animation: ${spinnerFade} 1s infinite linear;
    }

    div:nth-child(1) {
      animation-delay: 0s;
      transform: rotate(0deg);
    }

    div:nth-child(2) {
      animation-delay: 0.083s;
      transform: rotate(30deg);
    }

    div:nth-child(3) {
      animation-delay: 0.166s;
      transform: rotate(60deg);
    }

    div:nth-child(4) {
      animation-delay: 0.249s;
      transform: rotate(90deg);
    }

    div:nth-child(5) {
      animation-delay: 0.332s;
      transform: rotate(120deg);
    }

    div:nth-child(6) {
      animation-delay: 0.415s;
      transform: rotate(150deg);
    }

    div:nth-child(7) {
      animation-delay: 0.498s;
      transform: rotate(180deg);
    }

    div:nth-child(8) {
      animation-delay: 0.581s;
      transform: rotate(210deg);
    }

    div:nth-child(9) {
      animation-delay: 0.664s;
      transform: rotate(240deg);
    }

    div:nth-child(10) {
      animation-delay: 0.747s;
      transform: rotate(270deg);
    }

    div:nth-child(11) {
      animation-delay: 0.83s;
      transform: rotate(300deg);
    }

    div:nth-child(12) {
      animation-delay: 0.913s;
      transform: rotate(330deg);
    }
  `,
);
