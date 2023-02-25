import styled from 'styled-components';

export const RequestCompaniesWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const ProductCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(275px, 1fr));
  gap: 1.5rem;
`;
