import styled, { css } from 'styled-components';

export const LoaderWrapper = styled.div`
  width: 100%;

  > div {
    min-height: auto;
  }
`;

export const CompaniesWrapper = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, minmax(8rem, 1fr));
`;

export const ContentWrapper = styled.div(
  ({ theme: { breakpoints, down } }) => css`
    margin: 1rem 0 0;
    height: 9rem;

    ${down(breakpoints.lg)} {
      margin-top: 1rem;
      height: 10.5rem;
    }
  `,
);
