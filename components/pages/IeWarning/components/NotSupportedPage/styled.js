import styled from 'styled-components';

export const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex: 100;
`;

export const PageMessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 27.3rem;
  margin: 1rem 0;
  padding: 0 0.63rem;
`;

export const PageMessageTitle = styled.h3`
  margin: 0;
  padding: 0;
  font-size: 1.5rem;
  line-height: 1.813rem;
  margin-bottom: 1.3rem;
`;

export const PageMessageDescription = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.188rem;
  margin-bottom: 2.125rem;
  text-align: center;
`;

export const PageMessageImage = styled.img`
  margin-top: 2.125rem;
  max-width: 27.313rem;
  width: 100%;
`;
