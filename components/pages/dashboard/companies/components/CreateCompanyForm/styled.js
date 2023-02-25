import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  max-width: 100%;
  padding: 0 2.7rem;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const InputContainer = styled.div(
  ({ width }) => css`
    position: relative;
    width: ${width || '100%'};
  `,
);

export const ErrorWrapper = styled.div(
  ({ theme: { colors } }) => css`
    font-size: 0.875rem;
    color: ${colors.error};
    padding: 0.3rem 0 0 1rem;
  `,
);

export const InputsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const FormActions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  padding: 1.5rem 0 0;
`;

export const ActionsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 0 0 1.5rem;
`;

export const CheckboxesWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;

  a {
    text-decoration: underline;
    margin-bottom: 0.5rem;
    width: fit-content;
  }
`;

export const LogoUploadWrapper = styled.div`
  width: 100%;
  margin: 1rem 0 0.5rem;
  display: flex;
  align-items: center;
`;

export const Warning = styled.div(
  ({ theme: { colors } }) => css`
    color: ${colors.grey};
    font-size: 0.875rem;
    margin: 1.5rem 0 0;
    display: flex;
    align-items: center;
  `,
);
