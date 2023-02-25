import styled, { css } from 'styled-components';
import theme from 'public/styles/theme';
import { getMarginStyles } from 'public/styles/config/margin';

import { TButtonStates } from './types';

export const AccordionWrapper = styled.div<{ disabled: boolean }>(
  ({ disabled }) => css`
    font-size: 0.875rem;

    .Collapsible {
      margin: 0 0 0.35rem;

      .Collapsible__trigger {
        display: flex;
        width: fit-content;
        pointer-events: ${disabled && 'none'};
      }
    }
  `,
);

export const CollapsibleButton = styled.button<TButtonStates>(
  ({ color, ...props }) => css`
    width: 100%;
    display: flex;
    align-items: center;
    text-align: left;
    width: fit-content;
    background-color: transparent;
    color: ${theme.colors[color]};
    font-size: 0.875rem;
    font-family: 'Gilroy', sans-serif;
    font-weight: 600;
    border: 0;
    padding: 0.7rem 0;

    :disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    ${getMarginStyles(props)};
  `,
);
