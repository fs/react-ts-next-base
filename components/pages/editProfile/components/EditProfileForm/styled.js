import styled, { css } from 'styled-components';

export const Wrapper = styled.div(
  ({ theme: { heightBreakpoints, down } }) => css`
    position: relative;
    width: 100%;
    margin: 1rem 0;

    ${down(heightBreakpoints.sm, true)} {
      margin: 0.6rem 0;
    }
  `,
);

export const Title = styled.div(
  ({ theme: { heightBreakpoints, down } }) => css`
    font-size: 0.875rem;
    margin: 0 0 1rem;

    ${down(heightBreakpoints.sm, true)} {
      margin: 0 0 0.5rem;
    }
  `,
);

export const CheckboxesWrapper = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    flex-direction: column;
    margin: 0 0 0.5rem;

    > div {
      font-size: 0.875rem;
      color: ${colors.grey};
    }
  `,
);
