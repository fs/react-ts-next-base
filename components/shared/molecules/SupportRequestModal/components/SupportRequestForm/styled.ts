import styled, { css } from 'styled-components';

export const FileContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 1.5rem;
`;

export const FileNotes = styled.span(
  ({ theme: { colors } }) => css`
    color: ${colors.grey};
    font-size: 0.75rem;
    margin-left: 1rem;
  `,
);

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin: 1rem 0 0;
`;
