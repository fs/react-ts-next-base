import styled, { css } from 'styled-components';

const SUB_HEADER_HEIGHT = `6.4rem`;

export const CartHeaderContainer = styled.div(
  ({ theme: { colors, headerHeight } }) => css`
    position: sticky;
    top: ${headerHeight};
    left: 0;
    display: flex;
    justify-content: center;
    width: 100%;
    height: ${SUB_HEADER_HEIGHT};
    background: ${colors.blue};
    color: ${colors.white};
    z-index: 1;
  `,
);

export const Content = styled.div(
  ({ theme: { contentWidth } }) => css`
    position: relative;
    max-width: ${contentWidth};
    width: 100%;
    padding: 0 1rem;
  `,
);

export const Info = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0;
`;

export const CompanyLogoWrapper = styled.div`
  height: 4rem;
  margin-right: 2rem;
  overflow: hidden;

  img {
    height: fit-content;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

export const RatingWrapper = styled.div(
  ({ theme: { colors, down, breakpoints } }) => css`
    display: flex;

    ${down(breakpoints.md)} {
      flex-direction: column;
      font-size: 0.75rem;
    }

    a {
      color: ${colors.white};
    }
  `,
);

export const Col = styled.span(
  ({ theme: { up, down, breakpoints } }) => css`
    ${up(breakpoints.md)} {
      margin-left: 2rem;
    }

    ${down(breakpoints.md)} {
      margin-top: 0.2rem;
    }
  `,
);

export const CompanyInfoWrapper = styled.div``;

export const Name = styled.div(
  ({ theme: { up, down, breakpoints } }) => css`
    text-transform: uppercase;
    font-size: 0.875rem;
    font-weight: bold;

    ${up(breakpoints.md)} {
      margin: 0 0 1rem;
    }

    ${down(breakpoints.md)} {
      margin: 0 0 0.5rem;
    }
  `,
);
