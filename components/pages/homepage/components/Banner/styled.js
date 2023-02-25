import styled, { css } from 'styled-components';

export const Container = styled.div(
  ({ theme: { colors } }) => css`
    width: 100%;
    justify-content: space-between;
    overflow: hidden;
    padding: 1.2rem 2.3rem;

    background: no-repeat right/50% url(${`${process.env.ASSET_HOST}/images/banner.png`});
    background-size: auto 100%;
    background-color: ${colors.blueEE};

    img {
      margin: 0;
    }
  `,
);

export const Title = styled.h3(
  ({ theme: { colors } }) => css`
    font-size: 1.15rem;
    font-weight: 700;
    color: ${colors.blue00};
    margin: 0.6rem 0;
    z-index: 2;
    max-width: 25rem;
  `,
);

export const Subtitle = styled.div`
  font-size: 0.7rem;
  line-height: 0.875rem;
`;
