import styled, { css } from 'styled-components';

export const DocumentsWrapper = styled.div(
  ({ theme: { breakpoints, down } }) => css`
    position: relative;
    display: flex;
    margin: 0 0 7.125rem;

    ${down(breakpoints.md)} {
      justify-content: space-evenly;
    }
  `,
);

export const DocumentWrapper = styled.div(
  ({ theme: { breakpoints, up } }) => css`
    display: flex;
    margin: 0 1rem;

    svg {
      min-width: 3.625rem;
    }

    ${up(breakpoints.md)} {
      &:not(:first-child) {
        margin-left: 8rem;
      }
    }
  `,
);

export const LinkWrap = styled.div`
  align-items: center;
  text-align: left;
  margin: 0 0 2rem;
  max-width: 20rem;
`;

export const DocumentInfo = styled.div`
  margin: 0.75rem 0 0 2rem;
`;
