import styled, { css } from 'styled-components';

export const PageContainer = styled.div(
  ({ theme: { colors } }) => css`
    width: 100%;
    min-height: 100%;
    background-color: ${colors.white};
    padding-top: 1.5rem;
  `,
);

export const Wrapper = styled.div(
  ({ theme: { breakpoints, down, between } }) => css`
    padding: 0 2.5rem;
    text-align: left;
    margin: 0 auto;
    width: 72rem;
    height: 100%;

    ${between(breakpoints.lg, breakpoints.xl)} {
      width: 68rem;
    }

    ${between(breakpoints.md, breakpoints.lg)} {
      width: 64rem;
    }

    ${down(breakpoints.md)} {
      width: 100%;
    }
  `,
);

export const CategoryWrapper = styled.div`
  padding: 1rem 0.5rem;
  display: flex;
  flex-direction: column;
  height: 25%;
  min-height: 12rem;
`;

export const CategoryTitle = styled.h2(
  ({ theme: { up, heightBreakpoints } }) => css`
    font-size: 1rem;
    margin-bottom: 1rem;

    ${up(heightBreakpoints.sm, true)} {
      font-size: 1.125rem;
      margin-bottom: 0.5rem;
    }
  `,
);

export const CategoriesList = styled.ul(
  () => css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 0.4rem 2rem;
    margin-bottom: 1rem;
  `,
);

export const CategoriesListItem = styled.li`
  padding: 0.1rem 1rem 0.1rem 0;
`;

export const AllCategoriesLink = styled.div`
  margin-right: 2rem;

  > a {
    display: flex;
    align-items: center;
  }
`;

export const CategoriesFooter = styled.div(
  () => css`
    display: flex;
    justify-content: space-between;
  `,
);

export const CategoriesOffer = styled.div(
  ({ theme: { colors } }) => css`
    color: ${colors.green};
    display: flex;
    align-items: center;

    font-family: Gilroy, sans-serif;
    font-size: 1.125rem;
    font-weight: 700;
  `,
);

export const ProductsWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
`;
