import styled, { css } from 'styled-components';

import { Table } from '../_shared/styled';

export const DiscountsWrapper = styled.div``;

export const Title = styled.div`
  font-weight: bold;
  font-size: 0.875rem;
  margin: 0 0 0.75rem;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 0 2.5rem;
`;

export const Col = styled.div(
  ({ width }) => css`
    position: relative;
    width: ${`${width}%` || '100%'};
    display: flex;
  `,
);

export const FakeDisabledInput = styled.div(
  ({ theme: { colors } }) => css`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 1rem;
    background-color: ${colors.greyFO};
  `,
);

export const TableWeeklyDiscounts = styled(Table)(
  ({ theme: { colors } }) => css`
    border: 1px solid ${colors.greyA3};
    width: 100%;

    tr {
      td {
        width: 100%;
        padding: 0;

        input {
          height: 100%;
        }

        > div {
          width: 100%;

          > div {
            border: 0;
          }
        }

        &:nth-child(2) {
          border-left: 0;
        }

        &:first-child {
          display: none;
        }
      }

      &:first-child > td {
        padding: 0 0.5rem 0 1rem;
      }
    }
  `,
);

export const ErrorWrapper = styled.div(
  ({ theme: { colors } }) => css`
    position: absolute;
    width: 100%;
    bottom: -1.25rem;
    font-size: 0.75rem;
    color: ${colors.error};
    padding: 0.15rem 0 0 0.5rem;
  `,
);
