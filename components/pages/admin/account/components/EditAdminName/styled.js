import styled, { css } from 'styled-components';

export const EditAdminNameWrapper = styled.div(
  ({ theme: { colors } }) => css`
    border-bottom: 1px solid ${colors.greyC4};
    margin: 0 0 2rem;
    padding: 0 0 2rem;
  `,
);

export const InputsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 0.5rem;
`;

export const InputWrapper = styled.div`
  &:not(:last-child) {
    margin-right: 1.25rem;
  }
`;
