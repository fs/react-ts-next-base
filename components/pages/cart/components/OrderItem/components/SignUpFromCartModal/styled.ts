import styled, { css } from 'styled-components';

export const Title = styled.div(
  ({ theme: { colors } }) => css`
    font-weight: 700;
    font-size: 1rem;
    color: ${colors.blue};
    margin-bottom: 2rem;
  `,
);
