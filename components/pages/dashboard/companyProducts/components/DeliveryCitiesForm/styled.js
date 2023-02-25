import styled, { css } from 'styled-components';

export const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 0 0;
`;

export const CitiesList = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 0.5rem;
`;

export const Row = styled.div(
  ({ theme: { colors, breakpoints, down } }) => css`
    width: fit-content;
    display: flex;
    flex-direction: row;
    align-items: center;

    &:not(:first-child) {
      padding: 1rem 0 0;
      border-top: 1px solid ${colors.greyE6};
    }

    ${down(breakpoints.lg)} {
      flex-direction: column;
      align-items: flex-start;
    }
  `,
);

export const Col = styled.div(
  ({ theme: { breakpoints, down } }) => css`
    display: flex;

    &:not(:first-child) {
      margin: 0 0 0 0.65rem;
    }

    > div:not(:first-child) {
      margin-left: 0.65rem;
    }

    ${down(breakpoints.lg)} {
      &:not(:first-child) {
        margin: 2.25rem 0 0;
      }
    }
  `,
);

export const RangeWrapper = styled.div`
  display: flex;

  > span {
    font-size: 0.875rem;
    margin: 0.625rem 0.4rem;
  }
`;

export const Subtitle = styled.div`
  font-size: 0.875rem;
  font-weight: bold;
  margin: 0 0 1.25rem;
`;
