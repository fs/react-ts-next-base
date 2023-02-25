import styled, { css } from 'styled-components';

export const AdvantageWrapper = styled.div(
  ({ theme: { heightBreakpoints, down, between } }) => css`
    width: 33%;
    height: 50%;
    font-size: 0.625rem;
    padding: 1rem 2rem 1.25rem 2rem;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    ${between(heightBreakpoints.xs, heightBreakpoints.sm, true)} {
      padding: 0.5rem 1rem;
    }

    ${down(heightBreakpoints.sm, true)} {
      padding: 0.5rem 1rem;
    }
  `,
);

export const ImageContainer = styled.div(
  ({ theme: { heightBreakpoints, breakpoints, down, between } }) => css`
    position: relative;
    display: flex;
    justify-content: center;
    height: 7rem;

    ${between(heightBreakpoints.xs, heightBreakpoints.md, true)} {
      height: 5.5rem;
    }

    ${down(breakpoints.xl)} {
      height: 5.5rem;
    }

    ${down(heightBreakpoints.xs, true)} {
      height: 4rem;
    }
  `,
);

export const Image = styled.img`
  height: 100%;

  &&& {
    width: auto;
  }
`;

export const AdvantageTitle = styled.p(
  ({ theme: { heightBreakpoints, up } }) => css`
    font-size: 0.75rem;
    margin: 0.7rem auto 0.5rem auto;

    ${up(heightBreakpoints.sm, true)} {
      font-size: 1rem;
      margin: 0.7rem auto 0.7rem auto;
    }
  `,
);

export const AdvantageDescription = styled.p(
  ({ theme: { colors, heightBreakpoints, breakpoints, down } }) => css`
    font-size: 0.875rem;
    color: ${colors.grey};
    margin: 0 auto 0 auto;

    ${down(heightBreakpoints.md, true)} {
      font-size: 0.7rem;
    }

    ${down(breakpoints.lg)} {
      font-size: 0.7rem;
    }
  `,
);

export const AdvantageButton = styled.button(
  ({ theme: { colors, up, heightBreakpoints } }) => css`
    color: ${colors.blue};
    background-color: ${colors.white};
    padding: 0.4rem 1rem;
    border: 1px solid ${colors.greyE6};
    font-size: 0.6rem;
    font-weight: bold;
    margin-top: 0.3rem;
    align-self: flex-start;

    ${up(heightBreakpoints.sm, true)} {
      font-size: 0.7rem;
    }
  `,
);
