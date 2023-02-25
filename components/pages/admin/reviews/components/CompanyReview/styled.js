import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

export const Wrapper = styled.div(
  ({ theme: { colors } }) => css`
    background: ${colors.white};
    box-shadow: 0 0 0.4rem ${transparentize(0.8, colors.shadow)};
    text-align: initial;
  `,
);

export const SellerInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0.7rem 1rem;
  font-size: 0.75rem;
`;

export const CompaniesWrapper = styled.div`
  display: flex;
  justify-content: end;
  flex-wrap: wrap;
`;

export const RatingWrapper = styled.div`
  font-size: 0.75rem;
  padding: 1.5rem 1.25rem;
`;

export const RatingTitle = styled.div`
  margin: 0.2rem;
`;
export const SellerName = styled.div`
  text-align: right;
  margin-right: 0.5rem;
`;

export const Product = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid ${colors.greyB6};
  `,
);

export const Comment = styled.div`
  padding: 0.625rem 1.3rem 1rem;
`;
