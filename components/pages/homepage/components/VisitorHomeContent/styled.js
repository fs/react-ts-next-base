import styled, { css } from 'styled-components';

export const SliderChild = styled.section`
  position: relative;
`;

export const SliderWrapper = styled.div(
  ({ theme: { colors } }) => css`
    position: absolute;
    top: 0;
    display: block;
    width: 100%;
    background: ${colors.white};
  `,
);

export const ContentBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 1rem 0 2rem;
`;

export const Brands = styled.div(
  ({ theme: { down, between, breakpoints } }) => css`
    padding: 0 2.5rem;
    margin: 0 auto;
    width: 72rem;
    ${between(breakpoints.lg, breakpoints.xl)} {
      width: 68rem;
    }
    ${between(breakpoints.md, breakpoints.lg)} {
      width: 62rem;
    }
    ${down(breakpoints.md)} {
      width: 100%;
    }
  `,
);
