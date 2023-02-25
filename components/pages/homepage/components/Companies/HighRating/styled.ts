import styled, { css } from 'styled-components';

export const CompaniesWrapper = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, minmax(8rem, 1fr));
`;

export const ContentWrapper = styled.div(
  ({ theme: { breakpoints, down } }) => css`
    height: 27rem;
    margin: 1rem 0 0;

    ${down(breakpoints.lg)} {
      margin-top: 1rem;
      height: 28.5rem;
    }
  `,
);
