import styled, { css } from 'styled-components';

export const MobileWarningPageWrapper = styled.div(
  ({ theme: { colors } }) => css`
    width: 100%;
    height: 100%;
    min-height: calc(var(--vh) * 100);
    display: flex;
    flex-direction: column;
    background-color: ${colors.black};
    background: ${colors.darkBlue} url(${process.env.ASSET_HOST}/images/promo-bg/yacht-mobile.png)
      center no-repeat;
    background-size: cover;
  `,
);
