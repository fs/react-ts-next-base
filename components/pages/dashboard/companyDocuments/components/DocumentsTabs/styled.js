import styled, { css } from 'styled-components';

export const Wrapper = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    width: 100%;
    background: ${colors.white};
  `,
);
