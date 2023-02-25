import styled, { css } from 'styled-components';

export const PageContainer = styled.div(
  ({ theme: { colors, headerHeight } }) => css`
    position: relative;
    width: 100%;
    min-height: calc(100% - ${headerHeight});
    background: ${colors.white};
  `,
);

export const ContentWrapper = styled.div(
  ({ theme: { down, between, breakpoints } }) => css`
    padding: 2rem 2.5rem 0;
    margin: 0 auto;
    width: 72rem;

    ${between(breakpoints.md, breakpoints.lg)} {
      width: 64rem;
    }

    ${down(breakpoints.md)} {
      width: 100%;
    }
  `,
);

export const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  text-transform: uppercase;
  margin: 2.5rem 0 3.5rem;
`;

export const Scheme = styled.img`
  width: 100%;
  padding: 0 1.5rem;
`;
