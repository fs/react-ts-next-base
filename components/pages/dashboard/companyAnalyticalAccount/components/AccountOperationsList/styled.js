import styled, { css } from 'styled-components';

export const AccountOperationsListWrapper = styled.div`
  margin: 0 0 1rem;
`;
export const AccountOperation = styled.div`
  display: flex;
  font-size: 0.875rem;

  &:not(:first-child) {
    margin: 1rem 0 0;
  }
`;

export const OperationAmount = styled.div(
  ({ theme: { colors }, color }) => css`
    display: flex;
    align-items: center;
    font-weight: bold;
    color: ${colors[color]};
    white-space: nowrap;
    border-right: 1px solid ${colors.grey};
    margin-right: 1rem;
    padding-right: 1rem;
  `,
);

export const OperationDetails = styled.div``;
