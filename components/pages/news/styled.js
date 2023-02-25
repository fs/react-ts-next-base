import styled, { css } from 'styled-components';

export const PageContainer = styled.div(
  ({ theme: { colors, headerHeight } }) => css`
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    min-height: calc(100% - ${headerHeight});
    background: ${colors.white};
  `,
);

export const Content = styled.div(
  ({ theme: { contentWidth } }) => css`
    max-width: ${contentWidth};
    padding: 4rem 2rem;
  `,
);

export const Header = styled.h1`
  margin: 0 0 1rem;
  font-size: 1.25rem;
  text-transform: uppercase;
  text-align: center;
`;
