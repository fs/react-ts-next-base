import styled, { css } from 'styled-components';

export const SearchBarWrapper = styled.div(
  ({ theme: { breakpoints, down } }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem 1rem;

    ${down(breakpoints.md)} {
      flex-direction: column;
    }
  `,
);

export const FiltersWrapper = styled.div(
  ({ theme: { breakpoints, down } }) => css`
    display: flex;
    column-gap: 1rem;

    ${down(breakpoints.md)} {
      width: 100%;
    }
  `,
);

export const SorterWrapper = styled.div`
  flex: 1 0 auto;
  width: 11.5rem;
`;
