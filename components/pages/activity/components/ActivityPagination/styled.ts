import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

export const PageNumber = styled.span`
  padding: 0.25rem 0.7rem;
  border: 2px solid ${({ theme }) => theme.colors.grey_300};
  font-size: 1.1rem;
`;
