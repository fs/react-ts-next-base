import styled, { css } from 'styled-components';

export const Wrapper = styled.div(
  ({ theme: { colors } }) => css`
    position: relative;
    width: 100%;
    height: calc(var(--vh) * 100);
    background: ${colors.darkBlue} url(${process.env.ASSET_HOST}/images/auth-bg.png) center
      no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  `,
);

export const EditContainer = styled.div(
  ({ theme: { colors, heightBreakpoints, down, between } }) => css`
    position: relative;
    width: 61.25rem;
    height: 55rem;
    background-color: ${colors.white};
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.3);
    display: flex;

    ${between(heightBreakpoints.sm, heightBreakpoints.md, true)} {
      height: 50rem;
    }

    ${between(heightBreakpoints.xs, heightBreakpoints.sm, true)} {
      height: 44.5rem;
    }

    ${down(heightBreakpoints.xs, true)} {
      height: 37rem;
    }
  `,
);

export const ExitPageButton = styled.div`
  position: absolute;
  right: 0.75rem;
  top: 0.5rem;
`;
