import styled, { css } from 'styled-components';

export const OperationWrapper = styled.div(
  ({ theme: { colors, breakpoints, down } }) => css`
    box-shadow: 0 0 0.375rem rgb(0 61 152 / 20%);
    min-height: 6rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: ${colors.white};
    padding: 1.65rem 1.75rem;
    margin: 1rem 0;

    ${down(breakpoints.md)} {
      flex-direction: column;
      align-items: flex-end;
    }
  `,
);

export const ContentWrapper = styled.div(
  ({ theme: { breakpoints, down } }) => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;

    ${down(breakpoints.md)} {
      justify-content: space-between;
    }
  `,
);

export const LogoWrapper = styled.div(
  ({ theme: { colors } }) => css`
    margin-left: 1rem;
    border-radius: 0.5rem;
    overflow: hidden;
    width: 2.7rem;
    height: 100%;
    background-color: ${colors.greyC4};
  `,
);

export const OperationLogo = styled.img`
  height: 100%;
  width: 100%;
`;

export const Bold = styled.span`
  font-weight: bold;
`;

export const Amount = styled.span(
  ({ theme: { colors }, color }) => css`
    color: ${colors[color]};
    font-size: 1rem;
  `,
);

export const InfoContainer = styled.div(
  ({ theme: { breakpoints, down } }) => css`
    justify-self: flex-start;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
    font-size: 0.8rem;
    height: 100%;
    max-width: 27.5rem;
    padding: 0 0 0 1.25rem;

    ${down(breakpoints.lg)} {
      max-width: 80%;
      font-size: 0.9rem;

      > div {
        margin: 0.5rem 0;
      }
    }

    ${down(breakpoints.md)} {
      max-width: 100%;
    }
  `,
);

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  p {
    margin: 0;
  }
`;

export const ButtonsWrapper = styled.div(
  ({ theme: { breakpoints, between, down } }) => css`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    > :not(:first-child) {
      margin: 0 0 0 1rem;
    }

    ${between(breakpoints.md, breakpoints.lg)} {
      flex-direction: column;

      > :not(:first-child) {
        margin: 1rem 0 0;
      }
    }

    ${down(breakpoints.md)} {
      margin: 0.5rem 0 0;
    }
  `,
);

export const RightColumnWrapper = styled.span`
  display: block;
  text-align: right;
`;
