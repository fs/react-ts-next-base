import styled, { css } from 'styled-components';

export const OrderRegistrationTotal = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 1rem;
  font-size: 0.75rem;
`;

export const TotalPriceWithDelivery = styled.div(
  ({ theme: { colors } }) => css`
    margin: 0 0 0.2rem 0.5rem;
    color: ${colors.orange};
    font-size: 1.125rem;
    font-weight: bold;
  `,
);
