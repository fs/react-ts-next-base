import styled, { css } from 'styled-components';

export const FormWrapper = styled.div(
  ({ theme: { colors, up, down, heightBreakpoints } }) => css`
    background: ${colors.white};
    width: 40rem;
    margin: 1rem;

    ${up(heightBreakpoints.xs, true)} {
      min-height: 38.5rem;
    }

    ${down(heightBreakpoints.xs, true)} {
      min-height: 35rem;
    }
  `,
);

export const Wrapper = styled.div(
  ({ theme: { up, down, heightBreakpoints } }) => css`
    ${up(heightBreakpoints.xs, true)} {
      padding: 3.125rem 4.125rem;
    }

    ${down(heightBreakpoints.xs, true)} {
      padding: 1rem 2.5rem 1.5rem;
    }
  `,
);

export const LoginFormWrapper = styled.div(
  ({ theme: { up, down, breakpoints } }) => css`
    display: flex;
    width: 100%;
    height: 100%;

    ${up(breakpoints.xl)} {
      height: 31rem;
    }

    ${down(breakpoints.xl)} {
      height: 28rem;
    }

    form {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
  `,
);

export const LoginInputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

export const ErrorWrapper = styled.div`
  font-size: 0.9rem;
  color: red;
  padding: 0.5rem 0 0 1rem;
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
