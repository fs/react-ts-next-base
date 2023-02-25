import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

import theme from 'public/styles/theme';
import { getMarginStyles, TMargin } from 'public/styles/config/margin';
import { TWidth } from 'public/styles/config/width';

type TTooltipTriggerProps = TMargin;

export const TooltipTrigger = styled.div(
  (props: TTooltipTriggerProps) => css`
    display: flex;
    height: 100%;

    ${getMarginStyles(props)};
  `,
);

export const TooltipWrapper = styled.div<TWidth>(
  ({ $width }) => css`
    color: ${theme.colors.black} !important;
    width: ${$width || 'auto'};
    padding: 0.6rem 1rem;
    box-shadow: 0 0 4px ${transparentize(0.5, theme.colors.shadow)};
    background: ${theme.colors.white};
    border-radius: 0.6rem;
    font-size: 0.875rem;
    font-weight: normal;
    line-height: 1rem;
    z-index: 100;
  `,
);
