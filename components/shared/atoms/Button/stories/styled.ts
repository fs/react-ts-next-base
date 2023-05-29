import styled, { css } from 'styled-components';

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;

  margin-bottom: 1rem;
`;

export const ItemWrapper = styled.div<{ bgColor: string }>(
  ({ bgColor }) => css`
    padding: 1rem;

    background-color: ${bgColor || 'transparent'};
  `,
);
