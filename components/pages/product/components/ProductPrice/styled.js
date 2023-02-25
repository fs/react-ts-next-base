import styled, { css } from 'styled-components';

export const ProductPriceWrapper = styled.div(
  ({ theme: { colors }, disabled }) => css`
    position: relative;
    padding: 1.25rem 2rem;
    border-bottom: 1px solid ${colors.greyCC};
    opacity: ${disabled && '0.4'};
    pointer-events: ${disabled && 'none'};
  `,
);

export const Row = styled.div(
  ({ theme: { breakpoints, down } }) => css`
    display: flex;

    ${down(breakpoints.md)} {
      flex-direction: column;
    }
  `,
);

export const Col = styled.div`
  display: flex;
  flex-direction: column;

  &:first-child {
    margin-right: 1.5rem;
  }
`;

export const Title = styled.div`
  font-size: 0.875rem;
  font-weight: bold;
  display: flex;
  margin: 0 0 0.75rem;

  > span {
    margin-right: 0.75rem;
  }
`;

export const TitlePrice = styled(Title)(
  ({ theme: { breakpoints, down } }) => css`
    ${down(breakpoints.md)} {
      margin: 0.75rem 0 0.5rem;
    }
  `,
);

export const CountDescription = styled.div(
  ({ theme: { colors } }) => css`
    color: ${colors.orange};
    font-size: 0.75rem;
    margin: 0.3rem 0 0;
    white-space: nowrap;
  `,
);

export const FullPriceWrapper = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  font-size: 1.25rem;
  font-weight: bold;

  > span {
    margin: 0 1.5rem 0.5rem 0;
  }
`;

export const FullPrice = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    align-items: flex-end;
    margin: 0 0 0.5rem;

    > span {
      color: ${colors.grey};
      text-decoration: line-through;
      font-weight: normal;
      margin-right: 1rem;
      white-space: nowrap;
      text-align: end;
    }
  `,
);

export const PiecePriceWrapper = styled.div`
  display: flex;
  font-size: 0.75rem;
  font-weight: normal;
`;

export const PiecePrice = styled.div(
  ({ theme: { colors } }) => css`
    margin-left: 0.75rem;
    color: ${colors.grey};
    text-decoration: line-through;
  `,
);

export const PieceQuantity = styled.div(
  ({ theme: { colors } }) => css`
    color: ${colors.grey};
    font-size: 0.75rem;
  `,
);

export const DiscountInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.75rem 0 0;
  gap: 0.3rem;
`;

export const DiscountDescription = styled.div(
  ({ theme: { colors } }) => css`
    color: ${colors.green};
    font-size: 0.875rem;
  `,
);
