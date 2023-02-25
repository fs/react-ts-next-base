import styled, { css } from 'styled-components';

export const PageContainer = styled.div(
  ({ theme: { colors, headerHeight } }) => css`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    min-height: calc(100% - ${headerHeight});
    background: ${colors.white};
  `,
);

export const TitleWrapper = styled.section`
  width: 100%;
  padding: 3.75rem 1.25rem 1.875rem;
  margin: 0 auto;
  text-align: center;
`;

export const NotFoundHeader = styled.div(
  ({ theme: { colors } }) => css`
    margin: 1rem 0;
    color: ${colors.blue2F};
    font-size: 4rem;
    font-weight: bold;
  `,
);

export const Header = styled.h1`
  margin: 0 0 1rem;
  font-size: 1rem;
`;

export const Description = styled.p`
  font-size: 1;
`;

export const Image = styled.div`
  width: 100%;
  height: 20rem;
  margin: 3rem 0 2rem;
  background: url(${process.env.ASSET_HOST}/images/not-found.png) center no-repeat;
`;
