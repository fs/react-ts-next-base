import styled, { css } from 'styled-components';

export const TitleWrapper = styled.div(
  () => css`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.7rem;
  `,
);

export const GroupTitle = styled.div`
  font-size: 0.875rem;
  font-weight: 700;
`;

export const InputGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;
