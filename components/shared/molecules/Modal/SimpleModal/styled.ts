import styled, { css } from 'styled-components';

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 1.4rem;
`;

export const ModalHeader = styled.h3`
  margin: 0 1rem;
  font-size: 0.875rem;
  text-align: center;
`;

export const Description = styled.div`
  margin: 0 0 0.5rem;
  font-size: 0.875rem;
  text-align: center;
`;

export const Remark = styled.div(
  ({ theme: { colors } }) => css`
    margin: 0.5rem 0 0;
    color: ${colors.grey73};
    text-align: center;
    font-size: 0.85rem;
    font-weight: 300;
  `,
);

export const ButtonsWrapper = styled.div<{ showCancel: boolean }>(
  ({ showCancel = true }) => css`
    display: flex;
    justify-content: ${showCancel ? 'space-between' : 'center'};
    margin-top: 2rem;
    width: 100%;

    > button {
      width: 48%;
      padding: 0;
    }
  `,
);
