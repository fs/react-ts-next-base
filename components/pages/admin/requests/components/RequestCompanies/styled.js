import styled from 'styled-components';

export const RequestCompaniesWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const CompanyItem = styled.div`
  &:not(:first-child) {
    margin-top: 1.25rem;
  }
`;
