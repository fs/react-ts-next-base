import styled, { css } from 'styled-components';

export const FooterWrapper = styled.div(
  ({ theme: { colors } }) => css`
    height: calc(var(--vh) * 15);
    margin-top: 1rem;
    width: 100%;
    background-color: ${colors.blue};
    color: ${colors.white};
  `,
);

export const ContentWrapper = styled.div(
  ({ theme: { breakpoints, down, between } }) => css`
    width: 72rem;
    padding: 2rem 2.5rem 1.6rem;
    max-height: 100%;
    height: 100%;
    margin: auto;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-between;

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

export const FooterTitle = styled.p`
  font-size: 1rem;
  font-weight: 600;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;

  > a {
    margin: 0.5rem 0 0.5rem 1rem;
  }
`;
