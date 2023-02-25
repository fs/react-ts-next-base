import styled, { css } from 'styled-components';

export const ProblemsWrapper = styled.div(
  ({ theme: { colors } }) => css`
    position: relative;
    display: flex;
    justify-content: space-between;
    font-size: 0.875rem;
    line-height: 1.75rem;
    margin: 0 0 7.125rem;

    ul {
      padding-left: 1.35rem;
    }

    li::marker {
      font-size: 1.125rem;
      color: ${colors.blue};
    }
  `,
);

export const ProblemsImageWrapper = styled.div`
  position: relative;
  width: 29rem;
`;

export const ProblemsImage = styled.img`
  position: absolute;
  left: 0;
  bottom: -2rem;
  width: 100%;
`;
