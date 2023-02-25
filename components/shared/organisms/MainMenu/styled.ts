import styled, { css } from 'styled-components';

export const MenuWrapper = styled.div(
  ({ theme: { colors } }) =>
    css`
      display: flex;
      justify-content: flex-end;
      position: absolute;
      width: 100%;
      height: 100%;
      background: ${colors.blue};
      z-index: 10;
      color: ${colors.white};
    `,
);

export const CloseButtonWrapper = styled.div`
  position: absolute;
  right: 1.75rem;
  top: 1rem;
`;

export const MenuListWrapper = styled.div`
  width: 20rem;
  text-align: right;
`;

export const TopList = styled.div(
  ({ theme: { colors, heightBreakpoints, down, up, between } }) => css`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    height: calc(var(--vh) * 45);
    padding: 2.25rem 2.25rem 3.5rem;

    &::after {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 7.5rem;
      height: 0;
      border-bottom: 1px solid ${colors.white};
      content: '';
    }

    ${down(heightBreakpoints.xs, true)} {
      padding: 2.25rem 2.25rem 1rem;
    }

    ${up(heightBreakpoints.md, true)} {
      gap: 2.25rem;
    }

    ${between(heightBreakpoints.sm, heightBreakpoints.md, true)} {
      gap: 1.5rem;
    }

    ${down(heightBreakpoints.sm, true)} {
      gap: 1rem;
    }
  `,
);

export const BottomList = styled.div(
  ({ theme: { heightBreakpoints, down } }) => css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(var(--vh) * 55);
    padding: 3.5rem 2.25rem 2.25rem;

    ${down(heightBreakpoints.xs, true)} {
      padding: 1rem 2.25rem 2.25rem;
    }
  `,
);

export const BottomNestedList = styled.div(
  ({ theme: { heightBreakpoints, down, up, between } }) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    ${up(heightBreakpoints.md, true)} {
      gap: 2.25rem;
    }

    ${between(heightBreakpoints.sm, heightBreakpoints.md, true)} {
      gap: 1.5rem;
    }

    ${down(heightBreakpoints.sm, true)} {
      gap: 1rem;
    }
  `,
);

export const BottomHelpList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 1rem 0 0;

  > :not(:last-child) {
    margin-bottom: 2rem;
  }
`;
