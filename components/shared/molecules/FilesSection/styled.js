import styled, { css } from 'styled-components';

export const EmptyText = styled.div(
  () => css`
    font-size: 0.875rem;
  `,
);

export const SectionTitle = styled.div(
  ({ isTitleBold = false }) => css`
    font-size: 0.875rem;
    margin: 1rem 0 0.5rem;
    ${isTitleBold &&
    css`
      font-weight: 700;
    `}
  `,
);
