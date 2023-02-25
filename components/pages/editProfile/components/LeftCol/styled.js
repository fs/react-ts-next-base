import styled, { css } from 'styled-components';

export const LeftColWrapper = styled.div(
  ({ theme: { colors, breakpoints, heightBreakpoints, between, down } }) => css`
    min-width: 24.5rem;
    background-color: ${colors.blue00};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 2rem 5rem;
    overflow: hidden auto;

    ${between(heightBreakpoints.sm, heightBreakpoints.md, true)} {
      padding: 1.35rem 5rem;
    }

    ${between(heightBreakpoints.xs, heightBreakpoints.sm, true)} {
      padding: 1rem 5rem;
    }

    ${down(heightBreakpoints.xs, true)} {
      min-width: 20.5rem;
      padding: 1rem 2.5rem;
    }

    ${down(breakpoints.md)} {
      min-width: 20.5rem;
      padding: 1rem 2.5rem;
    }
  `,
);
