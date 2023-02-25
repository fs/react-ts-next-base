import styled, { css } from 'styled-components';
import { getMarginStyles, TMargin } from 'public/styles/config/margin';

export const TooltipWrapper = styled.div<TMargin>(
  ({ ...props }) => css`
    position: relative;
    font-size: 0.875rem;

    ${getMarginStyles(props)};
  `,
);

export const Discount = styled.div(
  ({ theme: { colors } }) => css`
    position: relative;
    background-color: ${colors.orange};
    color: ${colors.white};
    padding: 0.3rem 0.4rem;
    border-radius: 0.25rem;
    font-weight: bold;
    font-size: 0.75rem;
  `,
);

export const DiscountInfo = styled.div`
  white-space: nowrap;
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;

  &:first-child {
    margin-right: 0.5rem;
  }
`;
