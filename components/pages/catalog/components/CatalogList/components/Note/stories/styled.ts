import styled, { css } from 'styled-components';

export const Container = styled.div(
  ({ theme: { colors } }) => css`
    background-color: ${colors.greyE6};
  `,
);
