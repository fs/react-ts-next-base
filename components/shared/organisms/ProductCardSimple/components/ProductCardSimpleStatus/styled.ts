import styled, { css } from 'styled-components';

export const Status = styled.div(
  ({ theme: { colors } }) => css`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    padding: 0.65rem 0 0.65rem 0.4rem;
    background: ${colors.orange};
    color: ${colors.white};
    font-size: 0.75rem;
    font-weight: bold;
  `,
);
