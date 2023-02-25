import styled, { css } from 'styled-components';

export const CommentWrapper = styled.div`
  width: 100%;
  font-size: 0.875rem;
`;

export const Comment = styled.div(
  ({ theme: { colors } }) => css`
    margin: 0.35rem 0 0;
    color: ${colors.orange};
  `,
);
