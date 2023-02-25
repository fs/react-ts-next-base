import styled, { css } from 'styled-components';

export const SortersWrapper = styled.div(
  ({ theme: { breakpoints, up } }) => css`
    display: flex;
    column-gap: 1rem;
    flex-wrap: wrap;
    margin-top: 1rem;

    ${up(breakpoints.md)} {
      > div {
        width: calc(50% - 0.5rem);
      }
    }
  `,
);
