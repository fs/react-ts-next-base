import styled, { css } from 'styled-components';

export const SectionHeader = styled.h2`
  margin-top: 0;
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
    > div:not(:last-child) {
      margin-right: 6.75rem;
    }
    > fieldset {
      margin-bottom: 0.75rem;
    }
  `,
);

export const SectionColumn = styled.div(
  ({ justifyContent = 'space-between' }) => css`
    display: flex;
    flex-direction: column;
    justify-content: ${justifyContent};
    align-items: flex-start;
    flex-wrap: wrap;
    margin-bottom: 0.75rem;
    > fieldset {
      margin-bottom: 0.75rem;
    }
  `,
);

export const CompaniesTitle = styled.div`
  margin-bottom: 1.1rem;
  font-size: 0.875rem;
  line-height: 1.4rem;
  font-weight: 700;
`;

export const NoCompaniesText = styled.span`
  font-size: 0.875rem;
`;
