import styled, { css } from 'styled-components';

export const RightColWrapper = styled.div(
  ({ theme: { breakpoints, heightBreakpoints, down, between } }) => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    padding: 3.5rem 3.125rem;
    overflow: hidden auto;

    ${between(heightBreakpoints.xs, heightBreakpoints.sm, true)} {
      padding: 1.5rem 3.125rem;
    }

    ${down(heightBreakpoints.xs, true)} {
      padding: 0.75rem 3.125rem;
    }

    ${down(breakpoints.md)} {
      padding: 0.75rem 3.125rem;
    }
  `,
);
