import styled, { css } from 'styled-components';

export const PageContainer = styled.div(
  ({ theme: { colors, headerHeight } }) => css`
    position: relative;
    width: 100%;
    min-height: calc(100% - ${headerHeight});
    background: ${colors.white};
  `,
);

export const ContentOverflow = styled.div(
  ({ theme: { colors } }) => css`
    width: 100%;
    background-color: ${colors.white};
  `,
);

export const ContentRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const ContentWrapper = styled.div(
  ({ theme: { up, down, between, breakpoints, contentWidth } }) => css`
    padding: 1.5rem 1rem;

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

export const ProductsWrapper = styled.div`
  margin: 0 -1rem;
`;

export const SubHeader = styled.h3`
  margin: 0 0 1rem;
  font-size: 1.125rem;
`;

export const ContentBox = styled.div`
  width: 100%;
  margin: 1rem 0 2rem;
`;
