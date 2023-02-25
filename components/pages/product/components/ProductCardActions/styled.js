import styled, { css } from 'styled-components';

export const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.75rem 2rem 0;
  margin-bottom: 4rem;

  > button:not(:first-child) {
    margin-left: 1rem;
  }
`;

export const ButtonWrapper = styled.div`
  position: relative;
  width: 48%;
`;

export const Warning = styled.div(
  ({ theme: { colors } }) => css`
    color: ${colors.orange};
    font-size: 0.875rem;
    display: flex;
    align-items: center;

    a {
      color: ${colors.orange};
      text-decoration: underline;
    }
  `,
);
