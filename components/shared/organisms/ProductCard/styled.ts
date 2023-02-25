import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

import { TView } from 'public/styles/config/view';
import { TWidth } from 'public/styles/config/width';

export const ProductContainer = styled.div<TView & TWidth>(
  ({ theme: { colors }, view, $width }) => css`
    position: relative;
    display: flex;
    flex-direction: ${view === 'tile' ? 'column' : 'row'};
    justify-content: space-between;
    width: ${$width};
    text-align: left;
    box-shadow: 0 0 0.4rem ${transparentize(0.8, colors.shadow)};
  `,
);

export const ProductCardContent = styled.div<{ isPriority: boolean } & TView>(
  ({ theme: { colors }, view, isPriority }) => css`
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    flex-direction: ${view === 'tile' ? 'column' : 'row'};
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
    z-index: 1;
  `,
);
