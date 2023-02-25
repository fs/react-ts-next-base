import styled, { css } from 'styled-components';

export const ModalWrapperColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ModalWrapperRow = styled.div`
  display: flex;
  align-items: center;
`;

export const CityLine = styled.div(
  ({}) => css`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  `,
);

export const CityWrapper = styled.div(
  ({}) => css`
    flex-grow: 1;
  `,
);
