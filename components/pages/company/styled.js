import styled, { css } from 'styled-components';

export const PageContainer = styled.div(
  ({ theme: { colors, headerHeight } }) => css`
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: row;
    width: 100%;
    min-height: calc(100% - ${headerHeight});
    background: ${colors.white};
  `,
);

export const Wrapper = styled.div(
  ({ theme: { contentWidth } }) => css`
    max-width: ${contentWidth};
    width: 100%;
  `,
);

export const Content = styled.div(
  ({ theme: { colors } }) => css`
    border-left: 1px solid ${colors.greyCF};
    border-right: 1px solid ${colors.greyCF};
  `,
);

export const ReviewTitle = styled.div(
  () => css`
    font-size: 0.875rem;
    font-weight: 700;
    padding: 2rem 3.5rem 0;
  `,
);
