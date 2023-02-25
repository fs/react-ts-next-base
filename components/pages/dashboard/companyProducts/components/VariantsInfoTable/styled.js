import styled, { css } from 'styled-components';

import { Table } from '../_shared/styled';

export const TableNumber = styled(Table)(
  ({ theme: { colors } }) => css`
    border: 1px solid ${colors.greyA3};
    border-right: 0;

    td {
      width: 3.25rem;
      justify-content: center;
    }
  `,
);

export const TableVariantsWrapper = styled.div(
  ({ theme: { colors } }) => css`
    border: 1px solid ${colors.greyA3};
    width: 100%;
    overflow-x: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  `,
);

export const TableVariants = styled(Table)(
  ({ scrolled, colWidth }) => css`
    min-width: 100%;

    td {
      padding: 1rem;
      width: ${!scrolled ? '100%' : `${colWidth / 16}rem`};
      min-width: ${scrolled ? `${colWidth / 16}rem` : '33%'};
    }
  `,
);
