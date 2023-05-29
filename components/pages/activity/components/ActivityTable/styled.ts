import styled, { css } from 'styled-components';

import baseCellStyles from './baseCellStyles';

export const StyledTable = styled.table(
  ({ theme: { colors, up, breakpoints } }) =>
    css`
      position: relative;

      display: block;

      width: 100%;
      overflow-x: auto;

      color: ${colors.grey_800};
      text-align: left;

      border-spacing: 0;

      ${up(breakpoints.lg)} {
        display: table;

        overflow-x: initial;
      }
    `,
);

export const ColorLabel = styled.td(
  ({ color }) => css`
    min-width: 5px;

    background-color: ${color};
  `,
);

export const HeaderCell = styled.th(
  ({ theme }) => css`
    ${baseCellStyles(theme)}
  `,
);

export const UserInfo = styled.span`
  width: calc(100% - 1.85rem);
  margin-left: 0.5rem;
`;

export const EmptyList = styled.div`
  margin: 3rem 0;

  font-style: italic;
  text-align: center;
`;

export const StyledCell = styled.td(
  ({ theme }) => css`
    ${baseCellStyles(theme)}
    font-weight: 100;

    &:nth-child(4) {
      white-space: nowrap;
    }
  `,
);

export const Wrap = styled.div`
  display: flex;
  align-items: center;
`;
