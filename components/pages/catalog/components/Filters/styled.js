import styled, { css } from 'styled-components';

export const FiltersContainer = styled.div(
  () => css`
    width: 18rem;
    display: flex;
    flex-direction: column;
    z-index: 2;
    flex-shrink: 0;
    transition: transform 0.2s;

    position: relative;
    transform: translate(0, 0);
  `,
);

export const FiltersTitle = styled.h3`
  font-size: 1rem;
  font-weight: lighter;
  margin: 0;
`;

export const FiltersHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > button {
    padding-right: 0;
    font-weight: 400;
  }
`;
