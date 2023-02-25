import styled, { css } from 'styled-components';

export const Wrapper = styled.div(
  ({ theme: { heightBreakpoints, down, between } }) => css`
    position: relative;
    margin: 1.8rem 0 0;
    width: 100%;

    ${between(heightBreakpoints.sm, heightBreakpoints.md, true)} {
      margin: 0.9rem 0 0;
    }

    ${down(heightBreakpoints.sm, true)} {
      margin: 0.55rem 0 0;
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

export const PasswordRules = styled.div(
  ({ theme: { colors } }) => css`
    color: ${colors.white};
    text-align: center;
    font-size: 0.875rem;
    margin: 0.7rem 0;
  `,
);
