import styled, { css } from 'styled-components';

export const VariantsTableWrapper = styled.div(
  ({ $width, items }) => css`
    height: calc(2.5rem + ${items * 2.5}rem);
    position: relative;
    margin: 0.5rem 0 0;
    width: ${$width}px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 0.875rem;
  `,
);

export const PropertiesWrapper = styled.div(
  ({ items }) => css`
    height: calc(20rem + ${items * 2.5}rem);
    overflow-x: scroll;
    overflow-y: hidden;
    display: flex;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  `,
);

export const TableVariants = styled.table`
  font-size: 0.875rem;
  border-collapse: collapse;
  padding: 0;
  border-spacing: 0;
  height: fit-content;
  min-width: 100%;

  tr {
    display: flex;

    &:not(:first-child) {
      td {
        border-top-width: 0;
      }
    }
  }
`;

export const TableCeil = styled.td(
  ({ theme: { colors } }) => css`
    display: flex;
    align-items: center;
    height: 2.5rem;
    position: relative;
    width: 11.375rem;
    min-width: 11.375rem;
    padding: 0;
    border: 1px solid ${colors.greyA3};

    &:first-child,
    &:last-child {
      width: calc(3rem + 1px);
      min-width: 3rem;
      justify-content: center;
      z-index: 1;
      position: sticky;
      background-color: ${colors.white};
    }
    &:first-child {
      left: 0;
    }
    &:last-child {
      right: 0;
    }

    &:not(:first-child):not(:last-child) {
      border-left-width: 0;
      &:nth-last-child(2) {
        border-right-width: 0;
      }
    }
  `,
);

export const TableHeadCeil = styled(TableCeil)(
  ({ theme: { colors } }) => css`
    &&& {
      background-color: ${colors.greyF1};
    }

    &:not(:first-child):not(:last-child) {
      padding-left: 1rem;
    }
  `,
);

export const ArrowWrapper = styled.div(
  ({ theme: { colors }, direction }) => css`
    border-radius: 50%;
    background-color: ${colors.white};
    position: absolute;
    z-index: 2;
    left: ${direction === 'right' ? 'auto' : '-1.6rem'};
    right: ${direction === 'right' ? '-1.6rem' : 'auto'};
    top: calc(50% + 1.25rem);
    transform: translateY(-50%);
  `,
);
