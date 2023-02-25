import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

export const DocumentsWrapper = styled.div`
  padding: 1.5rem 0;
`;

export const Title = styled.div(
  ({ theme: { colors } }) => css`
    color: ${colors.blue00};
    font-weight: bold;
    font-size: 0.875rem;
    margin-left: 1.5rem;
  `,
);

export const AccountsWrapper = styled.div`
  margin: 2rem 0 0;
`;

export const DocumentContainer = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.625rem 0.625rem 0.625rem 1.2rem;
    margin-top: 1rem;
    font-size: 0.875rem;
    background: ${colors.white};
    box-shadow: 0 0 0.3rem ${transparentize(0.8, colors.blue00)};

    button {
      padding: 0.6rem 1rem;
    }
  `,
);

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-left: 0.5rem;

  > :not(:first-child) {
    margin-left: 0.375rem;
  }
`;
