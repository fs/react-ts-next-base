import styled, { css } from 'styled-components';

export const ConfirmCompanyFieldWrapper = styled.div(
  ({ width, theme: { breakpoints, down } }) => css`
    display: flex;
    align-items: flex-start;
    width: ${width || '100%'};
    max-width: 75rem;

    &:not(:first-child) {
      margin: 0.875rem 0 0;
    }

    ${down(breakpoints.lg)} {
      width: 100%;
    }
  `,
);

export const Col = styled.div`
  flex: 1;
`;

export const ValueWrapper = styled.div(
  ({ theme: { colors }, isOpen }) => css`
    position: relative;
    width: 100%;
    font-size: 0.875rem;
    padding: 0.75rem;
    color: ${colors.grey};
    border-radius: 0.375rem;
    border: 1px solid ${isOpen ? colors.orange : colors.greyCC};
  `,
);

export const Title = styled.div(
  ({ theme: { colors } }) => css`
    position: absolute;
    top: -0.35rem;
    left: 0.5rem;
    font-size: 0.7rem;
    background-color: ${colors.white};
    color: ${colors.grey};
    padding: 0 0.5rem;
    z-index: 1;
  `,
);
