import styled, { css } from 'styled-components';

const SUB_HEADER_HEIGHT = `6.4rem`;

export const PageContainer = styled.div(
  ({ theme: { colors, headerHeight } }) => css`
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    min-height: calc(100% - ${headerHeight} - ${SUB_HEADER_HEIGHT});
    background: ${colors.white};
  `,
);

export const Content = styled.div(
  ({ theme: { contentWidth } }) => css`
    position: relative;
    max-width: ${contentWidth};
    width: 100%;
    padding: 0 1rem;
  `,
);

export const Header = styled.h1`
  margin: 1.2rem 0;
  font-size: 1.375rem;
  font-weight: bold;
`;
