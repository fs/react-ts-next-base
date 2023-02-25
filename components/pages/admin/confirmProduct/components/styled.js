import styled, { css } from 'styled-components';

export const SectionHeader = styled.h2`
  margin-top: 0;
`;

export const SectionH4 = styled.h4`
  margin-top: 2rem;
  margin-bottom: 1rem;
`;
export const SectionWrapper = styled.div`
  margin-bottom: 1.5rem;
`;
export const SectionRow = styled.div(
  ({ justifyContent = 'space-between' }) => css`
    display: flex;
    justify-content: ${justifyContent};
    flex-wrap: wrap;
    margin-bottom: 0.75rem;
  `,
);
export const SectionTitle = styled.div(
  ({ isTitleBold = false }) => css`
    font-size: 0.875rem;
    margin: 1rem 0;
    ${isTitleBold &&
    css`
      font-weight: 700;
    `}
  `,
);
