import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 1.2rem;
  width: 100%;
`;

export const CodeInputWrapper = styled.div`
  position: relative;
`;

export const Input = styled.input(
  ({ theme: { colors } }) => css`
    width: 10.625rem;
    margin: 0 0 0 0.8rem;
    padding: 0.7rem 0.875rem;
    border: 1px solid ${colors.greyC4};
    font-family: 'Gilroy', sans-serif;
    font-size: 0.875rem;
  `,
);

export const ErrorWrapper = styled.div(
  ({ theme: { colors } }) => css`
    position: absolute;
    color: ${colors.error};
    font-size: 0.68rem;
    margin: 0 0 0 0.8rem;
    left: 0;
    bottom: -0.9rem;
  `,
);
