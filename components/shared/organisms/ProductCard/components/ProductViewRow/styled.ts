import styled, { css } from 'styled-components';

export const ProductImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 1rem;
  width: 13rem;
  min-width: 10rem;
`;

export const InfoContainer = styled.div`
  width: 100%;
  padding-left: 1rem;
`;

export const MainSection = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 1rem 1.3rem;
    background: ${colors.blueEE};
  `,
);

export const LeftCol = styled.div`
  width: 75%;
  margin-right: 1rem;
`;

export const LeftFlexCol = styled(LeftCol)(
  ({ theme: { down, breakpoints } }) => css`
    display: flex;

    ${down(breakpoints.md)} {
      flex-direction: column;
    }
  `,
);

export const RightCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.35rem;
  width: 25%;
  min-width: 10rem;
`;

export const CodeCol = styled.div(
  ({ theme: { down, up, breakpoints } }) => css`
    padding: 1rem 1rem 0 0;

    ${up(breakpoints.md)} {
      width: 27%;
    }

    ${down(breakpoints.md)} {
      width: 100%;
    }
  `,
);

export const CompanyCol = styled.div(
  ({ theme: { down, up, breakpoints } }) => css`
    padding: 1rem 1rem 0 0;

    ${up(breakpoints.md)} {
      width: 45%;
    }

    ${down(breakpoints.md)} {
      width: 100%;
    }
  `,
);

export const DeliveryCol = styled.div(
  ({ theme: { colors, down, up, breakpoints } }) => css`
    ${up(breakpoints.md)} {
      width: 25%;
    }

    ${down(breakpoints.md)} {
      width: 100%;
    }

    li {
      color: ${colors.greyA3};
    }
  `,
);

export const DeliveryText = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    align-items: center;
    margin: 0 0 0.5rem;
    color: ${colors.blue};
  `,
);

export const DeliveryCost = styled.div(
  ({ theme: { colors } }) => css`
    margin: 0 0 0.5rem;
    color: ${colors.orange};
  `,
);

export const Name = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 0.875rem;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Category = styled.div`
  margin: 0 0 0.5rem;
  font-size: 0.75rem;
`;

export const Company = styled.div`
  margin: 0 0 1rem;
`;

export const Code = styled.p`
  margin: 0 0 1rem;
  font-size: 0.75rem;
`;

export const RateContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const LikesWrapper = styled.span(
  ({ theme: { colors } }) => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 1rem;
    color: ${colors.greyA3};
    font-weight: bold;
    font-size: 0.75rem;
  `,
);

export const RateWrapper = styled.div`
  margin-right: 1rem;
`;

export const Seller = styled.span`
  font-size: 0.75rem;
`;

export const SecondSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem;
  font-size: 0.75rem;
`;

export const Selled = styled.div`
  font-size: 0.75rem;
`;

export const RightColPrice = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ProductPriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PriceTitle = styled.span`
  margin: 0 0 1rem;
  font-size: 0.75rem;
  text-align: end;
`;

export const PriceWrapper = styled.span`
  font-size: 0.75rem;
  font-weight: bold;
  padding: 0 0 2.5rem;
  text-align: end;
`;

export const Price = styled.span`
  font-size: 1rem;
  margin-right: 0.5rem;
`;

export const FreeDeliveryCities = styled.ul`
  margin: 0 0 1rem;
`;
