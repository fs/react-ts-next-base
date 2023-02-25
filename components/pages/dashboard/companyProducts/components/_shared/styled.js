import styled, { css } from 'styled-components';

export const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 0 2rem;
`;

export const FormWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: inherit;
`;

export const Table = styled.table(
  ({ theme: { colors } }) => css`
    font-size: 0.875rem;
    border-collapse: collapse;
    padding: 0;
    border-spacing: 0;

    tr {
      display: flex;

      > td {
        height: 2.5rem;
        display: flex;
        align-items: center;
      }

      > td:not(:first-child) {
        border-left: 1px solid ${colors.greyA3};
      }
    }

    tbody {
      tr:not(:first-child) {
        border-top: 1px solid ${colors.greyA3};
      }
      tr:first-child {
        background-color: ${colors.greyF1};
      }
    }
  `,
);
