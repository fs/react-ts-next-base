import styled, { css } from 'styled-components';

export const SelectCategoryWrapper = styled.div`
  margin: 0 0 0.75rem;
`;

export const CategoriesWrapper = styled.div(
  ({ theme: { breakpoints, down } }) => css`
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 100%;
    flex-wrap: wrap;

    ${down(breakpoints.md)} {
      flex-direction: column;
    }
  `,
);

export const Description = styled.div(
  ({ theme: { colors } }) => css`
    font-size: 0.875rem;
    color: ${colors.grey};
    margin: -0.75rem 0 0;
  `,
);
