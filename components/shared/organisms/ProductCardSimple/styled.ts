import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

export const ProductWrapper = styled.div(
  ({ theme: { colors } }) => css`
    position: relative;
    min-height: 26rem;
    box-shadow: 0 0 1rem ${transparentize(0.7, colors.shadow)};
    background-color: ${colors.white};
  `,
);

export const ProductCardContent = styled.div<{ isPriority: boolean }>(
  ({ theme: { colors }, isPriority }) => css`
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: ${isPriority ? '0.25rem' : '0 0 0.25rem'};
    box-shadow: ${isPriority && `inset 0 0 0 0.25rem ${colors.orange}`};
  `,
);

export const PriorityCorner = styled.div(
  ({ theme: { colors } }) => css`
    position: absolute;
    right: 0;
    top: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 50px 50px 0;
    border-color: transparent ${colors.orange} transparent transparent;
  `,
);
