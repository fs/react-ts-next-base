import styled, { css } from 'styled-components';

export const ModalPhoneConfirmationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h3`
  font-size: 0.875rem;
  font-weight: normal;
  margin: 0 0 4.25rem;
  text-align: center;
`;

export const InputsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 0 1.25rem;
`;

export const Input = styled.input(
  ({ theme: { colors }, error }) => css`
    height: 3.625rem;
    width: 2.25rem;
    border-radius: 0.375rem;
    border: 1px solid ${error ? colors.error : colors.greyCC};
    text-align: center;
    padding: 0;
    font-size: 1.5rem;

    &:not(:first-child) {
      margin-left: 0.5rem;
    }
  `,
);

export const ResendCodeWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 2.5rem;
  margin: 0 0 1rem;

  > button {
    font-weight: 400;
  }
`;

export const Timer = styled.div(
  ({ theme: { colors } }) => css`
    font-size: 0.875rem;
    color: ${colors.greyA3};
  `,
);
