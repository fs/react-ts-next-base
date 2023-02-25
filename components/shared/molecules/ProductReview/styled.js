import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

export const Wrapper = styled.div(
  ({ theme: { colors } }) => css`
    background: ${colors.white};
    box-shadow: 0 0 0.4rem ${transparentize(0.8, colors.shadow)};
    text-align: initial;
  `,
);

export const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 6.3rem;
  height: 100%;
  overflow: hidden;
`;

export const Logo = styled.img(
  ({ theme: { breakpoints, down } }) => css`
    min-width: 100%;
    height: 6.3rem;
    object-fit: cover;

    ${down(breakpoints.sm)} {
      margin-left: 0.5rem;
    }
  `,
);

export const ProductWrapper = styled.div`
  display: flex;
  width: 60%;
`;

export const ProductInfo = styled.div`
  padding: 0.7rem 2rem;
  font-size: 0.75rem;
  width: calc(100% - 6rem);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const SellerInfoWrapper = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0.7rem 1rem;
  width: 40%;
  font-size: 0.75rem;
`;

export const Name = styled.div`
  font-weight: bold;
  font-size: 0.875rem;
  line-height: 1.3rem;
`;

export const CategoriesWrapper = styled.div`
  max-width: 15rem;
`;

export const ProductCode = styled.div`
  display: flex;
  column-gap: 0.5rem;
  margin-left: 0.5rem;
`;

export const Code = styled.span`
  white-space: nowrap;
`;

export const ProductDetails = styled.div`
  display: flex;
  margin-top: 1rem;
  align-items: end;
  justify-content: space-between;
`;

export const LogoWrapper = styled.div`
  max-width: 5rem;
`;

export const SellerName = styled.div`
  text-align: right;
  margin-right: 0.5rem;
`;

export const Product = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    border-bottom: 1px solid ${colors.greyB6};
  `,
);

export const Buyer = styled.div`
  display: flex;
  column-gap: 2rem;
  margin-bottom: 1rem;
  font-size: 0.75rem;
  align-items: center;
`;

export const CommentSection = styled.div`
  padding: 0.625rem 1.25rem 1rem;
  display: flex;
  flex-direction: column;
`;

export const BuyerInfo = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.75rem;
`;
