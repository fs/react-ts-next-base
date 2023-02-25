import styled, { css } from 'styled-components';

export const ProductBuyerAddressWrapper = styled.div(
  ({ theme: { colors } }) => css`
    position: relative;
    padding: 1.75rem 2rem 0;
    font-size: 0.875rem;
    border-bottom: 1px solid ${colors.greyCC};
  `,
);

export const Title = styled.div`
  font-weight: bold;
  margin: 0 0 1rem;
`;

export const Row = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin: 0 0 1rem;

  > :not(:first-child) {
    margin-left: 0.75rem;
  }
`;

export const FreeDelivery = styled.span(
  ({ theme: { colors } }) => css`
    color: ${colors.orange};
  `,
);

export const TerminalWrapper = styled.div`
  display: flex;
  margin: 0 0 1rem;
`;

export const Terminal = styled.div`
  margin-left: 0.75rem;
`;

export const EstimatedDelivery = styled.div(
  ({ theme: { colors } }) => css`
    color: ${colors.grey};
    margin: 0 0 1rem;
  `,
);

export const LoaderWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  min-height: 3.3rem;
`;
