import styled, { css } from 'styled-components';

export const MobileInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  flex: 1 0 auto;
  width: 100%;
  padding: 2.8rem 2.25rem;
`;

export const MainLogo = styled.img`
  height: fit-content;
  margin: 0 0 2rem;
  width: 14rem;
`;

export const Title = styled.h1(
  ({ theme: { colors, heightBreakpoints, down } }) => css`
    color: ${colors.white};
    font-size: 1.25rem;
    text-transform: uppercase;
    font-weight: 700;
    margin: 0 0 1.5rem;
    max-width: 20rem;

    ${down(heightBreakpoints.sm, true)} {
      margin: 0 0 0.5rem;
    }
  `,
);

export const Circle = styled.div(
  ({ theme: { colors } }) => css`
    height: 0.3rem;
    width: 0.3rem;
    border-radius: 50%;
    background: ${colors.lightGreen};
  `,
);

export const ProductsList = styled.div(
  ({ theme: { colors, heightBreakpoints, down } }) => css`
    display: flex;
    flex-direction: column;
    color: ${colors.lightGreen};
    font-size: 0.875rem;
    text-transform: uppercase;
    font-weight: 600;
    line-height: 1.25rem;
    margin: 0 0 1.5rem;

    ${down(heightBreakpoints.sm, true)} {
      margin: 0 0 0.5rem;
    }
  `,
);

export const DesktopBlock = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    gap: 1.375rem;
    padding: 1rem;
    font-weight: 600;
    margin-top: 1.6rem;
    align-items: center;
    color: ${colors.white};
    border: 1px solid ${colors.white};
    background-color: rgba(0, 0, 0, 0.5);
  `,
);

export const IconsWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

export const ProductsListItem = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;
