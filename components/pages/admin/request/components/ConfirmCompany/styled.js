import styled from 'styled-components';

export const FormWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 0 1.5rem;
`;

export const ActionsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  flex-wrap: wrap;
  padding-right: 3.75rem;
  margin: 2rem 0 0;

  > :not(:first-child) {
    margin-left: 1rem;
  }
`;
