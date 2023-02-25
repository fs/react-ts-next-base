import styled, { css } from 'styled-components';

export const PageContainer = styled.div`
  width: 100%;
  min-height: calc(var(--vh) * 100);
  display: flex;
  align-items: stretch;
`;

export const Product = styled.span`
  white-space: nowrap;
`;

export const Dash = styled.div`
  display: inline-block;
  padding: 0 0.75rem;
`;

export const ProductsList = styled.div(
  ({ theme: { colors } }) => css`
    color: ${colors.lightGreen};
    text-transform: uppercase;
    font-size: 1.0625rem;
    font-weight: 700;
    margin-bottom: 2rem;
    display: flex;
    flex-wrap: wrap;
  `,
);
export const VideoWrapper = styled.div(
  ({ theme: { colors }, name }) => css`
    width: 100vw;
    background: ${colors.darkBlue} url(${process.env.ASSET_HOST}/images/promo-bg/${name}.png) center
      no-repeat;
    background-size: cover;
  `,
);

export const VideoLayout = styled.div(
  ({ theme: { colors }, opacity }) => css`
    width: 100%;
    height: 100%;
    background-color: ${colors.black};
    opacity: ${opacity};
  `,
);

export const Video = styled.video`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  min-height: calc(var(--vh) * 100);
  min-width: 100vw;
`;

export const Wrapper = styled.div(
  ({ theme: { colors, down, between, breakpoints } }) => css`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 70%;
    max-width: 82rem;
    padding: 3.3rem 0 3.3rem 3.8rem;
    border-left: 4px solid ${colors.white};
    transform: translate(-50%, -50%);
    text-align: left;
    z-index: 1;
    ${between(breakpoints.lg, breakpoints.xxl)} {
      width: 75%;
      padding: 3rem 0 3rem 3.5rem;
    }

    ${down(breakpoints.lg)} {
      width: 75%;
      padding: 2.4rem 0 2.4rem 2.8rem;
    }

    &::before,
    &::after {
      position: absolute;
      left: 0;
      display: block;
      width: 8.375rem;
      border-top: 4px solid ${colors.white};
      content: '';
    }

    &::before {
      top: 0;
    }

    &::after {
      bottom: 0;
    }
  `,
);

export const Header = styled.h1(
  ({ theme: { colors, down, between, up, breakpoints } }) => css`
    color: ${colors.white};
    font-weight: 700;
    text-transform: uppercase;

    ${up(breakpoints.xxl)} {
      margin: 0 0 3rem;
      font-size: 2.8rem;
      line-height: 3rem;
    }

    ${between(breakpoints.xl, breakpoints.xxl)} {
      margin: 0 0 2.8rem;
      font-size: 2.5rem;
      line-height: 2.7rem;
    }

    ${between(breakpoints.lg, breakpoints.xl)} {
      margin: 0 0 2.5rem;
      font-size: 2.3rem;
      line-height: 2.5rem;
    }

    ${between(breakpoints.md, breakpoints.lg)} {
      margin: 0 0 2.3rem;
      font-size: 2rem;
      line-height: 2.2rem;
    }

    ${down(breakpoints.md)} {
      margin: 0 0 2rem;
      font-size: 1.8rem;
      line-height: 2.1rem;
    }
  `,
);

export const Description = styled.div(
  ({ theme: { colors, down, up, breakpoints } }) => css`
    margin: 0 0 2rem;

    p {
      margin: 0 0 0.2rem;
      color: ${colors.white};
      font-weight: 200;

      ${up(breakpoints.xl)} {
        font-size: 1.125rem;
      }

      ${down(breakpoints.xl)} {
        font-size: 1rem;
      }
    }
  `,
);
