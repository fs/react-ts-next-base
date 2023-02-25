import styled, { css } from 'styled-components';

export const PageContainer = styled.div(
  ({ theme: { colors } }) => css`
    width: 100%;
    min-height: 100%;
    background-color: ${colors.white};
    padding-top: 2.5rem;
  `,
);

export const ContentWrapper = styled.div(
  ({ theme: { colors, contentWidth, breakpoints, down, between } }) => css`
    padding: 0 2.5rem;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: space-evenly;
    flex-wrap: wrap;
    margin: auto;
    width: ${contentWidth};

    ${between(breakpoints.lg, breakpoints.xl)} {
      width: 68em;
    }

    ${between(breakpoints.md, breakpoints.lg)} {
      width: 64rem;
    }

    ${down(breakpoints.md)} {
      width: 100%;
    }

    & div:nth-child(2),
    & div:nth-child(5) {
      border-left: 1px solid ${colors.greyE6};
      border-right: 1px solid ${colors.greyE6};
    }
  `,
);

export const AdvantagesList = styled.div(
  ({ theme: { colors, headerHeight, heightBreakpoints, up, between, down }, withPager }) => css`
    position: relative;
    width: 100%;
    margin: 1rem 0;
    border-top: 1px solid ${colors.greyE6};
    border-bottom: 1px solid ${colors.greyE6};
    height: ${withPager ? `calc(var(--vh) * 100 - (${headerHeight} + 10rem))` : '27.5rem'};
    min-height: 24.5rem;

    ${between(heightBreakpoints.xs, heightBreakpoints.sm, true)} {
      min-height: 27.5rem;
    }

    ${!withPager &&
    css`
      ${up(heightBreakpoints.sm, true)} {
        height: 36.5rem;
      }

      ${down(heightBreakpoints.xs, true)} {
        height: 24.5rem;
      }
    `}
  `,
);

export const Separator = styled.div(
  ({ theme: { colors }, withPager }) => css`
    background-color: ${colors.greyE6};
    height: 0.5px;
    position: absolute;
    top: 50%;
    left: ${withPager ? '10%' : '0'};
    width: ${withPager ? 'calc(100vw - 10%)' : '100%'};
  `,
);
