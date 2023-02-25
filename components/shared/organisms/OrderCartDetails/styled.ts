import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

export const OrderCartDetailsWrapper = styled.div(
  ({ theme: { colors } }) => css`
    background: ${colors.white};
    box-shadow: 0 0 1rem ${transparentize(0.8, colors.blue00)};
    font-size: 0.75rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
  `,
);

export const ProductMainInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ProductBlueContainer = styled.div(
  ({ theme: { colors, breakpoints, down } }) => css`
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    width: 100%;
    background: ${colors.blueEE};

    ${down(breakpoints.md)} {
      flex-direction: column;
    }
  `,
);

export const ProductTopBlueContainer = styled(ProductBlueContainer)`
  padding: 0.75rem 1.25rem;
`;

export const ProductBottomBlueContainer = styled(ProductBlueContainer)`
  padding: 1rem 1.25rem;
`;

export const ProductMiddleContainer = styled.div`
  display: flex;
  flex: 1;
`;

export const ProductTopLeftCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;
`;

export const ProductPropertiesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const ProductProperty = styled.div`
  > strong {
    margin-right: 0.5rem;
  }

  &:not(:last-child) {
    margin-right: 1.75rem;
  }
`;

export const ProductBottomRightCol = styled.span<{ hasExpirationDate: boolean }>(
  ({ theme: { down, breakpoints }, hasExpirationDate }) => css`
    display: flex;
    flex-direction: ${hasExpirationDate ? 'row' : 'column'};
    text-align: end;

    > div {
      white-space: nowrap;
    }

    ${down(breakpoints.md)} {
      flex-direction: row;
      text-align: start;

      > div {
        margin-left: 0.5rem;
      }
    }
  `,
);

export const RateContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  > :not(:first-child) {
    margin-left: 1rem;
  }
`;

export const LikesWrapper = styled.span(
  ({ theme: { colors } }) => css`
    color: ${colors.greyA3};
    font-weight: bold;
    font-size: 0.65rem;
    display: flex;
    flex-direction: row;
    align-items: center;
  `,
);

export const Selled = styled.span(
  ({ theme: { colors } }) => css`
    margin: 0 2rem 0 1rem;
    color: ${colors.grey};
  `,
);

export const Col = styled.div`
  width: 100%;
  margin: 0 0 0.5rem;
`;

export const ProductImg = styled.div`
  width: 7rem;
  min-width: 7rem;
  margin: 1rem 0 1rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

export const ProductBasicInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc(100% - 7rem);
  padding: 1rem;
`;

export const ProductCode = styled.span`
  display: flex;
  justify-content: flex-end;
`;
