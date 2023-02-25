import styled, { css } from 'styled-components';

export const Container = styled.div(
  ({ theme: { colors } }) => css`
    background-color: ${colors.white};
    width: 100%;
    height: calc(var(--vh) * 100 - 4.5rem);
    min-height: calc(var(--vh) * 100 - 4.5rem);
    margin: 4.5rem 0 0;
    background-size: cover;
    overflow-y: auto;
    overflow-x: hidden;
  `,
);
export const ContainerChild = styled.div(
  ({ theme: { colors } }) => css`
    background-color: ${colors.white};
    border: 2px solid ${colors.darkBlue};
    border-radius: 7px;
    padding: 14px;
    margin: 15px;
    transition: 0.2s;
    &:hover {
      background-color: ${colors.blueEE};
    }
  `,
);
