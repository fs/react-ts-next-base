import styled, { css } from 'styled-components';

export const Title = styled.h2`
  font-size: 0.875rem;
  margin-top: 0rem;
`;

export const EmployeeItemWrapper = styled.div(
  ({ theme: { colors } }) => css`
    border-bottom: 1px solid ${colors.greyCC};
    min-height: 5.875rem;
    padding: 0.5rem 0;

    &:last-of-type {
      border-bottom: none;
    }
  `,
);

export const EmployeeEmail = styled.p`
  font-size: 0.875rem;
  margin: 0.5rem 0;
`;

export const ActionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: -1rem;
`;
