import styled, { css } from 'styled-components';

// todo: think about components/pages/admin/adminConfirmProduct/components/styled.js  its the same
// so, we can make common components

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

export const Warning = styled.div`
  display: flex;
  align-items: center;
  margin-right: 2rem;
  font-size: 0.75rem;
  font-weight: bold;
`;

export const ActionsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  > :not(:first-child) {
    margin-left: 1rem;
  }
`;
