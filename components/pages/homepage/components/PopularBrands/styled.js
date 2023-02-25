import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  padding: 2rem 0 3rem;
`;

export const Header = styled.h3`
  margin: 0 0 1.5rem;
  font-size: 1.125rem;
`;

export const BrandsList = styled.div(
  ({ theme: { up, down, breakpoints } }) => css`
    display: flex;
    flex-wrap: wrap;

    ${up(breakpoints.lg)} {
      margin: 0 -1rem;
    }

    ${down(breakpoints.lg)} {
      margin: 0 -0.5rem;
    }
  `,
);

export const BrandItem = styled.div(
  ({ theme: { up, down, between, breakpoints } }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100% / 6);

    ${up(breakpoints.lg)} {
      padding: 1rem 1.5rem;

      img {
        max-width: 100%;
        max-height: 4rem;
      }
    }

    ${down(breakpoints.lg)} {
      padding: 0.3rem 0.5rem;
    }

    ${between(breakpoints.md, breakpoints.lg)} {
      img {
        max-width: 75%;
        max-height: 3rem;
      }
    }

    ${down(breakpoints.md)} {
      img {
        max-width: 60%;
        max-height: 2.5rem;
      }
    }
  `,
);
