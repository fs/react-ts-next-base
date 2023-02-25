import styled, { css } from 'styled-components';

export const Wrapper = styled.div(
  ({ theme: { colors } }) => css`
    width: 100%;
    padding: 2rem;
    background: ${colors.white};
  `,
);

export const OrdersList = styled.div`
  position: relative;
  width: 100%;
`;
