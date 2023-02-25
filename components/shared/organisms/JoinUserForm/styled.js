import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

export const Wrapper = styled.div(
  ({ theme: { colors } }) => css`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background: ${transparentize(0.5, colors.black)};
    z-index: 10;
  `,
);

export const FormWrapper = styled.div(
  ({ theme: { colors } }) => css`
    padding: 2rem 4rem;
    background: ${colors.white};
  `,
);

export const Header = styled.h3``;

export const Description = styled.p``;

export const LoginFormWrapper = styled.div(
  ({ theme: { up, down, breakpoints } }) => css`
    display: flex;
    align-items: flex-end;
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

export const ErrorWrapper = styled.div`
  font-size: 0.9rem;
  color: red;
  padding: 0.5rem 0 0 1rem;
`;

export const StyledLink = styled.a(
  ({ theme: { colors, up, down, breakpoints } }) => css`
    color: ${colors.blue};

    ${up(breakpoints.xl)} {
      margin-top: 5.75rem;
    }

    ${down(breakpoints.xl)} {
      margin-top: 6.75rem;
    }
  `,
);

export const FormRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: strech;
  width: 100%;
  margin: 0 -0.3rem;
`;

export const FormCol = styled.div`
  flex: 1 0 auto;
  margin: 0 0.3rem;
`;

export const CheckboxesWrapper = styled.div`
  margin: 0 0 2rem;
`;
