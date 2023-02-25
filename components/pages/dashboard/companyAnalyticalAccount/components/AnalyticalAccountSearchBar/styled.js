import styled, { css } from 'styled-components';

export const SearchBarWrapper = styled.div(
  ({ theme: { breakpoints, down } }) => css`
    display: flex;
    padding: 1.5rem 0;

    ${down(breakpoints.md)} {
      flex-direction: column;
    }
  `,
);

export const SearchDateWrapper = styled.div(
  ({ theme: { breakpoints, down } }) => css`
    margin: 0 0 0 2rem;

    ${down(breakpoints.md)} {
      margin: 0.5rem 0 0;
    }
  `,
);
