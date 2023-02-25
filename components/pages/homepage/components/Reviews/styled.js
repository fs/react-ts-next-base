import styled, { css } from 'styled-components';

export const ReviewList = styled.div(
  ({ theme: { colors } }) => css`
    .carousel-root {
      max-width: calc(100% - 2rem);
      margin-left: 1rem;

      .slider-wrapper {
        padding: 1rem 0;
      }

      .control-prev.control-arrow {
        opacity: 1;

        &::before {
          border: solid ${colors.greyB6};
          border-width: 0 4px 4px 0;
          display: inline-block;
          padding: 0.6rem;
          transform: rotate(135deg);
        }

        &:hover {
          background: white;
        }
      }

      .control-next.control-arrow {
        opacity: 1;
        &::before {
          border: solid ${colors.greyB6};
          border-width: 0 4px 4px 0;
          display: inline-block;
          padding: 0.6rem;
          transform: rotate(-45deg);
        }

        &:hover {
          background: white;
        }
      }
    }
  `,
);

export const ReviewWrapper = styled.div`
  width: calc(100% - 6rem);
  margin-left: 3rem;
`;
