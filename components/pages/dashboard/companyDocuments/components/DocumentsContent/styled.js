import styled, { css } from 'styled-components';

export const Title = styled.h2`
  font-size: 1.25rem;
  margin: 1.5rem 3.25rem;
`;

export const ContentWrapper = styled.div`
  margin: 2rem;
`;

export const SearchWrapper = styled.div(
  ({ theme: { breakpoints, down } }) => css`
    display: flex;

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
