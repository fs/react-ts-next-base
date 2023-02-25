import styled from 'styled-components';

export const ProductsList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  gap: 0.75rem;
  padding: 0 1rem;
`;

export const ProductWrapper = styled.div`
  width: 17.5rem;
  margin: 0.1rem;

  > div {
    height: 100%;
  }
`;
