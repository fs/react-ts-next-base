import styled, { css } from 'styled-components';

export const Content = styled.div(
  () => css`
    width: 100%;
    padding: 5rem 2rem 3rem;
  `,
);

export const ProductsContentWrapper = styled.div(
  () => css`
    display: flex;
    flex-direction: row;
    align-items: flex-start;

    > div:not(:first-child) {
      margin-left: 1.25rem;
      width: 100%;
    }
  `,
);

export const ProductsListWrapper = styled.div`
  position: relative;
  width: 100%;
`;
