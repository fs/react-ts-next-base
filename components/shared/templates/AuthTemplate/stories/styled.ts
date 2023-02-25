import styled, { css } from 'styled-components';

export const Wrapper = styled.div(
  ({ theme: { colors } }) => css`
    padding: 1.5rem 2rem;
    color: ${colors.white};
  `,
);
