import styled, { css } from 'styled-components';

export const PageContainer = styled.div(
  ({ theme: { colors } }) => css`
    overflow: auto;
    width: 100%;
    height: 100%;
    background-color: ${colors.white};
    display: flex;
    flex-direction: column;
  `,
);

export const ContentWrapper = styled.div(
  ({ theme: { down, between, breakpoints } }) => css`
    padding: 0 2.5rem 0;
    margin: 0 auto;
    width: 72rem;

    ${between(breakpoints.md, breakpoints.lg)} {
      width: 64rem;
    }

    ${down(breakpoints.md)} {
      width: 100%;
    }
  `,
);

export const ContentTitleWrapper = styled(ContentWrapper)`
  padding: 0 2.5rem 0;
`;

export const PageTitleWrapper = styled.div(
  ({ theme: { colors, headerHeight } }) => css`
    flex: none;
    width: 100%;
    background-color: ${colors.blue};
    height: 3rem;
    color: ${colors.white};
    text-transform: uppercase;
    text-align: left;
    display: flex;
    align-items: center;
    margin-top: ${headerHeight};
  `,
);

export const Title = styled.h2`
  margin: 0;
  font-size: 1rem;
`;

export const TabsWrapper = styled.div`
  width: 100%;
`;
