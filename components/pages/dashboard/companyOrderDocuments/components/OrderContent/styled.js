import styled, { css } from 'styled-components';

export const Wrapper = styled.div(
  ({ theme: { colors } }) => css`
    background: ${colors.blueF3};
    min-height: inherit;
  `,
);

export const OrderWrapper = styled.div(
  ({ theme: { colors } }) => css`
    padding: 2rem 2rem 1rem;
    display: flex;
    flex-direction: column;
    row-gap: 1.5rem;
    background: ${colors.white};
  `,
);

export const OrderDocumentsWrapper = styled.div`
  padding: 0 1.8rem;
`;
