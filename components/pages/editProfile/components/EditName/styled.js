import styled, { css } from 'styled-components';

export const Wrapper = styled.div(
  ({ theme: { colors, between, down, heightBreakpoints } }) => css`
    position: relative;
    margin: 1.8rem 0 0;
    display: flex;
    flex-direction: column;
    width: 100%;

    &::after {
      border: 1px solid ${colors.lightGreen};
      margin: 2rem auto 0;
      width: 2.5rem;
      content: '';
    }

    ${between(heightBreakpoints.sm, heightBreakpoints.md, true)} {
      margin: 0.9rem 0 0;

      &::after {
        margin: 1rem auto 0;
      }
    }

    ${between(heightBreakpoints.xs, heightBreakpoints.sm, true)} {
      margin: 0.55rem 0 0;

      &::after {
        margin: 0.75rem auto 0;
      }
    }

    ${down(heightBreakpoints.xs, true)} {
      margin: 0.45rem 0 0;

      &::after {
        margin: 0.55rem auto 0;
      }
    }

    div:has(> input) {
      height: 2rem;
    }
  `,
);

export const InputsWrapper = styled.div(
  ({ theme: { heightBreakpoints, between, down } }) => css`
    ${between(heightBreakpoints.xs, heightBreakpoints.sm, true)} {
      > div {
        height: 2.25rem;
      }
    }

    ${down(heightBreakpoints.xs, true)} {
      > div {
        height: 1.75rem;
      }
    }
  `,
);
