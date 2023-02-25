import styled, { css } from 'styled-components';

import { Table } from '../_shared/styled';

export const Title = styled.div`
  font-weight: bold;
  font-size: 0.875rem;
  margin: 0 0 0.5rem;
`;

export const DescriptionWrapper = styled.div(
  ({ theme: { colors, breakpoints, up }, wholesale }) => css`
    color: ${colors.grey};
    font-size: 0.875rem;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 0 0.8rem;

    > :nth-child(1) {
      width: 100%;
    }
    > :nth-child(2) {
      margin: 0.25rem 0 0;
    }

    ${wholesale &&
    `
    ${up(breakpoints.lg)} {
      > :nth-child(2) {
        position: absolute;
        right: 0;
        bottom: 0;
        text-align: end;
        width: 15rem;
      }
    }
    `}
  `,
);

export const Row = styled.div(
  ({ theme: { breakpoints, down } }) => css`
    display: flex;
    justify-content: space-between;
    margin: 0 0 2.5rem;

    ${down(breakpoints.lg)} {
      flex-direction: column;
    }
  `,
);

export const Col = styled.div(
  ({ theme: { breakpoints, down }, width }) => css`
    position: relative;
    display: flex;
    flex: ${width ? 'auto' : 1};
    max-width: ${width ? `${width}px` : '100%'};

    &:first-child {
      margin-right: 2rem;
    }

    ${down(breakpoints.lg)} {
      &:first-child {
        margin: 0 0 1.5rem;
      }
    }
  `,
);

export const TablePieceSale = styled(Table)(
  ({ theme: { colors } }) => css`
    border: 1px solid ${colors.greyA3};
    max-width: 100%;

    tr {
      td {
        width: 8rem;
        min-width: 8rem;
      }

      &:first-child {
        td {
          padding: 0 0.5rem;
        }
      }
    }
  `,
);

export const TableWholeSale = styled(Table)(
  ({ theme: { colors } }) => css`
    border: 1px solid ${colors.greyA3};
    max-width: 100%;

    tr:first-child {
      padding: 0 1rem 0 0.5rem;

      span {
        white-space: nowrap;
        margin-right: 0.75rem;
      }

      input {
        padding: 0.35rem 0.5rem;
        border: 1px solid ${colors.greyA3};
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
