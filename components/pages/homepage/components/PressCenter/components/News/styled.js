import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

export const NewsWrapper = styled.div`
  padding-top: 0.5rem;
  text-align: left;
`;

export const NewsTopContent = styled.div(
  ({ theme: { down, breakpoints } }) => css`
    display: flex;
    flex-direction: row;
    height: 25rem;

    ${down(breakpoints.lg)} {
      height: 28.5rem;
    }
  `,
);

export const MainCard = styled.div(
  ({ theme: { colors } }) => css`
    height: 100%;
    width: 17rem;
    background: url(${process.env.ASSET_HOST}/images/news-card-back.png) no-repeat;
    background-position: 80% 0%;
    background-size: auto 100%;
    padding: 1.3rem 1.5rem;
    color: ${colors.white};
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    justify-content: space-between;
    box-shadow: 0 0.28rem 0.28rem ${transparentize(0.75, colors.black)};
  `,
);

export const MainLabel = styled.div(
  ({ theme: { colors } }) => css`
    background-color: ${colors.blue};
    width: 38%;
    height: 1.7rem;
    display: flex;
    font-weight: bold;
    font-size: 0.8rem;
    justify-content: center;
    align-items: center;
  `,
);

export const MainTitle = styled.h1`
  font-size: 1rem;
`;

export const MainText = styled.p`
  font-size: 0.7rem;
`;

export const Delimiter = styled.div(
  ({ theme: { colors } }) => css`
    height: 0.5rem;
    width: 2.2rem;
    background-color: ${colors.blue};
  `,
);

export const MainDate = styled.p`
  font-size: 0.8rem;
  font-weight: bold;
  margin: 1rem 0 0 0;
`;

export const NewsInfo = styled.div(
  ({ theme: { colors } }) => css`
    position: relative;
    width: 100%;
    height: 100%;
    margin-left: 1.5rem;
    padding: 1.3rem 1.5rem;
    box-shadow: 0 0 0.28rem ${transparentize(0.75, colors.black)};
  `,
);

export const NewsTitle = styled.h2(
  ({ theme: { colors } }) => css`
    color: ${colors.blue};
    margin: 0;
    font-size: 1rem;
  `,
);

export const NewsItems = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  text-align: left;

  > div {
    width: 30%;
  }
`;

export const ItemsDelimeter = styled.div(
  ({ theme: { colors } }) => css`
    height: 0.15rem;
    width: 2rem !important;
    background-color: ${colors.blue};
    position: absolute;
    top: 50%;
  `,
);

export const ShowAllLink = styled.a(
  ({ theme: { down, breakpoints } }) => css`
    position: absolute;
    bottom: 1.3rem;
    font-size: 0.8rem;
    text-decoration: underline;
    font-weight: normal;

    ${down(breakpoints.lg)} {
      bottom: 1.3rem;
    }
  `,
);

export const NewsBottomContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 1.5rem;
  flex-wrap: wrap;
`;

export const BottomItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 30%;

  > div > h3 {
    margin-top: 0;
  }
`;

export const NewsItemMark = styled.div(
  ({ theme: { colors } }) => css`
    height: 4rem;
    width: 4rem;
    border-radius: 50%;
    border: 0.21rem solid ${colors.blue};
    color: ${colors.greyA3};
    font-size: 2rem;
    margin-right: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 4rem;
  `,
);
