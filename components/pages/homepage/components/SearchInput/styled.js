import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

import Mouse from 'public/images/icons/mouse.svg';

export const Wrapper = styled.div(
  ({ theme: { colors } }) => css`
    position: absolute;
    bottom: 3.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    color: ${colors.white};
  `,
);

export const Content = styled.div(
  ({ theme: { breakpoints, down } }) => css`
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: 100%;
    padding-right: 3rem;

    ${down(breakpoints.md)} {
      padding-right: 0;
      padding-bottom: 3rem;
    }
  `,
);

export const Col = styled.div(
  ({ theme: { down, between, up, breakpoints } }) => css`
    display: flex;
    flex-direction: column;

    ${up(breakpoints.xxl)} {
      width: 75%;
      max-width: 53rem;
    }

    ${between(breakpoints.xl, breakpoints.xxl)} {
      width: 60%;
      max-width: 45rem;
    }

    ${between(breakpoints.lg, breakpoints.xl)} {
      width: 65%;
      max-width: 35rem;
    }

    ${between(breakpoints.md, breakpoints.lg)} {
      width: 60%;
      max-width: 26.5rem;
    }

    ${down(breakpoints.md)} {
      width: 55%;
      max-width: 23rem;
    }
  `,
);

export const Notification = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${colors.white};
    font-size: 1.125rem;
    font-weight: bold;
    text-align: center;
    margin: 0 0 1rem;
  `,
);

export const MouseIcon = styled(Mouse)`
  width: 50px;
  margin-bottom: 1rem;
`;

export const Form = styled.form`
  display: flex;
  align-items: flex-end;
  margin-right: 0.5rem;
`;

export const Input = styled.input(
  ({ theme: { colors } }) => css`
    height: 2.75rem;
    padding: 0.5rem 1rem;
    background: ${transparentize(0.8, colors.white)};
    border: 1px solid ${colors.white};
    color: ${colors.white};
    margin-right: 0.35rem;
    width: 100%;
  `,
);

export const Menu = styled.div(
  ({ theme: { colors } }) => css`
    color: ${colors.white};
    display: flex;
    align-items: center;
    margin: 0.7rem 1.5rem 0.7rem 0;
    font-size: 1rem;
    text-transform: uppercase;
    white-space: nowrap;
    cursor: pointer;
  `,
);

export const InstructionLink = styled.div(
  ({ theme: { breakpoints, down } }) => css`
    position: absolute;
    right: 3.5rem;

    ${down(breakpoints.md)} {
      bottom: -1rem;
    }
  `,
);
