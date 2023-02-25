import styled, { css } from 'styled-components';

export const HeaderWrapper = styled.div(
  ({ theme: { contentWidth, down, between, breakpoints } }) => css`
    padding: 0 2.5rem;
    margin: auto;
    height: 3.5rem;
    text-align: left;
    display: flex;
    flex-direction: row;
    width: ${contentWidth};

    ${between(breakpoints.lg, breakpoints.xl)} {
      width: 68rem;
    }

    ${between(breakpoints.md, breakpoints.lg)} {
      width: 64rem;
    }

    ${down(breakpoints.md)} {
      width: 100%;
    }
  `,
);

export const ServiceTag = styled.div(
  ({ theme: { colors } }) => css`
    background-color: ${colors.blue};
    color: ${colors.white};
    width: auto;
    height: auto;
    font-size: 0.7rem;
    padding: 0.5rem 0.3rem;
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    text-align: center;
  `,
);

export const HeaderText = styled.h2(
  ({ theme: { breakpoints, up, down, between } }) => css`
    font-weight: bold;
    margin: 2rem 0 0 1rem;

    ${up(breakpoints.xxl)} {
      font-size: 1.125rem;
    }

    ${between(breakpoints.xl, breakpoints.xxl)} {
      font-size: 1rem;
    }

    ${down(breakpoints.xl)} {
      font-size: 0.9rem;
    }
  `,
);
