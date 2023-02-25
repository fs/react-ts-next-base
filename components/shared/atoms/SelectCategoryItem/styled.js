import styled, { css } from 'styled-components';

export const ErrorWrapper = styled.div(
  ({ theme: { colors } }) => css`
    position: absolute;
    bottom: 0.25rem;
    width: 100%;
    font-size: 0.68rem;
    color: ${colors.error};
    padding: 0.15rem 0 0 0.5rem;
  `,
);

export const SelectWrapper = styled.div(
  ({ theme: { breakpoints, down } }) => css`
    position: relative;
    width: 49%;

    ${down(breakpoints.md)} {
      width: 100%;
    }
  `,
);
