import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

export const ProductContentWrapper = styled.div(
  ({ theme: { contentWidth } }) => css`
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: ${contentWidth};
    min-height: 100%;
    display: flex;
    justify-content: space-between;
  `,
);

export const Col = styled.div(
  ({ theme: { colors } }) => css`
    position: relative;
    background-color: ${colors.white};
    width: 49.2%;
    min-height: 100%;
    box-shadow: 0 0 0.35rem ${transparentize(0.8, colors.shadow)};
    padding: 0 0 1.75rem;
  `,
);

export const ColContent = styled.div`
  position: relative;
`;

export const BreadcrumbsWrapper = styled.div(
  ({ theme: { colors } }) => css`
    width: 100%;
    padding: 0.75rem 0 0.75rem 1.5rem;
    border-bottom: 1px solid ${colors.greyCC};
  `,
);
