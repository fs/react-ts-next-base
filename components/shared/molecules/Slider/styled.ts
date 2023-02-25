import styled, { css } from 'styled-components';
import { getMarginStyles } from 'public/styles/config/margin';

import { TCarouselWrapper } from './types';

export const CarouselWrapper = styled.div<TCarouselWrapper>(
  ({ theme: { colors }, $width, ...props }) => css`
  ${getMarginStyles(props)};

    .carousel.carousel-slider {
      padding: 0 0 2rem 0;

      .slider-wrapper {
        width: ${$width};
        margin: 0 auto;

        .slider {
          display: flex;
        }
      }
    }

    .control-dots {
      display: flex;
      gap: 1rem;
      width: auto;
      margin: 0;
      flex-direction: row;
      top: auto;
      left: 50%;
      bottom: 0;
      transform: translate(-50%, 0);

      .dot {
        position: relative;
        background-color: transparent;
        border: 1px solid ${colors.grey};
        border-radius: 50%;
        width: 1.25rem;
        height: 1.25rem;
        margin: 0;
        cursor: pointer;
        opacity: 1;
        box-shadow: none;
        transition: 0.2s background-color, 0.2s border;

        &.selected {
          background-color: ${colors.blue};
          border: 1px solid transparent;
        }

        &:not(.selected)::before {
          display: block;
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0.4rem;
          height: 0.4rem;
          border-radius: 50%;
          background: ${colors.grey};
          content: '';
          transform: translate(-50%, -50%);
        }

      }
  `,
);
