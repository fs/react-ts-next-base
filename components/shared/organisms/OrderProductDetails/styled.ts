import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

export const ProductDetailsWrapper = styled.div(
  ({ theme: { colors } }) => css`
    margin: 0 0 1.5rem;
    box-shadow: 0 0 0.375rem ${transparentize(0.8, colors.blue00)};
    background-color: ${colors.white};
  `,
);

export const MainProductInfo = styled.div(
  ({ theme: { colors } }) => css`
    background: ${colors.blueEE};
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
  `,
);

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RightCol = styled(Col)`
  align-items: flex-end;
  margin-left: 2.5rem;

  > span {
    font-size: 0.75rem;
    text-align: end;
  }
`;

export const RateRow = styled(Row)`
  margin: 1rem 0 0;
`;

export const RateContainer = styled.div`
  font-size: 0.75rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Likes = styled.span(
  ({ theme: { colors } }) => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 1.5rem;
    color: ${colors.greyA3};
    font-weight: bold;
  `,
);

export const Selled = styled.span(
  ({ theme: { colors } }) => css`
    margin: 0 2rem 0 2.5rem;
    color: ${colors.grey};
  `,
);

export const ProductCode = styled.span`
  font-size: 0.75rem;
`;

export const AdditionalProductInfo = styled.div`
  display: flex;
  height: 5.5rem;
`;

export const ProductInfoCol = styled(Col)`
  padding: 0.75rem 1rem 0.75rem 0.5rem;
  height: 100%;
  width: 100%;
  font-size: 0.75rem;
  justify-content: space-between;
`;

export const ProductPhoto = styled.img`
  max-height: 100%;
  max-width: 100%;
`;

export const ExpirationDate = styled.div`
  display: flex;
`;

export const ProductPropertiesWrapper = styled.div(
  ({ theme: { colors } }) => css`
    border-top: 1px solid ${colors.greyCC};
    padding: 1rem;
    display: flex;
    flex-wrap: wrap;
    font-size: 0.75rem;
  `,
);

export const ProductProperty = styled.div`
  > strong {
    margin-right: 0.5rem;
  }

  &:not(:last-child) {
    margin-right: 1.75rem;
  }
`;

export const PricingWrapper = styled.div`
  display: flex;
  align-items: center;
  > strong {
    margin-left: 0.5rem;
  }
`;

export const ProductPhotoContainer = styled.div`
  width: 7rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
