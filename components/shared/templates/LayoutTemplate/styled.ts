import styled, { css } from 'styled-components';
import { TContentProps } from './types';

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: calc(var(--vh) * 100);
  overflow: hidden;
`;

export const Content = styled.div<TContentProps>(
  ({ theme: { colors }, isMenuOpened, isShowScroll }) => css`
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    transition-delay: 75ms;
    transition-duration: 700ms;
    transform: ${isMenuOpened ? `translateX(-15rem) scale(0.9)` : `translateX(0) scale(1)`};
    overflow-y: scroll;
    overflow-x: hidden;
    background: ${colors.darkBlue} url(${process.env.ASSET_HOST}/images/auth-bg.png) center
      no-repeat;
    background-size: cover;

    ${!isShowScroll &&
    css`
      scroll-behavior: smooth;
      -ms-overflow-style: none;
      scrollbar-width: none;

      &::-webkit-scrollbar {
        display: none;
      }
    `}
  `,
);
