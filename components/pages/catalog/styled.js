import styled, { css } from 'styled-components';

export const PageContainer = styled.div(
  ({ theme: { colors, headerHeight } }) => css`
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: row;
    width: 100%;
    min-height: calc(100% - ${headerHeight});
    background: ${colors.white};
  `,
);

export const TabsWrapper = styled.div(
  ({ theme: { headerHeight } }) => css`
    position: absolute;
    top: ${headerHeight};
    left: 0;
    width: 100%;
    z-index: 3;
  `,
);
