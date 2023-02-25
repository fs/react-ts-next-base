import styled, { css } from 'styled-components';

export const LoginFormWrapper = styled.div(
  ({ theme: { up, breakpoints } }) => css`
    display: flex;
    width: 100%;
    height: 100%;

    ${up(breakpoints.xl)} {
      height: 31rem;
    }

    form {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
  `,
);

export const ErrorWrapper = styled.div`
  font-size: 0.9rem;
  color: red;
  padding: 0.5rem 0 0 1rem;
`;

export const FormRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: strech;
  flex-wrap: wrap;
  width: 100%;
  margin: 0 -0.3rem;
`;

export const FormCol = styled.div`
  flex: 1 0 auto;
  margin: 0 0.3rem;
`;

export const CheckboxesWrapper = styled.div`
  margin: 0 0 0.5rem;
`;

export const ActionsWrapper = styled.div(
  ({ theme: { up, down, breakpoints } }) => css`
    max-width: 12.5rem;
    text-transform: uppercase;

    ${up(breakpoints.xl)} {
      margin-top: 2rem;
    }

    ${down(breakpoints.xl)} {
      margin-top: 1.5rem;
    }
  `,
);
