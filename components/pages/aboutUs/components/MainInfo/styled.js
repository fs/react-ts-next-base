import styled, { css } from 'styled-components';

export const MainInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.125rem;
`;

export const Header = styled.div`
  font-weight: bold;
  text-transform: uppercase;
  margin: 0 0 1.5rem;
`;

export const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Row = styled.div`
  min-height: 17rem;
  display: flex;
  justify-content: space-between;

  &:not(:first-child) {
    margin: 7.5rem 0 0;
  }
`;

export const Text = styled.div(
  ({ theme: { breakpoints, down } }) => css`
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-right: 1rem;

    ${down(breakpoints.md)} {
      width: 65%;
    }
  `,
);

export const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  text-transform: uppercase;
  margin: 0 0 1rem;
`;

export const ImageWrapper = styled.div(
  ({ theme: { colors, breakpoints, down } }) => css`
    position: relative;
    min-width: 28.625rem;
    height: 22.875rem;
    display: flex;
    align-items: center;

    > div {
      width: 65%;
      height: 100%;
      background: ${colors.blueEE};
      margin: 0 10% 0 25%;
    }

    > img {
      position: absolute;
      width: 100%;
    }

    ${down(breakpoints.md)} {
      min-width: 22.75rem;
      height: 18rem;
    }
  `,
);
