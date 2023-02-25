import styled from 'styled-components';

export const FormWrapper = styled.div`
  position: relative;
  width: 100%;

  textarea {
    resize: none;
    height: 4.5rem;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  height: 3.5rem;
`;

export const Comment = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
`;

export const CommentText = styled.div`
  font-size: 0.875rem;
  max-width: 50rem;
  white-space: pre-line;
  display: flex;
  align-items: center;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: end;
  margin-left: 0.5rem;
`;
