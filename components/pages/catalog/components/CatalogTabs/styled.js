import styled, { css } from 'styled-components';

export const CatalogTabWrapper = styled.div(
  ({ theme: { colors } }) => css`
    li:last-child {
      color: ${colors.orange};
    }
  `,
);
