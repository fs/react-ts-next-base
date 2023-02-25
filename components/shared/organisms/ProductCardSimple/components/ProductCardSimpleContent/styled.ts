import styled, { css } from 'styled-components';

export const CardWrapper = styled.div(
  () => css`
    width: 100%;
  `,
);

export const ImageContainer = styled.div<{ imgUrl: string }>(
  ({ theme: { colors, up, heightBreakpoints }, imgUrl }) => css`
    background: ${colors.white}
      url(${process.env.ASSET_HOST}${!imgUrl ? '/images/photo-temporary.svg' : imgUrl}) center
      no-repeat;
    width: 100%;
    height: 6rem;
    background-size: ${imgUrl && 'contain'};
    align-self: center;
    margin: 0.8rem 0 1rem;

    ${up(heightBreakpoints.sm, true)} {
      height: 10rem;
    }
  `,
);

export const Name = styled.h3(
  ({ theme: { colors } }) => css`
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    min-height: 1rem;
    max-height: 3rem;
    margin: 0;
    padding: 0 0.875rem;
    font-size: 0.875rem;
    text-overflow: ellipsis;

    a {
      color: ${colors.black};
    }
  `,
);

export const Category = styled.div(
  ({ theme: { colors } }) => css`
    padding: 0.5rem 0.875rem 0.5rem;
    margin: 0.5rem 0 0;
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

export const Seller = styled.span`
  font-size: 0.75rem;
  margin: 0.25rem 1.25rem 0.3rem 0;
`;

export const SellerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0.2rem 0.875rem 0;
`;

export const Sold = styled.div`
  font-size: 0.75rem;
  opacity: 0.6;
`;

export const PriceTitle = styled.div(
  ({ theme: { colors } }) => css`
    margin: 0.5rem 0 0;
    padding: 0.5rem 0.875rem 0;
    border-top: 1px solid ${colors.greyCC};
    font-size: 0.75rem;
  `,
);

export const PriceWrapper = styled.div`
  font-size: 0.75rem;
  font-weight: bold;
  margin: 0;
  padding: 0 0.875rem 0.3rem;
`;

export const Price = styled.span`
  font-size: 1rem;
  margin-right: 0.5rem;
`;
