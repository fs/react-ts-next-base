import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 1.2rem;
`;

export const Input = styled.input(
  ({ theme: { colors } }) => css`
    width: 5rem;
    padding: 0.5rem;
    margin-right: 0.8rem;
    border-radius: 0;
    border: 1px solid ${colors.greyC4};
    font-family: 'Gilroy', sans-serif;
    font-size: 0.875rem;
  `,
);

export const ErrorWrapper = styled.div(
  ({ theme: { colors } }) => css`
    color: ${colors.error};
    font-size: 0.68rem;
  `,
);

export const FakeLink = styled.div(
  ({ theme: { colors } }) => css`
    color: ${colors.grey};
    font-size: 0.75rem;
    font-weight: 400;
    cursor: pointer;
  `,
);
