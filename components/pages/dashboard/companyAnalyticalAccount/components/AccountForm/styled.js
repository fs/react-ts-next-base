import styled, { css } from 'styled-components';

export const Title = styled.h2`
  font-size: 1.125rem;
  margin: 0 0 1rem;
  text-align: center;
`;

export const Subtitle = styled.h3`
  font-size: 0.875rem;
  font-weight: normal;
  margin: 0 0 1.5rem;
  text-align: center;
`;

export const VatButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 0 1rem;
  column-gap: 0.5rem;
`;

export const Accounts = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Account = styled.div`
  font-size: 0.875rem;

  &:not(:last-child) {
    margin: 0 0 1rem;
  }
`;

export const FIeldTitle = styled.div`
  font-size: 0.875rem;
  font-weight: bold;
  margin: 0 0 0.25rem;
`;

export const Number = styled.div`
  margin: 1rem 0 0;
`;

export const ActionsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 1.5rem 0 0;
`;

export const WithdrawalSum = styled.div(
  ({ theme: { colors } }) => css`
    font-size: 1.25rem;
    line-height: 1.5rem;
    color: ${colors.orange};
    font-weight: bold;
    margin: 0 0 1rem;
  `,
);
