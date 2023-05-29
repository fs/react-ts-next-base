import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  min-height: 100vh;
`;

export const PageContent = styled.div(
  ({ theme: { down, breakpoints } }) =>
    css`
      width: 100%;
      max-width: ${breakpoints.xl};
      padding: 2rem 1rem;

      ${down(breakpoints.xl)} {
        max-width: 100%;
      }
    `,
);
