import styled, { css } from 'styled-components';

export const Wrapper = styled.div(
  ({ theme: { breakpoints, down } }) => css`
    position: relative;
    display: flex;
    padding: 1.75rem 0 2rem;

    ${down(breakpoints.md)} {
      justify-content: space-between;
    }
  `,
);

export const StepWrapper = styled.div(
  ({ theme: { breakpoints, down }, index }) => css`
    display: flex;
    align-items: center;

    ${down(breakpoints.md)} {
      flex: ${!!index && '1'};
    }
  `,
);

export const Line = styled.div(
  ({ theme: { colors, breakpoints, down }, access }) => css`
    align-items: center;
    border-top: 3px solid ${access ? colors.green : colors.greyC4};
    width: 3.25rem;

    ${down(breakpoints.md)} {
      width: 100%;
    }
  `,
);

export const Step = styled.div(
  ({ theme: { colors }, access }) => css`
    min-width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    border: 0.2rem solid ${access ? colors.green : colors.greyC4};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.375rem;
    font-weight: bold;
    color: ${access ? colors.green : colors.greyC4};
    cursor: ${access ? 'pointer' : 'default'};
  `,
);
