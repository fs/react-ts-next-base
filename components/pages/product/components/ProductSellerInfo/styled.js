import Link from 'next/link';
import styled, { css } from 'styled-components';

export const ProductSellerInfoWrapper = styled.div`
  padding: 1rem 1.25rem;
`;

export const Title = styled.h2`
  font-size: 0.875rem;
  padding: 0 0 1rem;
`;

export const Row = styled.div(
  ({ question }) => css`
    display: flex;
    flex-direction: ${question ? 'column' : 'row'};
    justify-content: space-between;
    gap: 1rem;

    > div {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
  `,
);

export const Col = styled.div`
  display: flex;
`;

export const LogoWrapper = styled.div`
  height: 4.625rem;
  margin-right: 0.5rem;
`;

export const SellerInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RatingWrapper = styled.div`
  font-weight: bold;
  margin: 0 0 0.4rem;
`;

export const CountSellerReviews = styled.div(
  ({ theme: { colors } }) => css`
    font-size: 0.75rem;
    color: ${colors.grey};
    white-space: nowrap;
  `,
);

export const SellerLinks = styled.div(
  ({ question }) => css`
    display: flex;
    flex-direction: ${question ? 'row' : 'column'};
    justify-content: space-between;
    align-items: flex-end;
    gap: 0.5rem;
  `,
);

export const StyledLink = styled(Link)(
  ({ theme: { colors }, $question }) => css`
    color: ${colors.black};
    font-size: 0.875rem;
    width: fit-content;
    text-align: ${$question ? 'start' : 'end'};

    &:not(:first-child) {
      text-align: right;
    }

    &:hover {
      text-decoration: underline;
    }
  `,
);

export const QuestionWrapper = styled.div`
  margin-left: 1rem;
`;

export const SellerName = styled.div`
  margin: 0 0 0.75rem;

  > a {
    text-transform: uppercase;
  }
`;
