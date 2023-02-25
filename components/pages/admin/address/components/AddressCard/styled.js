import styled, { css } from 'styled-components';

export const Wrapper = styled.div(
  ({ theme: { colors }, isVerified }) => css`
    background-color: ${colors.white};
    border: 1px solid ${isVerified ? colors.grey : colors.orange};
    max-width: 40rem;
    padding: 0.5rem 1rem 1.5rem;
    margin: 1.75rem 1.5rem 0;
    font-size: 0.875rem;
  `,
);

export const Title = styled.h2`
  font-weight: bold;
  font-size: 0.875rem;
  max-width: 50%;
  margin: 0 0 0.5rem;
  cursor: pointer;
`;

export const AddressInfo = styled.div`
  margin: 1rem 0 2rem;
  display: flex;
  font-size: 0.75rem;
  column-gap: 1rem;
`;

export const Comment = styled.div(
  ({ theme: { colors } }) => css`
    width: 50%;
    color: ${colors.greyA4};
    word-break: break-word;
  `,
);

export const ContactWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
`;

export const LicensesWrapper = styled.div`
  font-size: 0.875rem;
  margin: 0.5rem 0 1.5rem;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  column-gap: 0.5rem;
`;
