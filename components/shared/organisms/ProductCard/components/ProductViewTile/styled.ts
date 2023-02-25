import styled, { css } from 'styled-components';

// TODO: truncate Product name on BE side
export const Name = styled.h3`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0;
  padding: 0 0.875rem;
  font-size: 0.875rem;
  text-overflow: ellipsis;
`;

export const Category = styled.div(
  ({ theme: { colors } }) => css`
    margin: 0.5rem 0 0;
    padding: 0.5rem 0.875rem 0.5rem;
    border-top: 1px solid ${colors.greyCC};
    border-bottom: 1px solid ${colors.greyCC};
    font-size: 0.75rem;
  `,
);

export const Company = styled.span`
  font-size: 0.75rem;
`;

export const Code = styled.p(
  ({ theme: { heightBreakpoints, down } }) => css`
    display: flex;
    justify-content: space-between;
    margin: 0;
    padding: 0.5rem 0.875rem 0;
    font-size: 0.75rem;

    ${down(heightBreakpoints.sm, true)} {
      font-size: 0.7rem;
    }
  `,
);

export const RateContainer = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0.875rem;
    border-bottom: 1px solid ${colors.greyCC};
  `,
);

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

export const Seller = styled.span`
  font-size: 0.75rem;
  margin: 0.25rem 1.25rem 0.3rem 0;
`;

export const SellerContainer = styled.div<{ bottom?: boolean }>(
  ({ bottom }) => css`
    display: flex;
    flex-direction: row;
    align-items: ${bottom ? 'flex-end' : 'center'};
    justify-content: space-between;
    padding: 0.2rem 0.875rem 0;
  `,
);

export const Selled = styled.div`
  font-size: 0.75rem;
  opacity: 0.6;
`;

export const PriceTitle = styled.span(
  ({ theme: { colors } }) => css`
    margin: 0.5rem 0 0;
    padding: 0.5rem 0.875rem 0;
    border-top: 1px solid ${colors.greyCC};
    font-size: 0.75rem;
  `,
);

export const PriceWrapper = styled.span`
  font-size: 0.75rem;
  font-weight: bold;
  margin: 0;
  padding: 0 0.875rem 0.5rem;
`;

export const Price = styled.span`
  font-size: 1rem;
  margin-right: 0.5rem;
`;
