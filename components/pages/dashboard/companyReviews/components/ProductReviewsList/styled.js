import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

export const ReviewWrapper = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem 1rem 0;
    box-shadow: 0px 0px 6px ${transparentize(0.8, colors.blue00)};
    > div {
      box-shadow: unset;
      width: 100%;
    }
  `,
);

export const RowDetails = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    border-bottom: 1px solid ${colors.greyCC};
  `,
);

export const ProductInfo = styled.div(
  ({ theme: { colors } }) => css`
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-right: 1px solid ${colors.greyCC};
  `,
);

export const ReviewsListWrapper = styled.div`
  padding: 1rem;
`;
export const ReviewsList = styled.div`
  padding: 0.2rem 0;
`;

export const ReviewContent = styled.div`
  padding: 1.2rem;
  width: 100%;

  svg {
    width: 1.2rem;
  }
`;

export const Text = styled.div`
  font-size: 0.875rem;
  margin: 1rem 0 0;
`;

export const ReviewerNameWrapper = styled.div`
  padding-left: 0.75rem;
  font-size: 0.75rem;
  text-align: right;
`;

export const CreatedAtDate = styled.p`
  font-size: 0.75rem;
  margin: 0 0 0.25rem;
  opacity: 0.5;
`;

export const CompanyInfo = styled.div`
  width: 13rem;
  min-width: 13rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const LogoWrapper = styled.div`
  margin: 0 0.7rem;
`;

export const PhotoProductWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const PhotoProduct = styled.img`
  width: 5rem;
`;

export const Row = styled.div`
  display: flex;
`;

export const ProductDetails = styled.div`
  padding: 0.75rem 0 0.75rem 2rem;
`;

export const Name = styled.strong`
  font-size: 0.875rem;
`;

export const Category = styled.div`
  font-size: 0.75rem;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
`;

export const ProductRateSection = styled.div(
  ({ theme: { breakpoints, down } }) => css`
    font-size: 0.75rem;
    padding: 0.75rem 1.6rem 0.75rem 0;
    margin-left: 1rem;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;

    > div {
      margin-left: 1rem;
    }

    ${down(breakpoints.lg)} {
      flex-direction: column;
      justify-content: space-between;
    }
  `,
);

export const ProductCode = styled.span`
  white-space: nowrap;
  margin-right: 1rem;
`;
