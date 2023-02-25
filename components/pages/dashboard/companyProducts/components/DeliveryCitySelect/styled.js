import styled, { css } from 'styled-components';

export const SelectCityWrapper = styled.div(
  ({ width }) => css`
    position: relative;
    width: ${width || 'auto'};
    min-width: ${width || 'auto'};
  `,
);

export const Description = styled.div(
  ({ theme: { colors, breakpoints, up }, index }) => css`
    color: ${colors.greyA4};
    font-size: 0.75rem;
    position: absolute;
    left: 0;
    top: -2.35rem;
    width: 12.75rem;

    ${up(breakpoints.lg)} {
      display: ${!!index && 'none'};
    }
  `,
);
