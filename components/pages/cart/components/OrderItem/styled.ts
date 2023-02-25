import styled, { css } from 'styled-components';

export const OrderWrapper = styled.div(
  ({ theme: { colors } }) => css`
    width: 100%;
    margin: 2rem 0 0;
    padding: 0 0 2rem;
    border-bottom: 1px solid ${colors.greyA3};
  `,
);

export const Header = styled.h3(
  ({ theme: { colors } }) => css`
    margin: 0 0 1rem;
    color: ${colors.blue00};
    font-size: 1.125rem;
    font-weight: bold;
  `,
);

export const Details = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  width: 100%;

  h3 {
    margin: 0 0 1rem;
    font-size: 0.875rem;
  }
`;

export const OrderConfirmation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem 0 0;
  column-gap: 1rem;
`;

export const OrderNotice = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    align-items: center;
    max-width: 60%;
    color: ${colors.orange};

    p {
      margin: 0 0 0 1rem;
      font-size: 0.75rem;
    }
  `,
);

export const GuestNotice = styled.div`
  margin: auto 0 0.3rem 1rem;
  font-size: 0.75rem;
  font-weight: bold;
  width: 100%;
  text-align: right;
`;

export const OrderRegistration = styled.div`
  margin-left: auto;
`;

export const OrderRegistrationActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  > :not(:first-child) {
    margin-left: 0.5rem;
  }
`;
