import styled, { css } from 'styled-components';

export const OrderSummaryWrapper = styled.div(
  ({ theme: { breakpoints, down } }) => css`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    ${down(breakpoints.md)} {
      width: 100%;
      justify-content: flex-end;
    }
  `,
);

export const SummaryDetails = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.5rem;

  strong {
    white-space: nowrap;
    display: flex;
    align-items: center;
    margin: 0.5rem 0 0;
    font-size: 0.875rem;
  }
`;

export const PiecePrice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  white-space: nowrap;
`;

export const OrderQuantity = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const Summary = styled.div(
  ({ theme: { up, breakpoints } }) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    ${up(breakpoints.md)} {
      flex: 1 0 auto;
    }
  `,
);

export const SummaryCount = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  font-weight: bold;
  line-height: 1.5rem;
`;

export const SummaryPrice = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  line-height: 1rem;
`;

export const WithoutDiscount = styled.div(
  ({ theme: { colors } }) => css`
    margin-left: 0.5rem;
    color: ${colors.greyA3};
    text-decoration: line-through;
    font-size: 0.875rem;
  `,
);

export const TotalPrice = styled.div`
  margin-left: 0.5rem;
  font-size: 0.875rem;
  font-weight: bold;
`;
