import styled, { css } from 'styled-components';
import theme from 'public/styles/theme';

import { getMarginStyles } from 'public/styles/config/margin';
import { TCounterProps } from './types';

export const CounterWrapper = styled.div(
  ({ size, borderRadius, $width, ...props }: TCounterProps) => css`
    border: 1px solid ${theme.colors.greyCC};
    background-color: ${theme.colors.white};
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: ${$width};
    height: ${size.height};
    border-radius: ${borderRadius};
    ${getMarginStyles(props)}

    input {
      padding: 0;
    }
  `,
);
