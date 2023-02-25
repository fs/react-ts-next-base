import styled, { css } from 'styled-components';

export const FinancesWrapper = styled.div(
  ({ theme: { colors, heightBreakpoints, down, between } }) => css`
    margin: 7.5rem 0 1rem 1.5rem;
    display: flex;
    flex-direction: column;
    font-size: 0.75rem;
    color: ${colors.white};

    ${between(heightBreakpoints.sm, heightBreakpoints.md, true)} {
      margin: 3.5rem 0 1rem 1.5rem;
    }

    ${down(heightBreakpoints.sm, true)} {
      margin: 0.75rem 0 1rem 1.5rem;
    }
  `,
);

export const FinancesToggler = styled.div(
  ({ theme: { colors }, isOpen }) => css`
    position: relative;
    display: inline;
    cursor: pointer;

    &::before {
      position: absolute;
      top: 0.15rem;
      left: -1.5rem;
      width: 0;
      height: 0;
      border: 0.35rem solid transparent;
      border-top: ${isOpen ? 'none' : `0.5rem solid ${colors.white}`};
      border-bottom: ${isOpen ? `0.5rem solid ${colors.white}` : 'none'};
      content: ' ';
    }
  `,
);

export const Items = styled.div(
  ({ theme: { heightBreakpoints, down } }) => css`
    display: flex;
    flex-direction: column;

    > div {
      margin: 0.5rem 0 0;
    }

    ${down(heightBreakpoints.xs, true)} {
      > div {
        margin: 0.25rem 0 0;
      }
    }
  `,
);
