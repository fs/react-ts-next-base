import styled, { css } from 'styled-components';

export const PageContainer = styled.div(
  ({ theme: { headerHeight } }) => css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: calc(100% - ${headerHeight});
  `,
);
