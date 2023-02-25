import styled, { css } from 'styled-components';

export const Wrapper = styled.div(
  ({ theme: { heightBreakpoints, between, down } }) => css`
    margin: 2.5rem 0 0;

    ${between(heightBreakpoints.sm, heightBreakpoints.md, true)} {
      margin: 1.75rem 0 0;
    }

    ${down(heightBreakpoints.sm, true)} {
      margin: 0.5rem 0 0;
    }
  `,
);

export const RemoveAccountButton = styled.div(
  ({ theme: { colors } }) => css`
    color: ${colors.white};
    font-size: 0.875rem;

    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  `,
);
