import styled from 'styled-components';

export const ProductCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 20rem;
`;

export const Title = styled.h1`
  margin: 1rem 0;
`;

export const SubTitle = styled.h2`
  margin: 0 0 1rem;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(275px, 1fr));
  gap: 1.5rem;
`;
