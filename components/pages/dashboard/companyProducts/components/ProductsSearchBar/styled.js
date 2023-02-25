import styled, { css } from 'styled-components';

export const SearchWrapper = styled.div(
  ({ theme: { breakpoints, down }, showFilter }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem 0 1.5rem;
    gap: 0.5rem 1rem;

    ${down(showFilter ? breakpoints.md : breakpoints.sm)} {
      flex-direction: column;
    }
  `,
);

export const FiltersWrapper = styled.div(
  ({ theme: { breakpoints, down }, showFilter }) => css`
    display: flex;
    align-items: center;
    font-size: 0.75rem;
    gap: 1rem;

    ${down(showFilter ? breakpoints.md : breakpoints.sm)} {
      width: 100%;
    }
  `,
);

export const SorterWrapper = styled.div`
  flex: 1 0 auto;
  width: 11.5rem;
`;

export const FilterWrapper = styled.div`
  flex: 1 0 auto;
  width: 11.5rem;
`;
