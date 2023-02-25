import styled, { css } from 'styled-components';

export const PageContainer = styled.div(
  ({ theme: { colors, headerHeight } }) => css`
    position: relative;
    width: 100%;
    height: calc(100% - ${headerHeight});
    margin: ${headerHeight} 0 0;
    background: ${colors.white};
    display: flex;
    flex-direction: column;
  `,
);
