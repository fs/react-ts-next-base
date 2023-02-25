import styled, { css } from 'styled-components';

export const TopBarWrapper = styled.div(
  ({ theme: { headerHeight } }) => css`
    position: sticky;
    top: ${headerHeight};
    left: 0;
    z-index: 5;
  `,
);

export const Wrapper = styled.div(
  ({ theme: { colors, topBarHeight } }) => css`
    display: flex;
    justify-content: center;
    width: 100%;
    height: ${topBarHeight};
    background: ${colors.blue};
  `,
);

export const Content = styled.div(
  ({ theme: { up, down, between, breakpoints, contentWidth } }) => css`
    position: relative;
    display: flex;
    padding: 0 1rem;

    ${up(breakpoints.lg)} {
      width: ${contentWidth};
    }

    ${between(breakpoints.md, breakpoints.lg)} {
      width: 62rem;
    }

    ${down(breakpoints.md)} {
      width: 100%;
    }
  `,
);

export const TopBarContent = styled(Content)`
  align-items: center;
`;

export const CategoriesWrapper = styled.div(
  ({ theme: { colors, topBarHeight, headerHeight } }) => css`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: stretch;
    top: ${topBarHeight};
    right: 0;
    bottom: 0;
    left: 0;
    height: calc(var(--vh) * 100 - (${headerHeight} + ${topBarHeight}));
    background: linear-gradient(
      90deg,
      ${colors.blueEE} 0%,
      ${colors.blueEE} 50%,
      ${colors.white} 50%,
      ${colors.white} 100%
    );
    z-index: 3;
  `,
);

export const CategoriesContent = styled(Content)`
  align-items: stretch;
`;

export const CategoriesList = styled.div(
  ({ theme: { colors, up, down, breakpoints } }) => css`
    display: flex;
    flex-direction: column;
    width: 31%;
    padding: 1.5rem 1.5rem 1.5rem 0;
    background: ${colors.blueEE};
    overflow: hidden auto;
    position: relative;

    ${up(breakpoints.lg)} {
      font-size: 0.875rem;
    }

    ${down(breakpoints.lg)} {
      font-size: 0.75rem;
    }
  `,
);

export const CategoryItem = styled.span(
  ({ theme: { colors, up, down, breakpoints } }) => css`
    color: ${colors.black};
    cursor: pointer;

    ${up(breakpoints.lg)} {
      margin: 0 0 0.8rem;
    }

    ${down(breakpoints.lg)} {
      margin: 0 0 0.5rem;
    }
  `,
);

export const SubCategoriesWrapper = styled.div(
  ({ theme: { colors, up, down, breakpoints } }) => css`
    display: flex;
    flex-direction: column;
    width: 69%;
    background: ${colors.white};

    ${up(breakpoints.lg)} {
      padding: 1.5rem 3rem;
      font-size: 0.875rem;
    }

    ${down(breakpoints.lg)} {
      font-size: 0.75rem;
      padding: 1rem 2rem;
    }
    ${down(breakpoints.sm, true)} {
      font-size: 0.7rem;
      padding: 0.6rem 1.5rem;
    }
  `,
);

export const SubCategoriesList = styled.div(
  ({ theme: { up, down, breakpoints } }) => css`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    position: relative;

    ${up(breakpoints.lg)} {
      height: 50%;
    }

    ${down(breakpoints.lg)} {
      height: 70%;
    }
  `,
);

export const SubCategoryItem = styled.div`
  margin: 0.2rem;
`;
export const SubCategoryName = styled.strong(
  ({ theme: { up, down, breakpoints } }) => css`
    ${up(breakpoints.lg)} {
      margin-bottom: 1rem;
    }

    ${down(breakpoints.lg)} {
      margin-bottom: 0.6rem;
    }
  `,
);

export const CloseButtonWrapper = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

export const SearchForm = styled.div(
  ({ theme: { down, between, up, breakpoints } }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    align-items: stretch;
    margin-left: 2rem;

    ${up(breakpoints.xl)} {
      width: 36rem;
    }

    ${between(breakpoints.lg, breakpoints.xl)} {
      width: 32rem;
    }

    ${between(breakpoints.md, breakpoints.lg)} {
      width: 28rem;
    }

    ${down(breakpoints.md)} {
      width: 24rem;
    }
  `,
);
