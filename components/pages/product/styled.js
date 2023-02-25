import styled, { css } from 'styled-components';

export const PageContainer = styled.div(
  ({ theme: { colors, headerHeight } }) => css`
    position: relative;
    display: flex;
    width: 100%;
    min-height: calc(var(--vh) * 100 - ${headerHeight});
    background: ${colors.greyF1};
  `,
);
